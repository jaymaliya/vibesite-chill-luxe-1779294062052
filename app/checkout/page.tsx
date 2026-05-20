"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  const shippingCost = totalPrice > 500 ? 0 : 99;
  const taxes = Math.round(totalPrice * 0.05);
  const orderTotal = totalPrice + shippingCost + taxes;

  useEffect(() => {
    setPageReady(true);
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    if (id === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    if (id === "postalCode") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 6) return;
    }
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.phone.trim() || form.phone.length !== 10)
      newErrors.phone = "Valid 10-digit phone number required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state.trim()) newErrors.state = "State is required";
    if (!form.postalCode.trim() || form.postalCode.length !== 6)
      newErrors.postalCode = "Valid 6-digit PIN code required";
    return newErrors;
  }

  async function handlePlaceOrder() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderTotal * 100 }),
      });
      const order = await res.json();
      const options = {
        key: "rzp_test_",
        amount: order.amount || orderTotal * 100,
        currency: "INR",
        name: "Chill Luxe",
        description: "Order Payment",
        order_id: order.id,
        handler: function () {
          clearCart();
          router.push("/");
        },
        prefill: {
          name: form.firstName + " " + form.lastName,
          contact: form.phone,
          email: form.email,
        },
        theme: { color: "#ff006e" },
      };
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        const rzp = new (window as any).Razorpay(options);
        rzp.open();
      } else {
        clearCart();
        router.push("/");
      }
    } catch {
      clearCart();
      router.push("/");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (fieldId: string) => ({
    background: "transparent",
    border: "none",
    borderBottom: errors[fieldId]
      ? "1px solid #ff006e"
      : "1px solid rgba(255,255,255,0.2)",
    color: "white",
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0,
    width: "100%",
    padding: "8px 0",
    fontSize: "14px",
    outline: "none",
    transition: "border-bottom-color 0.2s",
  });

  const glassCard = {
    background: "rgba(26, 26, 26, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  };

  if (!pageReady) return null;

  if (items.length === 0) {
    return (
      <div
        style={{ background: "#0a0a0a", color: "#fcdadf", minHeight: "100vh" }}
        className="flex flex-col"
      >
        <header
          style={{
            background: "rgba(10,10,10,0.8)",
            backdropFilter: "blur(24px)",
          }}
          className="sticky top-0 z-50 flex justify-between items-center w-full px-6 md:px-12 py-4"
        >
          <div
            onClick={() => router.push("/")}
            style={{ color: "#ff006e", fontFamily: "serif", letterSpacing: "-0.05em", cursor: "pointer" }}
            className="text-2xl md:text-3xl font-bold uppercase hover:opacity-80 transition-[transform,opacity,box-shadow] duration-300"
          >
            Chill Luxe
          </div>
          <span
            className="material-symbols-outlined cursor-pointer hover:text-[#ff006e] transition-colors duration-300"
            style={{ color: "#fcdadf" }}
            onClick={() => router.push("/checkout")}
          >
            shopping_cart
          </span>
        </header>
        <main className="flex-grow flex flex-col items-center justify-center gap-6 px-6">
          <p style={{ color: "#fcdadf", fontSize: "20px" }} className="text-center">
            Your cart is empty. Add some indulgence first.
          </p>
          <button
            onClick={() => router.push("/shop")}
            style={{
              background: "#ff006e",
              color: "white",
              border: "none",
              borderRadius: "9999px",
              padding: "14px 36px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
            className="btn-lift"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(255,0,110,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            Start Shopping
          </button>
        </main>
      </div>
    );
  }

  return (
    <div
      style={{ background: "#0a0a0a", color: "#fcdadf", minHeight: "100vh" }}
      className="antialiased flex flex-col font-sans"
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
        .is-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .visible { opacity: 1; transform: translateY(0); }
        .form-input-field::placeholder { color: rgba(252,218,223,0.5); }
        .form-input-field:focus { border-bottom-color: #ff006e !important; }
      `}</style>

      {/* Header */}
      <header
        style={{
          background: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
        className="sticky top-0 z-50 flex justify-between items-center w-full px-6 md:px-12 py-4"
      >
        <div
          onClick={() => router.push("/")}
          style={{
            color: "#ff006e",
            fontFamily: "'Playfair Display', serif",
            letterSpacing: "-0.05em",
            cursor: "pointer",
            fontSize: "clamp(20px,3vw,28px)",
          }}
          className="font-bold uppercase hover:opacity-80 transition-[transform,opacity,box-shadow] duration-300"
        >
          Chill Luxe
        </div>
        <div className="flex items-center gap-4">
          <span
            className="material-symbols-outlined cursor-pointer transition-colors duration-300"
            style={{ color: "#fcdadf" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "#ff006e")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "#fcdadf")}
            onClick={() => router.push("/checkout")}
          >
            shopping_cart
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Page Title */}
        <div className="mb-10 reveal">
          <h1
            style={{
              color: "#fcdadf",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: "900",
              lineHeight: 1.1,
            }}
          >
            Checkout
          </h1>
          <p style={{ color: "rgba(252,218,223,0.6)", fontSize: "15px", marginTop: "8px" }}>
            Almost there. Complete your details below.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Shipping Information */}
            <section
              style={glassCard}
              className="rounded-xl p-8 reveal"
            >
              <h2
                style={{
                  color: "#fcdadf",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span className="material-symbols-outlined" style={{ color: "#ff006e" }}>
                  local_shipping
                </span>
                Shipping Information
              </h2>

              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                {/* First + Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="sr-only" htmlFor="firstName">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handleChange}
                      style={inputStyle("firstName")}
                      className="form-input-field"
                    />
                    {errors.firstName && (
                      <p style={{ color: "#ff006e", fontSize: "11px", marginTop: "4px" }}>{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="lastName">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleChange}
                      style={inputStyle("lastName")}
                      className="form-input-field"
                    />
                    {errors.lastName && (
                      <p style={{ color: "#ff006e", fontSize: "11px", marginTop: "4px" }}>{errors.lastName}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle("email")}
                    className="form-input-field"
                  />
                  {errors.email && (
                    <p style={{ color: "#ff006e", fontSize: "11px", marginTop: "4px" }}>{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="sr-only" htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    style={inputStyle("phone")}
                    className="form-input-field"
                  />
                  {errors.phone && (
                    <p style={{ color: "#ff006e", fontSize: "11px", marginTop: "4px" }}>{errors.phone}</p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="sr-only" htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    placeholder="Address Line 1"
                    value={form.address}
                    onChange={handleChange}
                    style={inputStyle("address")}
                    className="form-input-field"
                  />
                  {errors.address && (
                    <p style={{ color: "#ff006e", fontSize: "11px", marginTop: "4px" }}>{errors.address}</p>
                  )}
                </div>

                {/* Apartment */}
                <div>
                  <label className="sr-only" htmlFor="apartment">Apartment</label>
                  <input
                    id="apartment"
                    type="text"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={form.apartment}
                    onChange={handleChange}
                    style={inputStyle("apartment")}
                    className="form-input-field"
                  />
                </div>

                {/* City + State + PIN */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="sr-only" htmlFor="city">City</label>
                    <input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={handleChange}
                      style={inputStyle("city")}
                      className="form-input-field"
                    />
                    {errors.city && (
                      <p style={{ color: "#ff006e", fontSize: "11px", marginTop: "4px" }}>{errors.city}</p>
                    )}
                  </div>
                  <div className="md:col-span-1">
                    <label className="sr-only" htmlFor="state">State</label>
                    <input
                      id="state"
                      type="text"
                      placeholder="State"
                      value={form.state}
                      onChange={handleChange}
                      style={inputStyle("state")}
                      className="form-input-field"
                    />
                    {errors.state && (
                      <p style={{ color: "#ff006e", fontSize: "11px", marginTop: "4px" }}>{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="postalCode">Postal Code</label>
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="PIN Code"
                      value={form.postalCode}
                      onChange={handleChange}
                      style={inputStyle("postalCode")}
                      className="form-input-field"
                    />
                    {errors.postalCode && (
                      <p style={{ color: "#ff006e", fontSize: "11px", marginTop: "4px" }}>{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              </form>
            </section>

            {/* Payment */}
            <section
              style={glassCard}
              className="rounded-xl p-8 reveal"
            >
              <h2
                style={{
                  color: "#fcdadf",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: "700",
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span className="material-symbols-outlined" style={{ color: "#ff006e" }}>
                  credit_card
                </span>
                Payment
              </h2>
              <p style={{ color: "rgba(252,218,223,0.6)", fontSize: "14px", marginBottom: "24px" }}>
                All transactions are secure and encrypted.
              </p>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "white",
                  borderRadius: "9999px",
                  padding: "16px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1), border-color 0.2s",
                  opacity: loading ? 0.7 : 1,
                }}
                className="btn-lift"
                onMouseEnter={(e) => {
                  if (!loading) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#ff006e";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(255,0,110,0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                <span className="material-symbols-outlined">lock</span>
                {loading ? "Processing..." : "Pay securely with Razorpay"}
              </button>

              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  color: "rgba(252,218,223,0.4)",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <span style={{ fontSize: "12px", fontWeight: "700" }}>256-bit SSL Encryption</span>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN — Order Summary */}
          <div className="lg:col-span-5 relative">
            <div
              style={{
                ...glassCard,
                position: "sticky",
                top: "96px",
              }}
              className="rounded-xl p-8 flex flex-col gap-6 reveal"
            >
              <h2
                style={{
                  color: "#fcdadf",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: "700",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  paddingBottom: "16px",
                }}
              >
                Order Summary
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 group">
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        background: "rgba(30,30,30,1)",
                        flexShrink: 0,
                        position: "relative",
                      }}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                          }}
                          onMouseEnter={(e) =>
                            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
                          }
                        />
                      )}
                      <div
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          background: "#ff006e",
                          color: "white",
                          width: "22px",
                          height: "22px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "10px",
                          fontWeight: "700",
                        }}
                      >
                        {item.quantity}
                      </div>
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <h3
                        style={{
                          color: "#fcdadf",
                          fontSize: "13px",
                          fontWeight: "700",
                          marginBottom: "2px",
                        }}
                      >
                        {item.name}
                      </h3>
                      <p style={{ color: "rgba(252,218,223,0.5)", fontSize: "12px" }}>
                        {item.size ? item.size : "500ml Tub"}
                      </p>
                    </div>
                    <div
                      style={{
                        color: "#ff006e",
                        fontSize: "15px",
                        fontWeight: "700",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
                <input
                  type="text"
                  placeholder="Gift card or discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    padding: "8px 0",
                    fontSize: "14px",
                    outline: "none",
                    flex: 1,
                  }}
                  className="form-input-field"
                />
                <button
                  style={{
                    background: "rgba(26,26,26,0.8)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "#fcdadf",
                    borderRadius: "9999px",
                    padding: "8px 18px",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "background 0.2s, transform 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(26,26,26,0.8)";
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                >
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  fontSize: "14px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(252,218,223,0.6)" }}>Subtotal</span>
                  <span style={{ color: "#fcdadf" }}>
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(252,218,223,0.6)" }}>Shipping</span>
                  <span style={{ color: "#fcdadf" }}>
                    {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(252,218,223,0.6)" }}>Taxes</span>
                  <span style={{ color: "#fcdadf" }}>₹{taxes.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Total */}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  paddingTop: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "#fcdadf",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  Total
                </span>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
                  <span style={{ color: "rgba(252,218,223,0.5)", fontSize: "12px", marginBottom: "3px" }}>
                    INR
                  </span>
                  <span
                    style={{
                      color: "#ff006e",
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "28px",
                      fontWeight: "900",
                    }}
                  >
                    ₹{orderTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                style={{
                  width: "100%",
                  background: "#ff006e",
                  color: "white",
                  border: "none",
                  borderRadius: "9999px",
                  padding: "16px 24px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
                  opacity: loading ? 0.7 : 1,
                  letterSpacing: "0.03em",
                }}
                className="btn-lift"
                onMouseEnter={(e) => {
                  if (!loading) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(255,0,110,0.45)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                {loading ? "Processing..." : "Place Order / Pay Now"}
              </button>

              {/* Badges */}
              <div
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.04)",
                  paddingTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    background: "#fcdadf",
                    borderRadius: "9999px",
                    padding: "6px 14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "#0a0a0a", fontSize: "11px", fontWeight: "700", whiteSpace: "nowrap" }}>
                    MADE IN INDIA
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{
                      color: "#0a0a0a",
                      fontSize: "14px",
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    star
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          marginTop: "auto",
        }}
        className="w-full px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto"
      >
        <div className="md:col-span-1">
          <div
            onClick={() => router.push("/")}
            style={{
              color: "#ff006e",
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px,4vw,36px)",
              fontWeight: "900",
              cursor: "pointer",
            }}
          >
            Chill Luxe
          </div>
          <p style={{ color: "rgba(252,218,223,0.5)", fontSize: "13px", marginTop: "16px", lineHeight: "1.6" }}>
            © 2024 Chill Luxe. Handcrafted with obsession. Made in India.
          </p>
        </div>
        <div className="md:col-span-3 flex flex-wrap gap-x-8 gap-y-4 md:justify-end items-start pt-2">
          {[
            { label: "Our Story", href: "/" },
            { label: "The Creamery", href: "/" },
            { label: "Shop All", href: "/shop" },
            { label: "Sustainability", href: "/" },
            { label: "Privacy Policy", href: "/" },
            { label: "Shipping & Returns", href: "/" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => router.push(link.href)}
              style={{
                background: "none",
                border: "none",
                color: "rgba(252,218,223,0.5)",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#ff006e")}
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "rgba(252,218,223,0.5)")
              }
            >
              {link.label}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}