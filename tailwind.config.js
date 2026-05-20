/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#ffb2bf",
        secondary: "#fff0c0",
        accent:    "#65de7c",
        surface:   "#200e12",
        muted:     "#ad878d",
        cta:       "#ff006e",
        "level-1": "#1a1a1a",
        "on-surface": "#fcdadf",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body:    ["Inter",      "sans-serif"],
      },
      borderRadius: {
        brand: "16px",
        pill:  "9999px",
      },
      boxShadow: {
        brand:    "none",
        "card":   "0 1px 3px rgba(0,0,0,0.07), 0 8px 24px rgba(0,0,0,0.04)",
        "hover":  "0 4px 12px rgba(0,0,0,0.10), 0 20px 48px rgba(0,0,0,0.08)",
        "luxury": "0 20px 48px rgba(0,0,0,0.35)",
        "glow-primary": "0 0 24px rgba(255, 178, 191, 0.35)",
        "glow-cta":     "0 0 24px rgba(255, 0, 110, 0.4)",
        "glow-accent":  "0 0 24px rgba(101, 222, 124, 0.35)",
      },
      backgroundImage: {
        "gradient-hero":    "linear-gradient(135deg, #0a0a0a 0%, #200e12 40%, #1a0810 70%, #0a0a0a 100%)",
        "gradient-primary": "linear-gradient(135deg, #ffb2bf 0%, #fff0c0 100%)",
        "gradient-cta":     "linear-gradient(135deg, #ff006e 0%, #ff4593 100%)",
        "gradient-card":    "linear-gradient(135deg, rgba(32,14,18,0.9) 0%, rgba(26,26,26,0.9) 100%)",
        "gradient-text":    "linear-gradient(135deg, #ffb2bf 0%, #fff0c0 50%, #65de7c 100%)",
      },
      animation: {
        "float":          "float 5s ease-in-out infinite",
        "float-slow":     "float 7s ease-in-out infinite",
        "float-fast":     "float 3.5s ease-in-out infinite",
        "fade-up":        "fadeUp 0.6s cubic-bezier(0.4,0,0.2,1) both",
        "scale-in":       "scaleIn 0.5s cubic-bezier(0.4,0,0.2,1) both",
        "page-fade":      "pageFade 0.45s cubic-bezier(0.4,0,0.2,1) both",
        "shimmer":        "shimmer 1.5s infinite",
        "marquee":        "marquee 28s linear infinite",
        "spin-slow":      "spinSlow 18s linear infinite",
        "pulse-glow":     "pulseGlow 1.2s ease-out",
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.4,0,0.2,1) both",
        "slide-out-right":"slideOutRight 0.3s cubic-bezier(0.4,0,0.2,1) both",
        "gradient-shift": "gradientShift 12s ease infinite",
        "drip":           "drip 2s ease-in-out infinite alternate",
        "blink":          "blink 1s step-end infinite",
      },
      keyframes: {
        pageFade: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%":   { transform: "translateY(0px)" },
          "50%":  { transform: "translateY(-12px)" },
          "100%": { transform: "translateY(0px)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
        marquee: {
          from: { transform: "translateX(0%)" },
          to:   { transform: "translateX(-50%)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%":   { boxShadow: "0 0 0 0 rgba(255,0,110,0.45)" },
          "70%":  { boxShadow: "0 0 0 14px rgba(255,0,110,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(255,0,110,0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(60px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        slideOutRight: {
          from: { opacity: "1", transform: "translateX(0)" },
          to:   { opacity: "0", transform: "translateX(60px)" },
        },
        gradientShift: {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        drip: {
          "0%":   { transform: "scaleY(0)", opacity: "1" },
          "80%":  { transform: "scaleY(1)", opacity: "1" },
          "100%": { transform: "scaleY(1)", opacity: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "88":  "22rem",
        "112": "28rem",
        "128": "32rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      zIndex: {
        "60":  "60",
        "70":  "70",
        "80":  "80",
        "90":  "90",
        "100": "100",
      },
      backdropBlur: {
        xs: "2px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};