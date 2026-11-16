import { notFound } from "next/navigation";
import { ResourceForm } from "@/components/admin/ResourceForm";
import { isAdmin, requireStaff } from "@/lib/auth";
import { defaultsFor, RESOURCES } from "@/lib/resources";

type Props = { params: Promise<{ resource: string; id: string }> };

export default async function ResourceEdit({ params }: Props) {
  const { resource, id } = await params;
  const res = RESOURCES[resource];
  if (!res) notFound();
  const staff = await requireStaff();

  let initial = defaultsFor(res);
  if (id !== "new") {
    const { data } = await staff.supabase.from(res.table).select("*").eq("id", id).maybeSingle();
    if (!data) notFound();
    initial = { ...initial, ...data };
  }

  return (
    <>
      <h1>{id === "new" ? `Add ${res.singular}` : `Edit ${res.singular}`}</h1>
      <p className="a-lead">{res.hint}</p>
      <ResourceForm
        resourceKey={res.key} fields={res.fields} id={id === "new" ? null : id}
        initial={initial} canDelete={isAdmin(staff)} singular={res.singular}
      />
    </>
  );
}
