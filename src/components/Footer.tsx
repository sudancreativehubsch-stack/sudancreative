import Link from "next/link";
import { NAV } from "@/lib/site";
import { LogoMark } from "./Logo";
import { CookieSettingsButton } from "./Consent";
import { waLink } from "@/lib/utils";

export function Footer({ s }: { s: Record<string, string> }) {
  const year = new Date().getFullYear();
  const contactEmail = s.email || "sudancreativehubsch@gmail.com";
  const whatsappNum = s.whatsapp || "249963565781";

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-glass-card">
          <div className="footer__grid">
            {/* Column 1: Brand Info */}
            <div className="footer__brand-col">
              <Link href="/" className="logo" aria-label="Sudan Creative Hub, home">
                <LogoMark />
                <span className="logo__word">Sudan<br />Creative Hub</span>
              </Link>
              <p className="footer__tagline">
                An integrated marketing and creative production agency.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <nav className="footer__col" aria-label="Quick links">
              <h3 className="footer__col-title">Quick Links</h3>
              <ul className="footer__links">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href}>{n.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Column 3: Contact */}
            <div className="footer__col">
              <h3 className="footer__col-title">Contact</h3>
              <ul className="footer__links">
                <li>
                  <a href={`mailto:${contactEmail}`} className="footer__icon-link">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                    <span>{contactEmail}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={waLink(whatsappNum, "Hello Sudan Creative Hub, I would like to get a quote.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__icon-link"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z" />
                    </svg>
                    <span>+{whatsappNum}</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Our Branches */}
            <div className="footer__col">
              <h3 className="footer__col-title">Our Branches</h3>
              <ul className="footer__links">
                <li className="footer__icon-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>Egypt</span>
                </li>
                <li className="footer__icon-link">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>India</span>
                </li>
              </ul>
            </div>

            {/* Column 5: Follow Us */}
            <div className="footer__col">
              <h3 className="footer__col-title">Follow Us</h3>
              <div className="footer__socials">
                <a href={s.social_facebook || "https://facebook.com"} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer__social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href={s.social_instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href={s.social_tiktok || "https://tiktok.com"} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer__social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer__social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.35 29 29 0 0 0-.46-5.33z" />
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#040a36" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="footer-glass-bottom">
            <span>© {year} Sudan Creative Hub. All rights reserved.</span>
            <div className="footer-glass-bottom__links">
              <Link href="/privacy">Privacy Policy</Link>
              <span className="footer-divider">|</span>
              <Link href="/terms">Terms of Use</Link>
              <span className="footer-divider">|</span>
              <Link href="/cookies">Cookies</Link>
              <CookieSettingsButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
