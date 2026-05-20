"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

export default function Home() {
  const router = useRouter();
  const { addItem } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Flavors");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.add("is-hidden"));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("is-hidden");
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const products = [
    {
      id: "midnight-truffle",
      name: "Midnight Truffle Core",
      price: 850,
      badge: "Bestseller",
      desc: "Ecuadorian dark chocolate base with shattered cacao nibs and a molten ganache center.",
      img: "/product-1.jpg",
    },
    {
      id: "crimson-berry",
      name: "Crimson Berry Velvet",
      price: 780,
      badge: "New Arrival",
      desc: "Wild forged raspberries churned with Madagascar vanilla bean and a hint of white pepper.",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnA-o7OjQYxThsQOez5agLjZblXj_K6etFEvpK06HHzLgSF5dj6k93lhDOxrBv0-IJ45orEVk1rMLbtCNVEhXQKEeYyHBNo6g-lNke_dWFjcmFl919Ygj0Tx-lt--xu5x-R3qsttPjFwEtsCSD3_AgkAZriTrYwTpd6LIIM6e6L1_26OXA_epmftfapMOH6e127BvnJ8CFqodIEFv85SbpRCn33Bc6lEXrYbAbJGLwVr0SbSmY-MHCu3osk9UoAWfPWA58verjILaj",
    },
  ];

  return (
    <div
      className="page-enter"
      style={{ background: "#0a0a0a", color: "#ffffff", fontFamily: "sans-serif", WebkitFontSmoothing: "antialiased" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600;700&display=swap');
        .page-enter { animation: fadeInPage 0.6s ease forwards; }
        @keyframes fadeInPage { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .is-hidden { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
        .reveal { transition: opacity 0.7s ease, transform 0.7s ease; }
        .primary-btn { background-color: #ff006e; color: #ffffff; border-radius: 9999px; transition: all 0.3s ease; }
        .primary-btn:hover { opacity: 0.9; transform: scale(0.98); }
        .ghost-btn { background-color: transparent; border: 2px solid #ffffff; color: #ffffff; border-radius: 9999px; transition: all 0.3s ease; }
        .ghost-btn:hover { background-color: rgba(255,255,255,0.1); }
        .luxury-card { background-color: #1a1a1a; border: 1px solid rgba(255,255,255,0.1); }
        .glass-panel { background: rgba(26,26,26,0.4); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); }
        .made-in-india { background-color: #ffd60a; color: #000000; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .btn-lift { transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1); }
        .btn-lift:hover { transform: scale(1.02); box-shadow: 0 8px 25px rgba(255,0,110,0.4); }
        .btn-lift:active { transform: scale(0.98); }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
        .animate-bounce-custom { animation: bounce 2s infinite; }
        .group-card:hover .group-img { transform: scale(1.05); }
        .group-img { transition: transform 0.7s ease, opacity 0.3s ease; }
        .group-card:hover .group-img { opacity: 1; }
        .group-card .card-bottom { transform: translateY(16px); transition: transform 0.5s ease; }
        .group-card:hover .card-bottom { transform: translateY(0); }
        .group-card .card-price-row { opacity: 1; transition: opacity 0.5s ease; }
        @media (min-width: 768px) { .group-card .card-price-row { opacity: 0; } .group-card:hover .card-price-row { opacity: 1; } }
      `}</style>

      {/* Header */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div
          style={{
            background: "rgba(10,10,10,0.8)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "16px 24px",
            }}
          >
            <button
              onClick={() => router.push("/")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 900,
                color: "#ff006e",
                textTransform: "uppercase",
                letterSpacing: "-1px",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Chill Luxe
            </button>

            {/* Desktop Nav */}
            <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="hidden-mobile">
              <button
                onClick={() => router.push("/shop")}
                style={{
                  color: "#ff006e",
                  fontWeight: 700,
                  fontSize: "14px",
                  letterSpacing: "0.5px",
                  background: "none",
                  border: "none",
                  borderBottom: "2px solid #ff006e",
                  paddingBottom: "4px",
                  cursor: "pointer",
                  transition: "opacity 0.3s",
                }}
              >
                Shop All
              </button>
              <button
                onClick={() => router.push("/shop")}
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "14px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff006e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
              >
                Our Story
              </button>
              <button
                onClick={() => router.push("/shop")}
                style={{
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "14px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff006e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#ffffff")}
              >
                The Creamery
              </button>
            </nav>

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <button
                aria-label="Shopping Cart"
                onClick={() => router.push("/checkout")}
                style={{
                  position: "relative",
                  padding: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#ff006e",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span
                  style={{
                    position: "absolute",
                    top: "4px",
                    right: "4px",
                    width: "10px",
                    height: "10px",
                    background: "#ffd60a",
                    borderRadius: "50%",
                    border: "2px solid #0a0a0a",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="reveal"
          style={{
            position: "relative",
            height: "100vh",
            minHeight: "600px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGwUbJZ_Qa0PBgvhJf-m6-sxN69HFobydlBRuMhS1ItxU7zj49tl54y4VPle1wkz1flESmS37QAtxc0k16G_fEdzHwcUIkhKhx5s4ZPNH1N2FSOiogqkI8stENPZ3dtiorOyiDLrgMc-nWWuj_Xw_o0brJK6KMZ4AWjCbWR5FjyzpAhaKnKAH2exTkvuIaTS7OOJCmJHyg3zOAD9SGTQfBPXxeIREWngo1JZcmv12SbwLv4Z2V6cRk7KuADpqSp7SPpjotbmznPVY8"
              alt="Luxury Artisanal Ice Cream"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.4) 50%, transparent 100%)",
              }}
            />
          </div>

          {/* Hero Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: "1400px",
              padding: "0 24px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              marginTop: "64px",
            }}
          >
            {/* Made in India Badge */}
            <div
              className="made-in-india"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "9999px",
                marginBottom: "24px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: 700,
                fontSize: "12px",
                boxShadow: "0 4px 15px rgba(255,214,10,0.3)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Made in India</span>
            </div>

            {/* H1 */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 900,
                color: "#ffffff",
                marginBottom: "24px",
                maxWidth: "900px",
                lineHeight: 1.1,
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
                letterSpacing: "-1px",
              }}
            >
              OBSESSIVELY CRAFTED.
              <br />
              <span style={{ color: "#ff006e" }}>UNAPOLOGETICALLY INDULGENT.</span>
            </h1>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                color: "rgba(255,255,255,0.7)",
                maxWidth: "640px",
                marginBottom: "40px",
                lineHeight: 1.7,
              }}
            >
              Experience the pinnacle of frozen dessert architecture. Small-batch, hyper-premium ingredients churned into a velvety luxury for the modern palate.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <button
                className="primary-btn btn-lift"
                onClick={() => router.push("/shop")}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  padding: "16px 40px",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span>Shop Now</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button
                className="ghost-btn btn-lift"
                onClick={() => router.push("/shop")}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  padding: "16px 40px",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  cursor: "pointer",
                }}
              >
                Explore Flavors
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="animate-bounce-custom"
            style={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              opacity: 0.5,
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "3px",
                marginBottom: "8px",
                color: "#ffffff",
              }}
            >
              Scroll
            </span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </section>

        {/* Craft Story Section */}
        <section
          className="reveal"
          style={{
            width: "100%",
            padding: "100px 0",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 24px",
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {/* Editorial Copy - col-span-5 */}
            <div
              style={{
                gridColumn: "span 5",
                order: 2,
                display: "flex",
                flexDirection: "column",
                gap: "0",
              }}
              className="story-copy"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
                <div style={{ height: "1px", width: "48px", background: "#ff006e" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700,
                    fontSize: "12px",
                    color: "#ff006e",
                    textTransform: "uppercase",
                    letterSpacing: "3px",
                  }}
                >
                  The Creamery
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(32px, 3.5vw, 52px)",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  marginBottom: "24px",
                  letterSpacing: "-0.5px",
                }}
              >
                THE ART OF
                <br />
                THE CHURN.
              </h2>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "17px",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.75,
                  marginBottom: "16px",
                }}
              >
                We abandoned traditional recipes to engineer a superior textural experience. By controlling the overrun—the air whipped into the base—we achieve a density that borders on scandalous.
              </p>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                }}
              >
                Every pint is hand-packed in our minimalist facility, ensuring that the structural integrity of every swirl, inclusion, and ribbon is preserved until it reaches your spoon.
              </p>

              <button
                onClick={() => router.push("/shop")}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid #ffffff",
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  paddingBottom: "4px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "color 0.3s, border-color 0.3s",
                  alignSelf: "flex-start",
                  marginTop: "8px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff006e";
                  e.currentTarget.style.borderBottomColor = "#ff006e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderBottomColor = "#ffffff";
                }}
              >
                Read Our Story
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            {/* Process Photo - col-span-7 */}
            <div
              className="group-card card-hover"
              style={{
                gridColumn: "span 7",
                order: 1,
                position: "relative",
                height: "700px",
                borderRadius: "32px",
                overflow: "hidden",
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)",
                cursor: "pointer",
              }}
              onClick={() => router.push("/shop")}
            >
              <img
                className="group-img"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTYJsOcYrnAqTYHV8mIW3gzVUH-0WqO8CpMrIBUiwVei7m5gwOC6q85h9KHL6N-S9t-AafVatz5gRPqisl_dO-MB4M47lz8vDdqSSeWV6SgaRkPe_GSEZA7PzchHT04gFzEh4CG_2HqEQZQ7ZnDahPe4Lgud6221PdUiW0lqA_yTYMcG4vV2IHDhTyruwDTbFCu4uopRRYSSIknlnTrzjY9Q3uy8EECLdVtwkfCS-WgLdr9wy9muZEShNp_m2wjNtvLpPau3gEwkWV"
                alt="Ice Cream Crafting Process"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.7s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />

              {/* Floating Glass Panel */}
              <div
                className="glass-panel"
                style={{
                  position: "absolute",
                  bottom: "32px",
                  right: "32px",
                  left: "32px",
                  padding: "24px",
                  borderRadius: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ff006e" strokeWidth="2">
                    <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/>
                    <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                    <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/>
                    <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/>
                    <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/>
                    <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/>
                    <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/>
                    <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>
                  </svg>
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#ffffff",
                        marginBottom: "8px",
                      }}
                    >
                      Micro-Batched
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.5,
                      }}
                    >
                      Precision temperature control for ultimate velvet texture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section
          className="reveal"
          style={{
            width: "100%",
            padding: "100px 0",
            background: "#111111",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 24px" }}>
            {/* Header Row */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "48px",
                gap: "24px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(32px, 4vw, 56px)",
                    fontWeight: 900,
                    color: "#ffffff",
                    lineHeight: 1.05,
                    letterSpacing: "-0.5px",
                  }}
                >
                  CURATED
                  <br />
                  COLLECTION
                </h2>
              </div>

              {/* Filter Pills */}
              <div
                className="hide-scrollbar"
                style={{
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  paddingBottom: "8px",
                }}
              >
                {["All Flavors", "Vegan", "Limited Edition"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      background: activeFilter === filter ? "#ff006e" : "#1a1a1a",
                      color: activeFilter === filter ? "#ffffff" : "rgba(255,255,255,0.6)",
                      border: activeFilter === filter ? "none" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "9999px",
                      padding: "8px 24px",
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 700,
                      fontSize: "12px",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (activeFilter !== filter) e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                      if (activeFilter !== filter) e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "32px",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group-card card-hover luxury-card"
                  style={{
                    position: "relative",
                    borderRadius: "32px",
                    overflow: "hidden",
                    height: "600px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    router.push(
                      "/product?name=" +
                        encodeURIComponent(product.name) +
                        "&price=" +
                        product.price +
                        "&img=" +
                        encodeURIComponent(product.img)
                    )
                  }
                >
                  <img
                    className="group-img"
                    src={product.img}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.8,
                      transition: "transform 0.7s ease, opacity 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.opacity = "0.8";
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, black 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                      opacity: 0.8,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Top Row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span
                        style={{
                          background: "rgba(0,0,0,0.5)",
                          backdropFilter: "blur(8px)",
                          color: "#ffffff",
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 700,
                          fontSize: "12px",
                          padding: "6px 16px",
                          borderRadius: "9999px",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {product.badge}
                      </span>
                      <button
                        className="glass-panel"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid rgba(255,255,255,0.1)",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          color: "#ffffff",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#ffffff";
                          e.currentTarget.style.color = "#000000";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(26,26,26,0.4)";
                          e.currentTarget.style.color = "#ffffff";
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                        </svg>
                      </button>
                    </div>

                    {/* Bottom Content */}
                    <div className="card-bottom">
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: "28px",
                          fontWeight: 700,
                          color: "#ffffff",
                          marginBottom: "8px",
                        }}
                      >
                        {product.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "15px",
                          color: "rgba(255,255,255,0.6)",
                          marginBottom: "24px",
                          maxWidth: "360px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.desc}
                      </p>
                      <div
                        className="card-price-row"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "32px",
                            fontWeight: 700,
                            color: "#ffffff",
                          }}
                        >
                          ₹{product.price}
                        </span>
                        <button
                          className="primary-btn btn-lift"
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              quantity: 1,
                              image: product.img,
                            });
                          }}
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: "14px",
                            padding: "12px 24px",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            <line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>
                          </svg>
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View Collection Button */}
            <div style={{ marginTop: "48px", display: "flex", justifyContent: "center" }}>
              <button
                className="ghost-btn btn-lift"
                onClick={() => router.push("/shop")}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  padding: "16px 40px",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  cursor: "pointer",
                }}
              >
                View Entire Collection
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          className="reveal"
          style={{
            width: "100%",
            position: "relative",
            padding: "120px 0",
            overflow: "hidden",
          }}
        >
          {/* Background */}
          <div style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKGz0SQY_YI9NFk52lHmGlZvPTkzWBrpBZJoy5hfutZLDcgzAVVNtMrR_3A01MPPORh5odCQ7qz2jpDptM2axAv3SX6xfJSYO_Att9mwn4QdIb7DN6V0JHdg-pU-WOyNBjdagnMP33wclJZy0gF-tatba6FhNwpWwgaCbJxe8vBPm2Wgafumm72t-UT1aer_gX0uHGh6GYArcGxxTyKCXHlpF871YxwipgouXPaKIvXhbMpRnSjXABPvQgaQ0M5RT75mXbcGxKX4r_"
              alt="Abstract Ice Cream Texture"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(10,10,10,0.7)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />
          </div>

          {/* CTA Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 24px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 6vw, 80px)",
                fontWeight: 900,
                color: "#ffffff",
                marginBottom: "24px",
                lineHeight: 1.1,
                letterSpacing: "-1px",
              }}
            >
              TREAT YOURSELF.
              <br />
              NO APOLOGIES.
            </h2>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "18px",
                color: "rgba(255,255,255,0.7)",
                maxWidth: "560px",
                margin: "0 auto 40px",
                lineHeight: 1.7,
              }}
            >
              Join our exclusive tier for early access to limited edition drops, secret flavors, and complimentary cold-chain shipping.
            </p>

            <div
              style={{
                maxWidth: "480px",
                margin: "0 auto",
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  minWidth: "200px",
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  borderRadius: "9999px",
                  padding: "16px 24px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  outline: "none",
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 2px #ff006e")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              <button
                className="primary-btn btn-lift"
                onClick={() => {
                  if (email) setEmail("");
                }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  padding: "16px 32px",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  border: "none",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "80px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "48px",
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: "span 1", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px",
                fontWeight: 900,
                color: "#ff006e",
                letterSpacing: "-1px",
                textTransform: "uppercase",
              }}
            >
              Chill Luxe
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                maxWidth: "240px",
              }}
            >
              Redefining frozen indulgence for the modern aesthete. Handcrafted with obsession.
            </p>
            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={() => router.push("/shop")}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff006e";
                  e.currentTarget.style.borderColor = "#ff006e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                IG
              </button>
              <button
                onClick={() => router.push("/shop")}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ff006e";
                  e.currentTarget.style.borderColor = "#ff006e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
              >
                TW
              </button>
            </div>
          </div>

          {/* Links - 3 cols spanning col-span-3 */}
          <div
            style={{
              gridColumn: "span 3",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "32px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h5
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "8px",
                }}
              >
                Explore
              </h5>
              {["Our Story", "The Creamery", "Shop All"].map((link) => (
                <button
                  key={link}
                  onClick={() => router.push("/shop")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {link}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h5
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "8px",
                }}
              >
                Support
              </h5>
              {["Shipping & Returns", "Privacy Policy", "Sustainability"].map((link) => (
                <button
                  key={link}
                  onClick={() => router.push("/shop")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: 0,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                  {link}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h5
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  marginBottom: "8px",
                }}
              >
                Contact
              </h5>
              <a
                href="mailto:hello@chillluxe.com"
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff006e")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              >
                hello@chillluxe.com
              </a>
              <span
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                }}
              >
                Mumbai, Maharashtra
              </span>
            </div>
          </div>

          {/* Copyright Row */}
          <div
            style={{
              gridColumn: "span 4",
              marginTop: "48px",
              paddingTop: "32px",
              borderTop: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              © 2024 Chill Luxe. Handcrafted with obsession. Made in India.
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Secure Checkout by Razorpay</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 767px) {
          .hidden-mobile { display: none !important; }
          .story-copy { grid-column: span 12 !important; order: 2 !important; }
          .story-img { grid-column: span 12 !important; order: 1 !important; height: 400px !important; }
        }
      `}</style>
    </div>
  );
}