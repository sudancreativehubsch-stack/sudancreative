"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { canEdit, getStaff, isAdmin } from "./auth";
import { bustCache } from "./data";
import { SETTING_DEFS } from "./defaults";
import { RESOURCES, type Field } from "./resources";
import { sessionClient } from "./supabase/server";
import { slugify } from "./utils";

type Result = { ok: true; id?: string } | { ok: false; error: string };

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const str = (v: unknown, max: number) => String(v ?? "").replace(/\u0000/g, "").trim().slice(0, max);
const safeUrl = (v: unknown) => {
  const s = str(v, 600);
  return s === "" || /^https:\/\//.test(s) || s.startsWith("/placeholders/") ? s : "";
};

function clean(field: Field, raw: unknown): unknown {
  switch (field.type) {
    case "text": return str(raw, field.max ?? 200);
    case "textarea": return str(raw, field.max ?? 4000);
    case "select": return field.options?.some((o) => o.value === raw) ? raw : "";
    case "number": return Math.max(-9999, Math.min(9999, Math.round(Number(raw) || 0)));
    case "checkbox": return Boolean(raw);
    case "tags": return (Array.isArray(raw) ? raw : []).map((t) => str(t, 80)).filter(Boolean).slice(0, 40);
    case "image": case "video": case "file": return safeUrl(raw) || null;
    case "images": return (Array.isArray(raw) ? raw : []).map(safeUrl).filter(Boolean).slice(0, 60);
    case "palette":
      return (Array.isArray(raw) ? raw : [])
        .map((c) => ({ name: str((c as { name?: string }).name, 40), hex: str((c as { hex?: string }).hex, 7) }))
        .filter((c) => HEX.test(c.hex))
        .slice(0, 12);
    case "fonts":
      return (Array.isArray(raw) ? raw : [])
        .map((f) => ({ name: str((f as { name?: string }).name, 60), usage: str((f as { usage?: string }).usage, 120) }))
        .filter((f) => f.name)
        .slice(0, 8);
  }
}

async function audit(
  staff: NonNullable<Awaited<ReturnType<typeof getStaff>>>,
  action: string, resource: string, recordId: string | null, detail?: Record<string, unknown>,
) {
  await staff.supabase.from("audit_log").insert({
    actor_id: staff.id, actor_email: staff.email, action, resource, record_id: recordId, detail: detail ?? null,
  });
}

function refresh() {
  bustCache();
  revalidatePath("/", "layout");
}

export async function saveRecord(key: string, id: string | null, input: Record<string, unknown>): Promise<Result> {
  try {
    const staff = await getStaff();
    if (!staff || !canEdit(staff)) return { ok: false, error: "You do not have permission to do this." };
    const res = RESOURCES[key];
    if (!res) return { ok: false, error: "Unknown section." };

    const row: Record<string, unknown> = {};
    for (const f of res.fields) {
      const v = clean(f, input[f.name]);
      if (f.required && (v === "" || v === null)) return { ok: false, error: `${f.label} is required.` };
      row[f.name] = v;
    }

    if (res.slugFrom) {
      const given = str(input.slug, 80);
      row.slug = slugify(given || String(row[res.slugFrom] ?? "")) || `item-${Date.now()}`;
    }

    const q = id
      ? staff.supabase.from(res.table).update(row).eq("id", id).select("id").single()
      : staff.supabase.from(res.table).insert(row).select("id").single();
    const { data, error } = await q;
    if (error) {
      if (error.code === "23505") return { ok: false, error: "Another item already uses that name. Change the name slightly." };
      return { ok: false, error: error.message };
    }
    await audit(staff, id ? "update" : "create", res.key, data.id, { title: row[res.titleField] });
    refresh();
    return { ok: true, id: data.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

export async function deleteRecord(key: string, id: string): Promise<Result> {
  try {
    const staff = await getStaff();
    if (!staff || !isAdmin(staff)) return { ok: false, error: "Only an admin can delete items." };
    const res = RESOURCES[key];
    if (!res) return { ok: false, error: "Unknown section." };
    const { error } = await staff.supabase.from(res.table).delete().eq("id", id);
    if (error) return { ok: false, error: error.message };
    await audit(staff, "delete", res.key, id);
    refresh();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

export async function saveSettings(values: Record<string, string>): Promise<Result> {
  try {
    const staff = await getStaff();
    if (!staff || !canEdit(staff)) return { ok: false, error: "You do not have permission to do this." };
    const rows = SETTING_DEFS.map((d) => ({ key: d.key, value: str(values[d.key], 4000), updated_at: new Date().toISOString() }));
    const { error } = await staff.supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    if (error) return { ok: false, error: error.message };
    await audit(staff, "update", "settings", null);
    refresh();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}

export async function setInquiryStatus(id: string, status: "new" | "handled"): Promise<Result> {
  const staff = await getStaff();
  if (!staff || !canEdit(staff)) return { ok: false, error: "You do not have permission to do this." };
  const { error } = await staff.supabase.from("inquiries").update({ status }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/inquiries");
  return { ok: true };
}

export async function deleteInquiry(id: string): Promise<Result> {
  const staff = await getStaff();
  if (!staff || !isAdmin(staff)) return { ok: false, error: "Only an admin can delete inquiries." };
  const { error } = await staff.supabase.from("inquiries").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  await audit(staff, "delete", "inquiries", id);
  revalidatePath("/admin/inquiries");
  return { ok: true };
}

export async function setUserRole(id: string, role: "admin" | "editor" | "viewer"): Promise<Result> {
  const staff = await getStaff();
  if (!staff || !isAdmin(staff)) return { ok: false, error: "Only an admin can change roles." };
  if (staff.id === id) return { ok: false, error: "You cannot change your own role." };
  if (!["admin", "editor", "viewer"].includes(role)) return { ok: false, error: "Invalid role." };
  const { error } = await staff.supabase.from("profiles").update({ role }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  await audit(staff, "role", "users", id, { role });
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function signOut() {
  const supabase = await sessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
