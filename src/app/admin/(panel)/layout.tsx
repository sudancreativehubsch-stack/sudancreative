import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { signOut } from "@/lib/actions";
import { isAdmin, requireStaff } from "@/lib/auth";
import { RESOURCES, RESOURCE_ORDER } from "@/lib/resources";

export default async function Panel({ children }: { children: React.ReactNode }) {
  const staff = await requireStaff();
  return (
    <div className="a-shell">
      <aside className="a-side">
        <div className="a-brand"><LogoMark /> Admin</div>
        <nav className="a-nav" aria-label="Admin">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/settings">Site text</Link>
          {RESOURCE_ORDER.map((k) => <Link key={k} href={`/admin/${k}`}>{RESOURCES[k].plural}</Link>)}
          <Link href="/admin/inquiries">Inquiries</Link>
          {isAdmin(staff) ? <Link href="/admin/users">Team</Link> : null}
          {isAdmin(staff) ? <Link href="/admin/audit">Activity log</Link> : null}
          <Link href="/" target="_blank">View website</Link>
        </nav>
        <div className="a-who">
          {staff.email}<br />Role: {staff.role}
          <form action={signOut}><button>Sign out</button></form>
        </div>
      </aside>
      <div className="a-main">{children}</div>
    </div>
  );
}
