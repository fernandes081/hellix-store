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
          pink: "#ec087f",
          purple: "#8b2cff",
          orange: "#ff762f",
          border: "rgba(255,255,255,0.11)"
        }
      },
      fontFamily: { sans: ["Inter", "Geist", "Arial", "sans-serif"] },
      boxShadow: {
        glow: "0 0 80px rgba(139,44,255,0.16)",
        card: "0 20px 80px rgba(0,0,0,0.35)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse at 24% 12%, rgba(255,61,54,.16), transparent 48%), radial-gradient(ellipse at 78% 22%, rgba(255,216,74,.12), transparent 42%)",
        "pink-radial": "radial-gradient(ellipse at 55% 72%, rgba(139,44,255,.16), transparent 48%)"
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
