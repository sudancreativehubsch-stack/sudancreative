import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStaff } from "@/lib/auth";
import { RESOURCES } from "@/lib/resources";

type Props = { params: Promise<{ resource: string }> };

export default async function ResourceList({ params }: Props) {
  const { resource } = await params;
  const res = RESOURCES[resource];
  if (!res) notFound();
  const { supabase } = await requireStaff();
  const { data } = await supabase.from(res.table).select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  const rows = (data ?? []) as Record<string, unknown>[];

  const show = (v: unknown) => (typeof v === "boolean" ? (v ? "Yes" : "No") : v === null || v === undefined ? "" : String(v));

  return (
    <>
      <div className="a-row" style={{ justifyContent: "space-between", marginBottom: ".5rem" }}>
        <h1 style={{ margin: 0 }}>{res.plural}</h1>
        <Link className="a-btn a-btn--primary" href={`/admin/${res.key}/new`}>Add {res.singular}</Link>
      </div>
      <p className="a-lead">{res.hint}</p>
      {rows.length === 0 ? (
        <p className="a-notice">Nothing here yet. Press <b>Add {res.singular}</b> to create the first one.</p>
      ) : (
        <div className="a-scroll">
          <table className="a-table">
            <thead>
              <tr><th>{res.fields.find((f) => f.name === res.titleField)?.label.split(" (")[0]}</th>{res.columns.map((c) => <th key={c.name}>{c.label}</th>)}<th><span className="sr-only">Actions</span></th></tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const pub = res.publicPath?.(r);
                return (
                  <tr key={String(r.id)}>
                    <td><b>{show(r[res.titleField])}</b></td>
                    {res.columns.map((c) => <td key={c.name}>{show(r[c.name])}</td>)}
                    <td>
                      <div className="a-row">
                        <Link className="a-btn a-btn--sm" href={`/admin/${res.key}/${r.id}`}>Edit</Link>
                        {pub ? <a className="a-btn a-btn--sm a-btn--quiet" href={pub} target="_blank" rel="noopener noreferrer">View</a> : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
