import { Consent } from "./Consent";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { getSettings, isDemoMode } from "@/lib/data";

/** Header, footer and cookie banner shared by every public page. */
export async function SiteChrome({ children }: { children: React.ReactNode }) {
  const s = await getSettings();
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      {isDemoMode() ? (
        <div className="demo-banner" role="note">
          Preview mode: showing sample content because the database is not connected yet.
        </div>
      ) : null}
      <Header />
      <main id="main">{children}</main>
      <Footer s={s} />
      <Consent />
    </>
  );
}
