/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        hellix: {
          black: "#050505",
          surface: "#101012",
          elevated: "#17171b",
          white: "#f7f7f8",
          muted: "#a1a1aa",
          pink: "#f0a6d7",
          purple: "#a78bfa",
          orange: "#fb923c",
          border: "rgba(255,255,255,0.11)"
        }
      },
      fontFamily: { sans: ["Inter", "Geist", "Arial", "sans-serif"] },
      boxShadow: {
        glow: "0 0 80px rgba(192,132,252,0.13)",
        card: "0 20px 80px rgba(0,0,0,0.35)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,.18), transparent 58%)",
        "pink-radial": "radial-gradient(ellipse at 80% 40%, rgba(236,72,153,.12), transparent 45%)"
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        pulseGlow: { "0%, 100%": { opacity: ".55" }, "50%": { opacity: "1" } }
      },
      animation: { float: "float 7s ease-in-out infinite", "pulse-glow": "pulseGlow 5s ease-in-out infinite" }
    }
  },
  plugins: []
};
