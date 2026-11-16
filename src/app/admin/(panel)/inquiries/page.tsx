import { InquiryActions } from "@/components/admin/Small";
import { isAdmin, requireStaff } from "@/lib/auth";
import type { Inquiry } from "@/lib/types";
import { formatDate, waLink } from "@/lib/utils";

export default async function Inquiries() {
  const staff = await requireStaff();
  const { data } = await staff.supabase.from("inquiries").select("id,name,contact,service,details,status,created_at").order("created_at", { ascending: false }).limit(200);
  const rows = (data ?? []) as Inquiry[];
  return (
    <>
      <h1>Inquiries</h1>
      <p className="a-lead">Messages from the website contact form. Each one is also emailed to the company inbox.</p>
      {rows.length === 0 ? <p className="a-notice">No inquiries yet.</p> : null}
      {rows.map((r) => {
        const isMail = r.contact.includes("@");
        return (
          <details className="a-inq" key={r.id} open={r.status === "new"}>
            <summary>
              <span className={`a-pill ${r.status === "new" ? "a-pill--new" : ""}`}>{r.status === "new" ? "New" : "Handled"}</span>
              <span>{r.name}</span><span className="a-muted">{r.service}</span><span className="a-muted">{formatDate(r.created_at)}</span>
            </summary>
            <div className="a-inq__body">
              <p><b>Contact:</b> {isMail ? <a href={`mailto:${r.contact}`}>{r.contact}</a> : <a href={waLink(r.contact, `Hello ${r.name}, this is Sudan Creative Hub about your inquiry.`)} target="_blank" rel="noopener noreferrer">{r.contact} (WhatsApp)</a>}</p>
              <p>{r.details}</p>
              <InquiryActions id={r.id} status={r.status} canDelete={isAdmin(staff)} />
            </div>
          </details>
        );
      })}
    </>
  );
}
