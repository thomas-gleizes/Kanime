const defaultTheme = require("tailwindcss/defaultTheme");

const buildList = (length, indicator, multi = 10) => {
  const json = Array(length)
    .fill(0)
    .reduce((prev, current, index) => {
      let str = prev;
      index++;

      if (index === 1) str = "{";
      str += `\"${index * multi}\": \"${index * multi}${indicator}\"`;

      if (index === length) return str + "}";
      else return str + ",";
    }, "");

  return JSON.parse(json);
};

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    colors: {
      ...defaultTheme.colors,
      success: "#1abc9c",
      danger: "#e74c3c",
      warning: "#fcbf00",
      kitsu: "#402F3F",
    },
    screens: {
      ...defaultTheme.screens,
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    transitionDuration: {
      ...defaultTheme.transitionDuration,
      1100: "1100ms",
      1200: "1200ms",
      1300: "1300ms",
      1400: "1400ms",
      1500: "1500ms",
      2000: "2000ms",
    },
    zIndex: {
      "-100": "-100",
      "-50": "-50",
      "-40": "-40",
      "-30": "-30",
      "-20": "-20",
      "-10": "-10",
      0: 0,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      60: 60,
      70: 70,
      80: 80,
      90: 90,
      100: 100,
      auto: "auto",
    },
    maxWidth: {
      ...buildList(40, "px", 50),
      full: "100%",
      unset: "unset",
    },
    maxHeight: {
      ...buildList(40, "px", 50),
      full: "100%",
      unset: "unset",
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked", "disabled", "group-focus"],
      backgroundOpacity: ["group-focus"],
      borderWidth: ["group-focus"],
      opacity: ["group-focus"],
      borderColor: ["checked", "disabled"],
      boxShadow: ["active"],
      rotate: ["group-focus"],
      inset: ["hover", "focus", "group-focus"],
    },
  },
  plugins: [],
};
