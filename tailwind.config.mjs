export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        medieval: ["MedievalSharp", "cursive"],
        inter: ["Inter", "sans-serif"],
        roboto: ["roboto"]
      },
      backgroundImage: {
        "page-bg": "linear-gradient(0deg, rgba(36, 38, 35, 0.92), rgba(36, 38, 35, 0.92)), linear-gradient(0deg, #191917, #191917)",
        "card-bg": "linear-gradient(60deg, #9D8C53 60%, #BAA86C 35.03%)",
      },
    },
  },
  plugins: [],
};
