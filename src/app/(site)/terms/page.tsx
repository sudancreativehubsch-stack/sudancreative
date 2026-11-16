import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms for using the Sudan Creative Hub website.", alternates: { canonical: "/terms" } };

export default function Terms() {
  return (
    <section className="section">
      <div className="wrap prose">
        <h1 className="t-h1" style={{ fontSize: "clamp(2.6rem,7vw,5.5rem)" }}>Terms of use</h1>
        <p className="muted" style={{ marginTop: "1rem" }}>Last updated: November 2026</p>

        <h2>Using this site</h2>
        <p>This website presents the services and work of Sudan Creative Hub. By using it you agree to these terms. If you do not agree, please do not use the site.</p>

        <h2>Our work and intellectual property</h2>
        <p>Text, designs, photographs, videos, logos and other material on this site belong to Sudan Creative Hub or to the clients and talent who allowed us to show them. You may view and share links to pages, but you may not copy, modify or reuse the material without written permission.</p>

        <h2>Models and talent</h2>
        <p>Profiles are shown with the permission of the people featured. Pressing Choose this model opens a WhatsApp message to us. It is an enquiry, not a booking. Availability, fees and terms are confirmed in writing with us before any engagement.</p>

        <h2>Enquiries and quotes</h2>
        <p>Information on this site is general. Nothing here is a binding offer. Prices, timelines and deliverables are agreed in a written proposal or contract.</p>

        <h2>Accuracy and availability</h2>
        <p>We try to keep the site accurate and available, but we do not promise it will be uninterrupted or error free.</p>

        <h2>Links to other sites</h2>
        <p>We link to social networks and WhatsApp. We are not responsible for their content or practices.</p>

        <h2>Liability</h2>
        <p>To the extent the law allows, we are not liable for losses arising from the use of this site. Nothing here limits liability that cannot be limited by law.</p>

        <h2>Governing law</h2>
        <p>These terms are governed by the laws that apply to the Sudan Creative Hub entity you contract with, as stated in your written agreement. Questions: sudancreativehubsch@gmail.com.</p>
      </div>
    </section>
  );
}
