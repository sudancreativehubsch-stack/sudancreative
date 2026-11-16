import { redirect } from "next/navigation";
import { RoleSelect } from "@/components/admin/Small";
import { isAdmin, requireStaff } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export default async function Users() {
  const staff = await requireStaff();
  if (!isAdmin(staff)) redirect("/admin");
  const { data } = await staff.supabase.from("profiles").select("id,email,role,created_at").order("created_at");
  return (
    <>
      <h1>Team</h1>
      <p className="a-lead">
        Admins can do everything. Editors can add and edit content but cannot delete or manage the team.
        To add someone: create their user in Supabase (Authentication, Add user), then set their role here.
      </p>
      <div className="a-scroll">
        <table className="a-table">
          <thead><tr><th>Email</th><th>Role</th><th>Created</th></tr></thead>
          <tbody>
            {(data ?? []).map((u) => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td><RoleSelect id={u.id} role={u.role} disabled={u.id === staff.id} /></td>
                <td>{formatDate(u.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
