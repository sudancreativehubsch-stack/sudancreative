import { redirect } from "next/navigation";
import { hasDb, sessionClient } from "./supabase/server";
import type { Role } from "./types";

export type Staff = {
  supabase: Awaited<ReturnType<typeof sessionClient>>;
  id: string;
  email: string;
  role: Role;
};

/** Returns the signed-in user with their role, or null. Always re-checks on the server. */
export async function getStaff(): Promise<Staff | null> {
  if (!hasDb()) return null;
  const supabase = await sessionClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return null;
  const { data: profile } = await supabase.from("profiles").select("role,email").eq("id", auth.user.id).maybeSingle();
  return {
    supabase,
    id: auth.user.id,
    email: profile?.email ?? auth.user.email ?? "",
    role: (profile?.role as Role) ?? "viewer",
  };
}

export async function requireStaff(): Promise<Staff> {
  const s = await getStaff();
  if (!s) redirect("/admin/login");
  if (s.role === "viewer") redirect("/admin/pending");
  return s;
}

export const canEdit = (s: { role: Role }) => s.role === "admin" || s.role === "editor";
export const isAdmin = (s: { role: Role }) => s.role === "admin";
