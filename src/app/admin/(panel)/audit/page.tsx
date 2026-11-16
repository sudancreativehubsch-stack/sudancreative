import { redirect } from "next/navigation";
import { isAdmin, requireStaff } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export default async function Audit() {
  const staff = await requireStaff();
  if (!isAdmin(staff)) redirect("/admin");
  const { data } = await staff.supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(150);
  return (
    <>
      <h1>Activity log</h1>
      <p className="a-lead">Who changed what, most recent first.</p>
      <div className="a-scroll">
        <table className="a-table">
          <thead><tr><th>When</th><th>Who</th><th>Action</th><th>Section</th><th>Detail</th></tr></thead>
          <tbody>
            {(data ?? []).map((r) => (
              <tr key={r.id}>
                <td>{formatDate(r.created_at)}</td><td>{r.actor_email}</td><td>{r.action}</td><td>{r.resource}</td>
                <td>{r.detail ? JSON.stringify(r.detail) : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
