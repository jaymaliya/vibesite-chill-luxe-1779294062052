"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA69djeqfunsrmETePsJro9EzP70XIweuQaSXakWDQ_bOuVhq_dkXRP17Ym_YaEsKWZY1XNtGRdVDQPcGjMW-_o5SnqToc47ZSjTIiC3V8VxWWcefOp6-WX9gp8IfOTducZrNjWKnPzOItaVHiKcVGojDfwjPI59etaKEEpwtr9XhT-Yb0IWIxgxkzagX_xdlmeDy834PHgLI9A1cqIQLA3QJV6yKl0J-OWE5comsEHO62um8wPPnakBZQ5_j412Uhz5A3trerjgWgh",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDhuB0A1R8mirrZF7mNPcGlbyanaQSBkShjVnbxs0XxGKU9kf01v8JFcaoi4FxmrXJo66p18Hdrh0CM_iqn7FGTsp3s8826m-dK5Ga7E55wkj4QwXqmXA094GOqP5rwVGFT7q4uJDL6thYy6g7eZUBL2IM-c5CNGE4m-Bbd4McqtPg9M4_7XOetFZ9I5uTL2AmorwIDPljTmVA2Qo7z00UnYnaPq9Yih_X6y0-EsZDIEiEY6jFn141wIre6m597r_2GX43Nx8-5XfIu",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAjEr1SiJ7JnglFRjbUVwzH840TfB37OjxN0SvAumThhWTGr3EOFYaibX9AfmgKlxjh9Z71i9PvR3aPbpjiRfJmHIySNRuC0zeb_vSwqmZx_z5Mgj4Br_dOUfMC8Sh1aTAn40_nWi0p-nt5zCEZ54AFbvgueUanuQ8HDByjjONRd73rMArTtKiYy1gfQeJe_i0psjgyL2xSRSRsukem3oMwwwIYG5kenfYKvEF6MTT6wnoN1FOTkFrPopXSGP_7ElYbTXFrFNnJDbzD",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDUZmItAGshn2W6zVLg4KsJD1pzaueBN7gUGndRhudMVPObV0dwPziXegJ5hLMlnPM2-KXqDt9XBS2ZjapnfFi4-Fdebvm0xV_rzsP-bJQgNJpJG_jaNJICGbTxw9PnhjWzLb-8WV9_oZXJLWqvvY1tkpZnDtCfLx_IUvxQIR7NqWLJ5g-UtR1KXUAASF2JNXdldlfxbHcxQIKLKQeyZZepa0AcwNGlP9Y9eFiz9HrENOErzAWt0rkJkt7ZRqK-lRSUn8J2ZSm7F6eq",
];

