import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { RESOURCES, RESOURCE_ORDER } from "@/lib/resources";

export default async function Dashboard() {
  const { supabase } = await requireStaff();
  const counts = await Promise.all(
    RESOURCE_ORDER.map(async (k) => {
      const { count } = await supabase.from(RESOURCES[k].table).select("id", { count: "exact", head: true });
      return [k, count ?? 0] as const;
    }),
  );
  const { count: fresh } = await supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new");

  return (
    <>
      <h1>Dashboard</h1>
      <p className="a-lead">Update the website here. Changes appear on the live site within about 30 seconds.</p>
      <div className="a-cards">
        <Link className="a-card" href="/admin/inquiries"><b>{fresh ?? 0}</b><span>New inquiries</span></Link>
        {counts.map(([k, n]) => <Link key={k} className="a-card" href={`/admin/${k}`}><b>{n}</b><span>{RESOURCES[k].plural}</span></Link>)}
        <Link className="a-card" href="/admin/settings"><b>Aa</b><span>Site text and contact details</span></Link>
      </div>
    </>
  );
}
