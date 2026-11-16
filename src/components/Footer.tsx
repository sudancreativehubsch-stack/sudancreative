import Link from "next/link";
import { NAV } from "@/lib/site";
import { LogoMark } from "./Logo";
import { CookieSettingsButton } from "./Consent";
import { waLink } from "@/lib/utils";

export function Footer({ s }: { s: Record<string, string> }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <LogoMark className="footer__logo" />
            <p className="muted" style={{ marginTop: "1rem", maxWidth: "30ch" }}>
              Integrated marketing and creative production. Turning ideas into impact.
            </p>
          </div>
          <nav aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              {NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
            </ul>
          </nav>
          <div>
            <h2>Contact</h2>
            <ul>
              <li><a href={`mailto:${s.email}`}>{s.email}</a></li>
              <li><a href={waLink(s.whatsapp, "Hello Sudan Creative Hub, I would like to discuss a project.")} rel="noopener">WhatsApp +{s.whatsapp}</a></li>
              <li style={{ marginTop: "1rem" }}><b>Egypt</b><br /><span className="muted">{s.branch_egypt}</span></li>
              <li style={{ marginTop: "1rem" }}><b>India</b><br /><span className="muted">{s.branch_india}</span></li>
            </ul>
          </div>
          <div>
            <h2>Follow</h2>
            <ul>
              <li><a href={s.social_facebook} rel="noopener noreferrer" target="_blank">Facebook</a></li>
              <li><a href={s.social_instagram} rel="noopener noreferrer" target="_blank">Instagram</a></li>
              <li><a href={s.social_tiktok} rel="noopener noreferrer" target="_blank">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__mark" aria-hidden="true">Sudan Creative Hub</div>
        <div className="footer__legal">
          <span>© {year} Sudan Creative Hub. All rights reserved.</span>
          <span style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of use</Link>
            <Link href="/cookies">Cookies</Link>
            <CookieSettingsButton />
          </span>
        </div>
      </div>
    </footer>
  );
}