function ProductContent() {
  const router = useRouter();
  const { addItem } = useCart();
  const searchParams = useSearchParams();

  const paramImg = searchParams.get("img") ? decodeURIComponent(searchParams.get("img")!) : null;
  const paramName = searchParams.get("name") ? decodeURIComponent(searchParams.get("name")!) : null;
  const paramPrice = searchParams.get("price") ? Number(searchParams.get("price")) : null;

  const displayImg = paramImg ?? images[0];
  const displayName = paramName ?? "Midnight Truffle";
  const displayPrice = paramPrice ?? 850;

  const [mainImg, setMainImg] = useState(displayImg);
  const [activeThumb, setActiveThumb] = useState(0);
  const [selectedSize, setSelectedSize] = useState("pint");
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartBadge] = useState(1);

  const thumbImages = paramImg ? [paramImg] : images;

  useEffect(() => {
    setMainImg(displayImg);
    setActiveThumb(0);
  }, [displayImg]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(s);
    return () => { if (document.body.contains(s)) document.body.removeChild(s); };
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

  const handleThumbClick = (idx: number) => {
    setActiveThumb(idx);
    setMainImg(thumbImages[idx]);
  };

  const handleAddToCart = () => {
    addItem({
      id: "midnight-truffle",
      name: displayName,
      price: displayPrice,
      quantity: qty,
      size: selectedSize === "pint" ? "Pint (500ml)" : "Tub (1000ml)",
      image: displayImg,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const handleBuyNow = () => {
    addItem({
      id: "midnight-truffle",
      name: displayName,
      price: displayPrice,
      quantity: qty,
      size: selectedSize === "pint" ? "Pint (500ml)" : "Tub (1000ml)",
      image: displayImg,
    });
    router.push("/checkout");
  };

  const handleRazorpay = () => {
    fetch("/api/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: displayPrice * qty }),
    })
      .then((r) => r.json())
      .then((data) => {
        const options = {
          key: data.key,
          amount: data.amount,
          currency: "INR",
          name: "Chill Luxe",
          description: displayName,
          order_id: data.order_id,
          handler: () => { router.push("/checkout"); },
          prefill: {},
          theme: { color: "#ff006e" },
        };
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      })
      .catch(() => { router.push("/checkout"); });
  };

  return (
    <div
      style={{
        backgroundColor: "#0a0a0a",
        color: "#fcdadf",
        minHeight: "100vh",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Inline styles for reveal animation */}
      <style>{`
        .is-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .visible { opacity: 1; transform: translateY(0); }
        .btn-lift:hover { transform: scale(1.02); box-shadow: 0 8px 32px rgba(255,0,110,0.35); }
        .btn-lift:active { transform: scale(0.98); }
        .card-hover { transition: border-color 0.2s, box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), transform 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.5); border-color: rgba(255,255,255,0.2) !important; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-12px);} to { opacity:1; transform:translateY(0);} }
      `}</style>

      {/* TopAppBar */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "16px 24px",
          }}
        >
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              color: "#ff006e",
              background: "none",
              border: "none",
              cursor: "pointer",
              display: "block",
              padding: 0,
            }}
            className="md-hide-on-large"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "28px" }}
            >
              menu
            </span>
          </button>

          {/* Brand */}
          <button
            onClick={() => router.push("/")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ff006e",
              fontSize: "clamp(20px, 4vw, 28px)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              fontFamily: "inherit",
              padding: 0,
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.8")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
          >
            Chill Luxe
          </button>

          {/* Desktop nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
            className="desktop-nav"
          >
            {[
              { label: "Our Story", path: "/shop" },
              { label: "The Creamery", path: "/shop" },
              { label: "Shop All", path: "/shop", active: true },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                style={{
                  background: "none",
                  border: "none",
                  borderBottom: item.active ? "2px solid #fcdadf" : "none",
                  cursor: "pointer",
                  color: item.active ? "#fcdadf" : "rgba(252,218,223,0.7)",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  paddingBottom: item.active ? "4px" : "0",
                  fontFamily: "inherit",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#ff006e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = item.active
                    ? "#fcdadf"
                    : "rgba(252,218,223,0.7)")
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Cart icon */}
          <button
            onClick={() => router.push("/checkout")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ff006e",
              position: "relative",
              padding: 0,
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.8")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "28px" }}
            >
              shopping_cart
            </span>
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                width: "12px",
                height: "12px",
                backgroundColor: "#ffd60a",
                borderRadius: "50%",
                border: "2px solid #0a0a0a",
              }}
            />
          </button>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              backgroundColor: "#0a0a0a",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              animation: "fadeInDown 0.2s ease",
            }}
          >
            {[
              { label: "Our Story", path: "/shop" },
              { label: "The Creamery", path: "/shop" },
              { label: "Shop All", path: "/shop" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => { router.push(item.path); setMobileMenuOpen(false); }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(252,218,223,0.8)",
                  fontSize: "14px",
                  fontWeight: 700,
                  textAlign: "left",
                  fontFamily: "inherit",
                  letterSpacing: "0.04em",
                  padding: 0,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main */}
      <main style={{ paddingTop: "96px", paddingBottom: "80px" }}>
        {/* Product Section */}
        <section
          className="reveal"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "48px 24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "40px",
            }}
            className="product-grid"
          >
            {/* Gallery Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Main image */}
              <div
                style={{
                  aspectRatio: "4/5",
                  backgroundColor: "#1a1a1a",
                  borderRadius: "2rem",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                className="main-img-wrap"
              >
                <img
                  src={mainImg}
                  alt="Product Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1)")
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    backgroundColor: "#ffd60a",
                    color: "#000",
                    padding: "8px 16px",
                    borderRadius: "9999px",
                    fontWeight: 700,
                    fontSize: "12px",
                    letterSpacing: "0.04em",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>Made in India</span>
                </div>
              </div>

              {/* Thumbnails — only show when multiple Stitch images available (not paramImg) */}
              {!paramImg && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                  }}
                >
                  {thumbImages.slice(0, 3).map((src, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleThumbClick(idx)}
                      style={{
                        aspectRatio: "1",
                        backgroundColor: "#1a1a1a",
                        borderRadius: "12px",
                        overflow: "hidden",
                        cursor: "pointer",
                        border:
                          activeThumb === idx
                            ? "2px solid #ff006e"
                            : "1px solid rgba(255,255,255,0.1)",
                        transition: "border-color 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (activeThumb !== idx)
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        if (activeThumb !== idx)
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.1)";
                      }}
                    >
                      <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: activeThumb === idx ? 1 : 0.6,
                          transition: "opacity 0.2s",
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info Panel */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "32px 0",
              }}
            >
              {/* Collection label */}
              <div style={{ marginBottom: "8px" }}>
                <span
                  style={{
                    color: "#ff006e",
                    fontWeight: 700,
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                  }}
                >
                  Signature Collection
                </span>
              </div>

              {/* Product name */}
              <h1
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)",
                  fontWeight: 900,
                  color: "#fcdadf",
                  marginBottom: "16px",
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  margin: "0 0 16px 0",
                }}
              >
                {displayName}
              </h1>

              {/* Price */}
              <div style={{ marginBottom: "32px" }}>
                <span
                  style={{
                    color: "#ffd60a",
                    fontSize: "clamp(32px, 4vw, 48px)",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                  }}
                >
                  ₹{displayPrice}
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  color: "rgba(252,218,223,0.6)",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "40px",
                  maxWidth: "520px",
                }}
              >
                An unapologetically decadent experience. We blend single-origin
                Ecuadorian dark chocolate with organic local cream to create a
                dangerously rich, velvet-smooth texture. Perfect for late-night
                indulgence.
              </p>

              {/* Selectors */}
              <div style={{ marginBottom: "40px", display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Size */}
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "11px",
                      color: "#fcdadf",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: "12px",
                    }}
                  >
                    Size
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      overflowX: "auto",
                      paddingBottom: "8px",
                    }}
                    className="scrollbar-hide"
                  >
                    <button
                      onClick={() => setSelectedSize("pint")}
                      style={{
                        padding: "12px 24px",
                        borderRadius: "9999px",
                        backgroundColor:
                          selectedSize === "pint" ? "#ff006e" : "#1a1a1a",
                        border:
                          selectedSize === "pint"
                            ? "none"
                            : "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "13px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                    >
                      Pint (500ml)
                    </button>
                    <button
                      onClick={() => setSelectedSize("tub")}
                      style={{
                        padding: "12px 24px",
                        borderRadius: "9999px",
                        backgroundColor:
                          selectedSize === "tub" ? "#ff006e" : "#1a1a1a",
                        border:
                          selectedSize === "tub"
                            ? "none"
                            : "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "13px",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSize !== "tub")
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.3)";
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize !== "tub")
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.1)";
                      }}
                    >
                      Tub (1000ml)
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "11px",
                      color: "#fcdadf",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      marginBottom: "12px",
                    }}
                  >
                    Quantity
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      backgroundColor: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "9999px",
                      width: "fit-content",
                      padding: "8px 16px",
                    }}
                  >
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(252,218,223,0.5)",
                        padding: "4px",
                        fontFamily: "inherit",
                        transition: "color 0.2s",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#fcdadf")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(252,218,223,0.5)")
                      }
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                      >
                        remove
                      </span>
                    </button>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#fcdadf",
                        width: "32px",
                        textAlign: "center",
                      }}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "rgba(252,218,223,0.5)",
                        padding: "4px",
                        fontFamily: "inherit",
                        transition: "color 0.2s",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color = "#fcdadf")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(252,218,223,0.5)")
                      }
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ fontSize: "20px" }}
                      >
                        add
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                className="cta-btns"
              >
                <button
                  onClick={handleAddToCart}
                  className="btn-lift"
                  style={{
                    flex: 1,
                    backgroundColor: addedToCart ? "#1a1a1a" : "#ff006e",
                    color: "#fff",
                    padding: "16px 32px",
                    borderRadius: "9999px",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {addedToCart ? "Added to Cart ✓" : "Add to Cart"}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="btn-lift"
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    color: "#fff",
                    padding: "16px 32px",
                    borderRadius: "9999px",
                    border: "2px solid #fff",
                    fontWeight: 700,
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
                    (e.currentTarget as HTMLElement).style.color = "#000";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                >
                  Buy Now
                </button>
              </div>

              {/* Delivery info */}
              <div
                style={{
                  marginTop: "32px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "rgba(252,218,223,0.5)",
                  fontSize: "14px",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  local_shipping
                </span>
                <span>Delivered cold in 45 minutes</span>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section
          className="reveal"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "64px 24px 48px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Section header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 800,
                color: "#fcdadf",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              The Obsession
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "#ffd60a",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px", fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              <span style={{ fontWeight: 700, fontSize: "13px", color: "#ffd60a" }}>
                4.9 / 5
              </span>
            </div>
          </div>

          {/* Reviews grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "24px",
            }}
            className="reviews-grid"
          >
            {[
              {
                stars: 5,
                text: '"Absolutely incredible. The texture is so rich and smooth. It feels like a high-end dessert you\'d get at a Michelin star restaurant, but in my living room."',
                initial: "S",
                name: "Sarah K.",
              },
              {
                stars: 5,
                text: '"The deep chocolate flavor is intense in the best way possible. This isn\'t just ice cream, it\'s an experience. Will absolutely be ordering again."',
                initial: "M",
                name: "Marcus T.",
              },
              {
                stars: 4,
                text: '"Worth every penny. The minimalist packaging is stunning, and the product inside actually lives up to the presentation. Highly recommend."',
                initial: "A",
                name: "Aisha R.",
              },
            ].map((review, idx) => (
              <div
                key={idx}
                className="card-hover"
                style={{
                  backgroundColor: "#1a1a1a",
                  padding: "32px",
                  borderRadius: "2rem",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "default",
                }}
              >
                {/* Stars */}
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    marginBottom: "16px",
                    color: "#ffd60a",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span
                      key={s}
                      className="material-symbols-outlined"
                      style={{
                        fontSize: "16px",
                        fontVariationSettings:
                          s <= review.stars ? "'FILL' 1" : "'FILL' 0",
                        color: s <= review.stars ? "#ffd60a" : "rgba(255,214,10,0.3)",
                      }}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Review text */}
                <p
                  style={{
                    color: "rgba(252,218,223,0.6)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    marginBottom: "24px",
                  }}
                >
                  {review.text}
                </p>

                {/* Reviewer */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: "#2a2a2a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#ff006e",
                    }}
                  >
                    {review.initial}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: "13px", color: "#fcdadf" }}>
                    {review.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#050505",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "40px",
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "64px 24px",
          }}
          className="footer-grid"
        >
          {/* Brand col */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span
              style={{
                color: "#ff006e",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
              }}
            >
              Chill Luxe
            </span>
            <p
              style={{
                color: "rgba(252,218,223,0.5)",
                fontSize: "14px",
                lineHeight: 1.6,
                marginTop: "16px",
              }}
            >
              © 2024 Chill Luxe. Handcrafted with obsession. Made in India.
            </p>
          </div>

          {/* Explore */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <h4
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#fcdadf",
                marginBottom: "8px",
                margin: "0 0 8px 0",
              }}
            >
              Explore
            </h4>
            {[
              { label: "Our Story", path: "/shop" },
              { label: "The Creamery", path: "/shop" },
              { label: "Shop All", path: "/shop" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => router.push(link.path)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(252,218,223,0.5)",
                  fontWeight: 700,
                  fontSize: "13px",
                  textAlign: "left",
                  fontFamily: "inherit",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#ff006e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(252,218,223,0.5)")
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Support */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <h4
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#fcdadf",
                marginBottom: "8px",
                margin: "0 0 8px 0",
              }}
            >
              Support
            </h4>
            {[
              { label: "Sustainability", path: "/shop" },
              { label: "Privacy Policy", path: "/shop" },
              { label: "Shipping & Returns", path: "/shop" },
            ].map((link) => (
              <button
                key={link.label}
                onClick={() => router.push(link.path)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(252,218,223,0.5)",
                  fontWeight: 700,
                  fontSize: "13px",
                  textAlign: "left",
                  fontFamily: "inherit",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#ff006e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(252,218,223,0.5)")
                }
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <h4
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#fcdadf",
                marginBottom: "8px",
                margin: "0 0 8px 0",
              }}
            >
              Social
            </h4>
            <div style={{ display: "flex", gap: "16px" }}>
              <button
                onClick={() => router.push("/shop")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(252,218,223,0.5)",
                  padding: 0,
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#ff006e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(252,218,223,0.5)")
                }
              >
                <span className="material-symbols-outlined">photo_camera</span>
              </button>
              <button
                onClick={() => router.push("/shop")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(252,218,223,0.5)",
                  padding: 0,
                  transition: "color 0.2s",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#ff006e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color =
                    "rgba(252,218,223,0.5)")
                }
              >
                <span className="material-symbols-outlined">play_circle</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky mobile bottom bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          backgroundColor: "rgba(10,10,10,0.95)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
        }}
        className="mobile-sticky-bar"
      >
        <div>
          <div style={{ fontSize: "11px", color: "rgba(252,218,223,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {displayName}
          </div>
          <div style={{ fontSize: "20px", fontWeight: 900, color: "#ffd60a" }}>
            ₹{displayPrice}
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="btn-lift"
          style={{
            backgroundColor: addedToCart ? "#1a1a1a" : "#ff006e",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "9999px",
            border: "none",
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {addedToCart ? "Added ✓" : "Add to Cart"}
        </button>
      </div>

      {/* Responsive overrides */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-sticky-bar { display: none !important; }
          .md-hide-on-large { display: none !important; }
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 64px !important; }
          .main-img-wrap { aspect-ratio: 1 !important; }
          .reviews-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .footer-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .cta-btns { flex-direction: row !important; }
          .desktop-nav { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            background: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fcdadf",
          }}
        />
      }
    >
      <ProductContent />
    </Suspense>
  );
}