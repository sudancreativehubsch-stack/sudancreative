"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { deleteRecord, saveRecord } from "@/lib/actions";
import type { Field } from "@/lib/resources";
import { posterFromVideo, uploadImage, uploadRaw } from "@/lib/upload-client";
import { thumb } from "@/lib/utils";

type Vals = Record<string, unknown>;

function Progress({ value }: { value: number }) {
  return <div className="a-progress" role="progressbar" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${value * 100}%` }} /></div>;
}

function SingleUpload({ field, value, onChange, afterVideo }: {
  field: Field; value: string; onChange: (v: string) => void; afterVideo?: (f: File) => Promise<void>;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const accept = field.type === "image" ? "image/png,image/jpeg,image/webp,image/svg+xml" : field.type === "video" ? "video/mp4,video/webm,video/quicktime" : "application/pdf";

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true); setError(""); setProgress(0);
    try {
      const folder = field.folder ?? "misc";
      const url = field.type === "image" ? await uploadImage(file, folder, setProgress) : await uploadRaw(field.type === "video" ? "video" : "pdf", file, folder, setProgress);
      onChange(url);
      if (field.type === "video" && afterVideo) await afterVideo(file);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="a-upload">
      {value ? (
        field.type === "image" ? <img src={thumb(value)} alt="" className="a-thumb" /> :
        field.type === "video" ? <video src={value} className="a-thumb" controls preload="metadata" /> :
        <a href={value} target="_blank" rel="noopener noreferrer">Open current file</a>
      ) : <span className="a-muted">No file yet</span>}
      <div className="a-row">
        <button type="button" className="a-btn" disabled={busy} onClick={() => input.current?.click()}>{value ? "Replace" : "Choose file"}</button>
        {value && !busy ? <button type="button" className="a-btn a-btn--quiet" onClick={() => onChange("")}>Remove</button> : null}
        <input ref={input} type="file" accept={accept} hidden onChange={pick} />
      </div>
      {busy ? <Progress value={progress} /> : null}
      {error ? <p className="a-error" role="alert">{error}</p> : null}
    </div>
  );
}

function ImagesField({ field, value, onChange }: { field: Field; value: string[]; onChange: (v: string[]) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = [...(e.target.files ?? [])];
    e.target.value = "";
    if (!files.length) return;
    setBusy(true); setError("");
    const added: string[] = [];
    try {
      for (let i = 0; i < files.length; i++) {
        added.push(await uploadImage(files[i], field.folder ?? "misc", (p) => setProgress((i + p) / files.length)));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      if (added.length) onChange([...value, ...added]);
      setBusy(false);
    }
  }
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const copy = [...value];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  };

  return (
    <div>
      <ul className="a-images">
        {value.map((src, i) => (
          <li key={src + i}>
            <img src={thumb(src)} alt={`Image ${i + 1}`} />
            <div className="a-row">
              <button type="button" className="a-btn a-btn--sm" onClick={() => move(i, -1)} disabled={i === 0} aria-label={`Move image ${i + 1} earlier`}>←</button>
              <button type="button" className="a-btn a-btn--sm" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label={`Move image ${i + 1} later`}>→</button>
              <button type="button" className="a-btn a-btn--sm a-btn--quiet" onClick={() => onChange(value.filter((_, k) => k !== i))} aria-label={`Remove image ${i + 1}`}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" className="a-btn" disabled={busy} onClick={() => input.current?.click()}>Add images</button>
      <input ref={input} type="file" multiple hidden accept="image/png,image/jpeg,image/webp" onChange={pick} />
      {busy ? <Progress value={progress} /> : null}
      {error ? <p className="a-error" role="alert">{error}</p> : null}
    </div>
  );
}

function TagsField({ value, onChange, id }: { value: string[]; onChange: (v: string[]) => void; id: string }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const t = draft.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setDraft("");
  };
  return (
    <div>
      <ul className="a-chips">
        {value.map((t) => (
          <li key={t}>{t} <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Remove ${t}`}>×</button></li>
        ))}
      </ul>
      <div className="a-row">
        <input id={id} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} />
        <button type="button" className="a-btn" onClick={add}>Add</button>
      </div>
    </div>
  );
}

