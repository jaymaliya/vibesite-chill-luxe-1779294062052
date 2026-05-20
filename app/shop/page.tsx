"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef } from "react";

const products = [
  { id: 1, img: "/product-1.jpg", name: "genrate very beautiful", description: "genrate me very beautiful website for selling this ice creams", price: 0, badge: "NEW" },
  { id: 2, img: "/product-2.jpg", name: "Six bright yellow-orange", description: "Six bright yellow-orange scoops of food with darker orange chunks, served in a round,", price: 30, badge: "" },
  { id: 3, img: "/product-3.jpg", name: "Three scoops dark", description: "Three scoops of dark brown chocolate ice cream in a shallow, off-white ceramic bowl.", price: 40, badge: "" },
  { id: 4, img: "/product-4.jpg", name: "white ceramic footed", description: "A white ceramic footed cup with a handle and dark blue scroll pattern, filled with scoops", price: 50, badge: "" }
];

const filterLabels = ["All", "Vegan", "Classic", "Limited Edition", "Sorbets"];

export default function ShopPage() {
  const router = useRouter();
  const { addItem, totalItems } = useCart();
  const [activeFilter, setActiveFilter] = useState("All");
  const [addedStates, setAddedStates] = useState<{ [key: number]: boolean }>({});
  const [cartBounce, setCartBounce] = useState(false);

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

  const handleAddItem = (p: typeof products[0]) => {
    addItem({
      id: crypto.randomUUID(),
      name: p.name,
      price: p.price,
      quantity: 1,
      image: p.img,
    });
    setAddedStates((prev) => ({ ...prev, [p.id]: true }));
    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 400);
    setTimeout(() => {
      setAddedStates((prev) => ({ ...prev, [p.id]: false }));
    }, 1500);
  };

  const handleCardClick = (p: typeof products[0]) => {
    router.push(
      `/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`
    );
  };

  return (
    <div
      style={{ background: "#0a0a0a", color: "#fcdadf", minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <style>{`
        .is-hidden { opacity: 0; transform: translateY(32px); transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
        .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-6px) scale(1.01); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .btn-lift { transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1); }
        .btn-lift:hover { transform: scale(1.02); box-shadow: 0 6px 20px rgba(255,0,110,0.35); }
        .btn-lift:active { transform: scale(0.98); }
        .ghost-btn { transition: background 0.3s, color 0.3s, transform 0.15s; }
        .ghost-btn:hover { background: #fff; color: #000; transform: scale(1.02); }
        .ghost-btn:active { transform: scale(0.98); }
        .filter-pill { transition: background 0.3s, border-color 0.3s, transform 0.15s; }
        .filter-pill:hover { opacity: 0.85; }
        .img-zoom { transition: transform 0.7s cubic-bezier(0.4,0,0.2,1); }
        .img-zoom:hover { transform: scale(1.06); }
        .cart-bounce { animation: cartPop 0.4s cubic-bezier(0.4,0,0.2,1); }
        @keyframes cartPop { 0%{transform:scale(1)} 50%{transform:scale(1.3)} 100%{transform:scale(1)} }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      {/* Header */}
      <header
        style={{
          background: "rgba(10,10,10,0.85)",
          backdropFilter: "blur(16px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 24px",
          }}
        >
          {/* Menu */}
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fcdadf",
              fontSize: "24px",
              display: "flex",
              alignItems: "center",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ff006e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#fcdadf")}
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#fcdadf",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ff006e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#fcdadf")}
          >
            Chill Luxe
          </button>

          {/* Cart */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={() => router.push("/checkout")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fcdadf",
                position: "relative",
                display: "flex",
                alignItems: "center",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ff006e")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#fcdadf")}
              aria-label="Cart"
            >
              <svg
                className={cartBounce ? "cart-bounce" : ""}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.44 5H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              {totalItems > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-6px",
                    background: "#ff006e",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "18px",
                    height: "18px",
                    fontSize: "11px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main style={{ flexGrow: 1 }}>
        {/* Trust strip */}
        <div
          style={{
            background: "#ff006e",
            color: "#fff",
            textAlign: "center",
            padding: "8px 24px",
            fontSize: "13px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            letterSpacing: "0.02em",
          }}
        >
          ★★★★★ 4.8 &nbsp;|&nbsp; 10,000+ customers &nbsp;|&nbsp; Free Shipping &nbsp;|&nbsp; Made in India
        </div>

        {/* Editorial Header Section */}
        <section
          className="reveal"
          style={{
            padding: "64px 24px 40px",
            maxWidth: "1280px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 900,
              color: "#fcdadf",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              marginBottom: "20px",
              lineHeight: 1.05,
            }}
          >
            The Full Collection
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "18px",
              color: "rgba(252,218,223,0.65)",
              maxWidth: "640px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Discover our obsession with flavor. Uncompromising ingredients, boldly imagined.
          </p>
        </section>

        {/* Filters Section */}
        <section
          className="reveal"
          style={{
            padding: "0 24px 40px",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <div
            className="scrollbar-hide"
            style={{
              display: "flex",
              gap: "12px",
              overflowX: "auto",
              paddingBottom: "8px",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {filterLabels.map((label) => (
              <button
                key={label}
                className="filter-pill btn-lift"
                onClick={() => setActiveFilter(label)}
                style={{
                  padding: "8px 24px",
                  borderRadius: "9999px",
                  background: activeFilter === label ? "#ff006e" : "#1a1a1a",
                  color: activeFilter === label ? "#fff" : "#fcdadf",
                  border: activeFilter === label ? "2px solid #ff006e" : "1px solid rgba(255,255,255,0.1)",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  letterSpacing: "0.02em",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid Section */}
        <section
          className="reveal"
          style={{
            padding: "0 24px 80px",
            maxWidth: "1280px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
              gap: "32px",
            }}
          >
            {products.map((p) => (
              <div
                key={p.id}
                className="card-hover"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                {/* Image */}
                <div
                  onClick={() => handleCardClick(p)}
                  style={{
                    aspectRatio: "4/5",
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: "inherit",
                  }}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="img-zoom"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                  {/* Badge */}
                  {p.badge && (
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "16px",
                        background:
                          p.badge === "NEW"
                            ? "#ff006e"
                            : p.badge === "Vegan"
                            ? "#ff006e"
                            : p.badge === "Made in India"
                            ? "#fcdadf"
                            : "#fff",
                        color:
                          p.badge === "NEW" || p.badge === "Vegan"
                            ? "#fff"
                            : "#000",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "11px",
                        letterSpacing: "0.08em",
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        textTransform: "uppercase",
                      }}
                    >
                      {p.badge}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <div onClick={() => handleCardClick(p)}>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: "#fcdadf",
                        marginBottom: "8px",
                        lineHeight: 1.2,
                      }}
                    >
                      {p.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        color: "rgba(252,218,223,0.55)",
                        marginBottom: "16px",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {p.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "auto",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "26px",
                        fontWeight: 700,
                        color: "#fcdadf",
                      }}
                    >
                      {p.price === 0 ? "Free" : `₹${p.price}`}
                    </span>
                    <button
                      className="ghost-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddItem(p);
                      }}
                      style={{
                        padding: "8px 24px",
                        borderRadius: "9999px",
                        border: "2px solid #fff",
                        color: addedStates[p.id] ? "#000" : "#fff",
                        background: addedStates[p.id] ? "#fff" : "transparent",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        cursor: "pointer",
                        letterSpacing: "0.02em",
                        transition: "background 0.3s, color 0.3s, transform 0.15s",
                      }}
                    >
                      {addedStates[p.id] ? "Added ✓" : "Quick View"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#0a0a0a",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          marginTop: "auto",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "60px 24px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "32px",
          }}
        >
          {/* Brand */}
          <div>
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fcdadf",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(20px, 3vw, 28px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "16px",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ff006e")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#fcdadf")}
            >
              Chill Luxe
            </button>
          </div>

          {/* Col 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {["Our Story", "The Creamery"].map((link) => (
              <button
                key={link}
                onClick={() => router.push("/")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(252,218,223,0.55)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  textAlign: "left",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ff006e")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(252,218,223,0.55)")}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Col 2 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <button
              onClick={() => router.push("/shop")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fcdadf",
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                textAlign: "left",
                padding: 0,
                textDecoration: "underline",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ff006e")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#fcdadf")}
            >
              Shop All
            </button>
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(252,218,223,0.55)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "15px",
                textAlign: "left",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ff006e")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(252,218,223,0.55)")}
            >
              Sustainability
            </button>
          </div>

          {/* Col 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {["Privacy Policy", "Shipping & Returns"].map((link) => (
              <button
                key={link}
                onClick={() => router.push("/")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(252,218,223,0.55)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  textAlign: "left",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ff006e")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(252,218,223,0.55)")}
              >
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "24px 24px 32px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "rgba(252,218,223,0.4)",
          }}
        >
          © 2024 Chill Luxe. Handcrafted with obsession. Made in India.
        </div>
      </footer>
    </div>
  );
}