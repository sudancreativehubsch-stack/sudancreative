"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteInquiry, saveSettings, setInquiryStatus, setUserRole } from "@/lib/actions";
import type { SettingDef } from "@/lib/defaults";

export function SettingsForm({ defs, values }: { defs: SettingDef[]; values: Record<string, string> }) {
  const [vals, setVals] = useState(values);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");
  const groups = [...new Set(defs.map((d) => d.group))];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("saving");
    const res = await saveSettings(vals);
    if (res.ok) setState("saved");
    else { setState("error"); setError(res.error); }
  }

  return (
    <form className="a-form" onSubmit={submit}>
      {groups.map((g) => (
        <fieldset key={g} className="a-group">
          <legend>{g}</legend>
          {defs.filter((d) => d.group === g).map((d) => (
            <div className="a-field" key={d.key}>
              <label htmlFor={`s-${d.key}`}>{d.label}</label>
              {d.type === "textarea"
                ? <textarea id={`s-${d.key}`} rows={4} value={vals[d.key] ?? ""} onChange={(e) => setVals({ ...vals, [d.key]: e.target.value })} />
                : <input id={`s-${d.key}`} value={vals[d.key] ?? ""} onChange={(e) => setVals({ ...vals, [d.key]: e.target.value })} />}
              {d.help ? <p className="a-help">{d.help}</p> : null}
            </div>
          ))}
        </fieldset>
      ))}
      {state === "error" ? <p className="a-error" role="alert">{error}</p> : null}
      {state === "saved" ? <p className="a-ok" role="status">Saved. Changes appear on the website within about 30 seconds.</p> : null}
      <div className="a-row a-sticky"><button className="a-btn a-btn--primary" disabled={state === "saving"}>{state === "saving" ? "Saving..." : "Save changes"}</button></div>
    </form>
  );
}

export function InquiryActions({ id, status, canDelete }: { id: string; status: "new" | "handled"; canDelete: boolean }) {
  const router = useRouter();
  const [err, setErr] = useState("");
  async function toggle() {
    const r = await setInquiryStatus(id, status === "new" ? "handled" : "new");
    if (!r.ok) setErr(r.error); else router.refresh();
  }
  async function del() {
    if (!confirm("Delete this inquiry permanently?")) return;
    const r = await deleteInquiry(id);
    if (!r.ok) setErr(r.error); else router.refresh();
  }
  return (
    <div className="a-row">
      <button className="a-btn" onClick={toggle}>{status === "new" ? "Mark as handled" : "Mark as new"}</button>
      {canDelete ? <button className="a-btn a-btn--danger" onClick={del}>Delete</button> : null}
      {err ? <span className="a-error">{err}</span> : null}
    </div>
  );
}

export function RoleSelect({ id, role, disabled }: { id: string; role: string; disabled: boolean }) {
  const router = useRouter();
  const [err, setErr] = useState("");
  async function change(e: React.ChangeEvent<HTMLSelectElement>) {
    const r = await setUserRole(id, e.target.value as "admin" | "editor" | "viewer");
    if (!r.ok) setErr(r.error); else router.refresh();
  }
  return (
    <>
      <select aria-label="Role" defaultValue={role} disabled={disabled} onChange={change}>
        <option value="admin">Admin</option>
        <option value="editor">Editor</option>
        <option value="viewer">No access yet</option>
      </select>
      {err ? <span className="a-error"> {err}</span> : null}
    </>
  );
}
