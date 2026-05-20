"use client";

import React, { useState } from "react";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.532 5.845L.054 23.902l6.227-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.796 9.796 0 01-5.007-1.373l-.358-.213-3.7.864.933-3.612-.233-.37A9.797 9.797 0 012.182 12c0-5.413 4.405-9.818 9.818-9.818 5.414 0 9.818 4.405 9.818 9.818 0 5.414-4.404 9.818-9.818 9.818z" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: "#200e12",
    color: "#fcdadf",
    fontFamily: "'Inter', sans-serif",
    borderTop: "1px solid rgba(255,178,191,0.12)",
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 700,
    fontSize: "0.6875rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#ffb2bf",
    marginBottom: "1.125rem",
  };

  const linkBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.9375rem",
    fontWeight: 400,
    color: "#ad878d",
    padding: "4px 0",
    display: "block",
    textAlign: "left",
    transition: "color 0.2s ease",
    lineHeight: 1.6,
  };

  const socialBtnStyle = (id: string): React.CSSProperties => ({
    background: hovered === id ? "rgba(255,178,191,0.12)" : "rgba(255,178,191,0.06)",
    border: "1px solid rgba(255,178,191,0.15)",
    borderRadius: "10px",
    cursor: "pointer",
    width: "42px",
    height: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: hovered === id ? "#ffb2bf" : "#ad878d",
    transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
    borderColor: hovered === id ? "rgba(255,178,191,0.35)" : "rgba(255,178,191,0.15)",
  });

  const inputStyle: React.CSSProperties = {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,178,191,0.2)",
    borderRadius: "16px",
    padding: "11px 16px",
    color: "#fcdadf",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    minWidth: 0,
    transition: "border-color 0.2s ease",
  };

  const subscribeButtonStyle: React.CSSProperties = {
    backgroundColor: "#ffb2bf",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "16px",
    padding: "11px 20px",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 700,
    fontSize: "0.8125rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "transform 0.15s cubic-bezier(0.4,0,0.2,1), opacity 0.15s cubic-bezier(0.4,0,0.2,1)",
  };

  const dividerStyle: React.CSSProperties = {
    height: "1px",
    backgroundColor: "rgba(255,178,191,0.1)",
    margin: "0",
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 800,
    fontSize: "1.5rem",
    letterSpacing: "-0.03em",
    color: "#ffb2bf",
    textTransform: "uppercase",
    lineHeight: 1,
    marginBottom: "0.75rem",
  };

  const madeInIndiaBadge: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#fff0c0",
    color: "#0a0a0a",
    borderRadius: "999px",
    padding: "4px 12px",
    fontSize: "0.6875rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    marginTop: "1rem",
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Our Story", href: "/our-story" },
    { label: "The Creamery", href: "/creamery" },
    { label: "Contact", href: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refunds" },
    { label: "Shipping Info", href: "/shipping" },
  ];

  return (
    <footer style={footerStyle} role="contentinfo">
      {/* Main footer grid */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.25rem 3rem",
          display: "grid",
          gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
          gap: "3rem",
        }}
        className="md:grid-cols-4 lg:grid-cols-4"
      >
        {/* Brand column */}
        <div style={{ gridColumn: "span 1" }} className="md:col-span-1">
          <div style={logoStyle}>Chill Luxe</div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9375rem",
              color: "#ad878d",
              lineHeight: 1.7,
              maxWidth: "260px",
              marginTop: "0.5rem",
            }}
          >
            Obsessively crafted, small-batch artisanal ice creams. Hyper-premium ingredients. Unapologetically indulgent.
          </p>
          <div style={madeInIndiaBadge}>
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#0a0a0a" />
            </svg>
            Made in India
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.625rem", marginTop: "1.5rem" }}>
            <button
              style={socialBtnStyle("instagram")}
              aria-label="Follow Chill Luxe on Instagram"
              onMouseEnter={() => setHovered("instagram")}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered("instagram")}
              onBlur={() => setHovered(null)}
            >
              <InstagramIcon />
            </button>
            <button
              style={socialBtnStyle("twitter")}
              aria-label="Follow Chill Luxe on Twitter (X)"
              onMouseEnter={() => setHovered("twitter")}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered("twitter")}
              onBlur={() => setHovered(null)}
            >
              <TwitterIcon />
            </button>
            <button
              style={socialBtnStyle("whatsapp")}
              aria-label="Chat with Chill Luxe on WhatsApp"
              onMouseEnter={() => setHovered("whatsapp")}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered("whatsapp")}
              onBlur={() => setHovered(null)}
            >
              <WhatsAppIcon />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <p style={sectionHeadingStyle}>Quick Links</p>
          <nav aria-label="Footer quick links">
            {quickLinks.map((link) => (
              <button
                key={link.href}
                style={linkBtnStyle}
                onClick={() => {
                  if (typeof window !== "undefined") window.location.href = link.href;
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#ffb2bf";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#ad878d";
                }}
                aria-label={link.label}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Legal / Policy */}
        <div>
          <p style={sectionHeadingStyle}>Policies</p>
          <nav aria-label="Footer policy links">
            {legalLinks.map((link) => (
              <button
                key={link.href}
                style={linkBtnStyle}
                onClick={() => {
                  if (typeof window !== "undefined") window.location.href = link.href;
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#ffb2bf";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = "#ad878d";
                }}
                aria-label={link.label}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Newsletter */}
        <div>
          <p style={sectionHeadingStyle}>Stay in the Loop</p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9375rem",
              color: "#ad878d",
              lineHeight: 1.65,
              marginBottom: "1.25rem",
            }}
          >
            New flavors, limited drops, and behind-the-scenes from the creamery. No spam — ever.
          </p>
          {subscribed ? (
            <div
              style={{
                backgroundColor: "rgba(101,222,124,0.1)",
                border: "1px solid rgba(101,222,124,0.3)",
                borderRadius: "16px",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
              role="status"
              aria-live="polite"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#65de7c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="4 10 8 14 16 6" />
              </svg>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  color: "#65de7c",
                  fontWeight: 500,
                }}
              >
                You&apos;re on the list. Thanks!
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap" }}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                aria-label="Email address for newsletter"
                style={inputStyle}
                onFocus={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,178,191,0.5)";
                }}
                onBlur={(e) => {
                  (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(255,178,191,0.2)";
                }}
              />
              <button
                type="submit"
                style={subscribeButtonStyle}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.92";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.97)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                }}
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          )}

          {/* Trust badges */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              marginTop: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {["No Preservatives", "Vegan Options", "Razorpay Secure"].map((badge) => (
              <span
                key={badge}
                style={{
                  backgroundColor: "rgba(255,178,191,0.07)",
                  border: "1px solid rgba(255,178,191,0.15)",
                  borderRadius: "999px",
                  padding: "4px 12px",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#ad878d",
                  whiteSpace: "nowrap",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={dividerStyle} />

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.25rem 1.25rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8125rem",
            color: "#ad878d",
            margin: 0,
          }}
        >
          &copy; {currentYear} Chill Luxe. All rights reserved. Crafted with love in India.
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8125rem",
            color: "#ad878d",
            margin: 0,
          }}
        >
          Payments secured by{" "}
          <span style={{ color: "#ffb2bf", fontWeight: 600 }}>Razorpay</span>
        </p>
      </div>
    </footer>
  );
}