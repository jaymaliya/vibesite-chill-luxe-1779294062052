"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItems);
  const [badgePop, setBadgePop] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems !== prevCount) {
      setBadgePop(true);
      setPrevCount(totalItems);
      const t = setTimeout(() => setBadgePop(false), 350);
      return () => clearTimeout(t);
    }
  }, [totalItems, prevCount]);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  const navLinks: { label: string; path: string }[] = [
    { label: "Shop All", path: "/shop" },
    { label: "Our Story", path: "/our-story" },
    { label: "The Creamery", path: "/creamery" },
  ];

  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: "box-shadow 0.3s ease, background-color 0.3s ease",
    boxShadow: scrolled
      ? "0 2px 24px 0 rgba(255,178,191,0.08), 0 1px 0 0 rgba(255,255,255,0.06)"
      : "none",
  };

  const innerBgStyle: React.CSSProperties = {
    backgroundColor: scrolled
      ? "rgba(10,10,10,0.92)"
      : "rgba(10,10,10,0.72)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "1280px",
    margin: "0 auto",
    padding: "0 1.25rem",
    height: "64px",
  };

  const logoStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: 800,
    fontSize: "1.35rem",
    letterSpacing: "-0.03em",
    color: "#ffb2bf",
    textTransform: "uppercase",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    lineHeight: 1,
    transition: "opacity 0.2s ease",
  };

  const navLinkBaseStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.8125rem",
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "4px 0",
    transition: "color 0.2s ease, opacity 0.2s ease",
  };

  const cartBtnStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    position: "relative",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffb2bf",
    transition: "opacity 0.2s ease",
    borderRadius: "8px",
  };

  const hamburgerStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    color: "#ffb2bf",
  };

  const mobileMenuStyle: React.CSSProperties = {
    overflow: "hidden",
    transition: "max-height 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease",
    maxHeight: mobileOpen ? "320px" : "0px",
    opacity: mobileOpen ? 1 : 0,
    backgroundColor: "rgba(10,10,10,0.97)",
    borderBottom: mobileOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
  };

  const mobileLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.9375rem",
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#fcdadf",
    padding: "14px 1.25rem",
    width: "100%",
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    transition: "color 0.2s ease, background-color 0.2s ease",
  };

  const badgeStyle: React.CSSProperties = {
    position: "absolute",
    top: "2px",
    right: "2px",
    width: "18px",
    height: "18px",
    backgroundColor: "#ffb2bf",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.625rem",
    fontWeight: 700,
    color: "#0a0a0a",
    border: "2px solid #0a0a0a",
    transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)",
    transform: badgePop ? "scale(1.45)" : "scale(1)",
    pointerEvents: "none",
  };

  return (
    <header style={headerStyle} role="banner">
      <div style={innerBgStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <button
            style={logoStyle}
            onClick={() => router.push("/")}
            aria-label="Chill Luxe — Home"
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
          >
            Chill Luxe
          </button>

          {/* Desktop Nav */}
          <nav
            aria-label="Main navigation"
            style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
            className="hidden md:flex"
          >
            <button
              onClick={() => router.push("/shop")}
              style={{ ...navLinkBaseStyle, color: "#fff0c0", borderBottom: "2px solid #fff0c0", paddingBottom: "2px" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
              aria-label="Shop All flavors"
            >
              Shop All
            </button>
            <button
              onClick={() => router.push("/our-story")}
              style={{ ...navLinkBaseStyle, color: "#fcdadf" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ffb2bf"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fcdadf"; }}
              aria-label="Our Story"
            >
              Our Story
            </button>
            <button
              onClick={() => router.push("/creamery")}
              style={{ ...navLinkBaseStyle, color: "#fcdadf" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#ffb2bf"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fcdadf"; }}
              aria-label="The Creamery"
            >
              The Creamery
            </button>
          </nav>

          {/* Right side: Cart + Hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Cart Button */}
            <button
              style={cartBtnStyle}
              onClick={() => router.push("/cart")}
              aria-label={`Shopping cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.75")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 && (
                <span style={badgeStyle} aria-live="polite">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              style={hamburgerStyle}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="md:hidden"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                  <line x1="3" y1="6" x2="19" y2="6" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="16" x2="19" y2="16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          style={mobileMenuStyle}
          aria-hidden={!mobileOpen}
          role="navigation"
          aria-label="Mobile navigation"
          className="md:hidden"
        >
          <button
            onClick={() => { router.push("/shop"); setMobileOpen(false); }}
            style={{ ...mobileLinkStyle, color: "#fff0c0" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,240,192,0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            Shop All
          </button>
          <button
            onClick={() => { router.push("/our-story"); setMobileOpen(false); }}
            style={mobileLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,178,191,0.06)"; (e.currentTarget as HTMLButtonElement).style.color = "#ffb2bf"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#fcdadf"; }}
          >
            Our Story
          </button>
          <button
            onClick={() => { router.push("/creamery"); setMobileOpen(false); }}
            style={mobileLinkStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,178,191,0.06)"; (e.currentTarget as HTMLButtonElement).style.color = "#ffb2bf"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#fcdadf"; }}
          >
            The Creamery
          </button>
          <button
            onClick={() => { router.push("/cart"); setMobileOpen(false); }}
            style={{ ...mobileLinkStyle, borderBottom: "none", color: "#65de7c" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(101,222,124,0.06)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
          >
            Cart {totalItems > 0 ? `(${totalItems})` : ""}
          </button>
        </div>
      </div>
    </header>
  );
}