export function ResourceForm({ resourceKey, fields, id, initial, canDelete, singular }: {
  resourceKey: string; fields: Field[]; id: string | null; initial: Vals; canDelete: boolean; singular: string;
}) {
  const router = useRouter();
  const [vals, setVals] = useState<Vals>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = (k: string, v: unknown) => setVals((p) => ({ ...p, [k]: v }));

  // After a video upload, make a thumbnail from it if none exists yet.
  const posterField = fields.find((f) => f.name === "thumbnail" || f.name === "showreel_poster");
  async function autoPoster(file: File) {
    if (!posterField || vals[posterField.name]) return;
    const blob = await posterFromVideo(file);
    if (!blob) return;
    try { set(posterField.name, await uploadImage(blob, posterField.folder ?? "misc")); } catch { /* optional */ }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError("");
    const res = await saveRecord(resourceKey, id, vals);
    setSaving(false);
    if (!res.ok) return setError(res.error);
    router.push(`/admin/${resourceKey}`);
    router.refresh();
  }

  async function remove() {
    if (!id || !confirm(`Delete this ${singular}? This cannot be undone.`)) return;
    const res = await deleteRecord(resourceKey, id);
    if (!res.ok) return setError(res.error);
    router.push(`/admin/${resourceKey}`);
    router.refresh();
  }

  return (
    <form className="a-form" onSubmit={submit}>
      {fields.map((f) => {
        const fid = `f-${f.name}`;
        const v = vals[f.name];
        return (
          <div className="a-field" key={f.name}>
            {f.type !== "checkbox" ? <label htmlFor={fid}>{f.label}{f.required ? " *" : ""}</label> : null}
            {f.type === "text" && <input id={fid} value={String(v ?? "")} maxLength={f.max} onChange={(e) => set(f.name, e.target.value)} required={f.required} />}
            {f.type === "textarea" && <textarea id={fid} rows={5} value={String(v ?? "")} maxLength={f.max} onChange={(e) => set(f.name, e.target.value)} />}
            {f.type === "number" && <input id={fid} type="number" value={Number(v ?? 0)} onChange={(e) => set(f.name, Number(e.target.value))} />}
            {f.type === "select" && (
              <select id={fid} value={String(v ?? "")} onChange={(e) => set(f.name, e.target.value)} required={f.required}>
                <option value="">Choose...</option>
                {f.options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            )}
            {f.type === "checkbox" && (
              <label className="a-check"><input type="checkbox" checked={Boolean(v)} onChange={(e) => set(f.name, e.target.checked)} /> {f.label}</label>
            )}
            {f.type === "tags" && <TagsField id={fid} value={(v as string[]) ?? []} onChange={(x) => set(f.name, x)} />}
            {(f.type === "image" || f.type === "video" || f.type === "file") && (
              <SingleUpload field={f} value={String(v ?? "")} onChange={(x) => set(f.name, x)} afterVideo={f.type === "video" ? autoPoster : undefined} />
            )}
            {f.type === "images" && <ImagesField field={f} value={(v as string[]) ?? []} onChange={(x) => set(f.name, x)} />}
            {f.type === "palette" && (
              <div>
                {((v as { name: string; hex: string }[]) ?? []).map((c, i, arr) => (
                  <div className="a-row" key={i} style={{ marginBottom: ".5rem" }}>
                    <input aria-label="Colour name" placeholder="Name" value={c.name} onChange={(e) => set(f.name, arr.map((x, k) => (k === i ? { ...x, name: e.target.value } : x)))} />
                    <input aria-label="Colour picker" type="color" value={/^#[0-9a-f]{6}$/i.test(c.hex) ? c.hex : "#000000"} onChange={(e) => set(f.name, arr.map((x, k) => (k === i ? { ...x, hex: e.target.value } : x)))} style={{ width: 52, padding: 2 }} />
                    <input aria-label="HEX code" placeholder="#0a13eb" value={c.hex} maxLength={7} onChange={(e) => set(f.name, arr.map((x, k) => (k === i ? { ...x, hex: e.target.value } : x)))} style={{ width: 110 }} />
                    <button type="button" className="a-btn a-btn--quiet" onClick={() => set(f.name, arr.filter((_, k) => k !== i))}>Remove</button>
                  </div>
                ))}
                <button type="button" className="a-btn" onClick={() => set(f.name, [...((v as unknown[]) ?? []), { name: "", hex: "#000000" }])}>Add colour</button>
              </div>
            )}
            {f.type === "fonts" && (
              <div>
                {((v as { name: string; usage: string }[]) ?? []).map((c, i, arr) => (
                  <div className="a-row" key={i} style={{ marginBottom: ".5rem" }}>
                    <input aria-label="Font name" placeholder="Font name" value={c.name} onChange={(e) => set(f.name, arr.map((x, k) => (k === i ? { ...x, name: e.target.value } : x)))} />
                    <input aria-label="Where it is used" placeholder="Used for (e.g. Headlines)" value={c.usage} onChange={(e) => set(f.name, arr.map((x, k) => (k === i ? { ...x, usage: e.target.value } : x)))} />
                    <button type="button" className="a-btn a-btn--quiet" onClick={() => set(f.name, arr.filter((_, k) => k !== i))}>Remove</button>
                  </div>
                ))}
                <button type="button" className="a-btn" onClick={() => set(f.name, [...((v as unknown[]) ?? []), { name: "", usage: "" }])}>Add font</button>
              </div>
            )}
            {f.help ? <p className="a-help">{f.help}</p> : null}
          </div>
        );
      })}

      {error ? <p className="a-error" role="alert">{error}</p> : null}
      <div className="a-row a-sticky">
        <button className="a-btn a-btn--primary" type="submit" disabled={saving}>{saving ? "Saving..." : id ? "Save changes" : `Add ${singular}`}</button>
        <button className="a-btn" type="button" onClick={() => router.push(`/admin/${resourceKey}`)}>Cancel</button>
        {id && canDelete ? <button className="a-btn a-btn--danger" type="button" onClick={remove}>Delete</button> : null}
      </div>
    </form>
  );
}
