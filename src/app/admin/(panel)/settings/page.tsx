import { SettingsForm } from "@/components/admin/Small";
import { requireStaff } from "@/lib/auth";
import { DEFAULT_SETTINGS, SETTING_DEFS } from "@/lib/defaults";

export default async function SettingsPage() {
  const { supabase } = await requireStaff();
  const { data } = await supabase.from("site_settings").select("key,value");
  const values = { ...DEFAULT_SETTINGS };
  for (const r of data ?? []) if (r.value) values[r.key] = r.value;
  return (
    <>
      <h1>Site text and contact details</h1>
      <p className="a-lead">Edit the wording on the home and about pages, contact details, branch addresses and social links.</p>
      <SettingsForm defs={SETTING_DEFS} values={values} />
    </>
  );
}
