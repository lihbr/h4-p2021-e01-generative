const Color = require("color");

/**
 * Start generic project config
 */
const col = 100;
const baseDuration = 750;
const gutter = 40;

const colors = {
  black: "#27251f",
  white: "#fefefe",
  lightGrey: "#f8f8f8",
  grey: "#757575",
  green: "#205430",
  yellow: "#ffc72c",
  red: "#da291c"
};
const colorOpacityVariants = [5, 20];
const colorLightenVariants = [20];

/**
 * End generic project config
 */

module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px"
    },
    fontFamily: {
      main: [
        "Helvetica Neue",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"
      ],
      sub: [
        "Museo Slab",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Helvetica",
        "Arial",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol"
      ],
      mono: [
        "SFMono-Regular",
        "Menlo",
        "Consolas",
        "Liberation Mono",
        "Courier",
        "monospace"
      ]
    },
    colors: () => {
      const finalColors = {
        none: "transparent",
        inherit: "inherit"
      };

      for (const color in colors) {
        const value = colors[color];

        const colorObject = {
          default: value
        };

        for (const opacity of colorOpacityVariants) {
          colorObject[`o-${opacity}`] = Color(value)
            .alpha(opacity / 100)
            .rgb()
            .toString();
        }
        for (const lighten of colorLightenVariants) {
          colorObject[`l-${lighten}`] = Color(value)
            .lighten(lighten / 100)
            .rgb()
            .toString();
        }

        finalColors[color] = colorObject;
      }

      return finalColors;
    },
    fontSize: {
      "3xs": "0.5rem", //   8px
      "2xs": "0.625rem", // 10px
      xs: "0.75rem", //     12px
      s: "0.875rem", //     14px
      m: "1rem", //         16px
      l: "1.125rem", //     18px
      xl: "1.25rem", //     20px
      xlAlt: "1.375rem", // 22px
      "2xl": "1.5rem", //   24px
      "3xl": "1.75rem", //  28px
      "4xl": "2rem", //     32px
      "5xl": "2.25rem", //  36px
      "6xl": "2.75rem", //  44px
      "7xl": "3.25rem", //  52px
      "8xl": "4rem", //     64px
      "9xl": "4.5rem", //   72px
      "10xl": "5rem" //     80px
    },
    opacity: {
      inherit: "inherit",
      "0": "0",
      "10": "0.1",
      "20": "0.2",
      "30": "0.3",
      "40": "0.4",
      "50": "0.5",
      "60": "0.6",
      "70": "0.7",
      "80": "0.8",
      "90": "0.9",
      "100": "0.99" // prevent extra paint
    },
    zIndex: () => {
      const zIndex = {
        auto: "auto",
        "0": 0
      };

      // Generate negative and positive classes for each
      [1000, 100, 50, 20, 10, 5, 4, 3, 2, 1].forEach(i => {
        zIndex[`${i}`] = i;
        zIndex[`-${i}`] = i * -1;
      });

      return zIndex;
    },
    // Access from transition-
    transitionProperty: {
      default: "all",
      color: "color",
      bg: "background",
      "width-height": ["width", "height"],
      opacity: "opacity",
      transform: "transform",
      "opacity-transform": ["opacity", "transform"]
    },
    // Access from transition-
    transitionDuration: {
      default: `${baseDuration}ms`,
      "1/8": `${Math.floor(baseDuration / 8)}ms`,
      "1/4": `${Math.floor(baseDuration / 4)}ms`,
      "1/2": `${Math.floor(baseDuration / 2)}ms`,
      "3/4": `${Math.floor((baseDuration / 4) * 3)}ms`,
      double: `${baseDuration * 2}ms`
    },
    // Access from transition-delay-
    transitionDelay: theme => ({
      base: theme("transitionDuration.default"),
      ...theme("transitionDuration"),
      none: "0ms",
      default: "0ms"
    }),
    // Access from transition-
    transitionTimingFunction: {
      default: "cubic-bezier(.54,.1,0,.99)",
      // Functions from https://easings.net
      "ease-in-sine": "cubic-bezier(0.47, 0, 0.745, 0.715)",
      "ease-in-quad": "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
      "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      "ease-in-quart": "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
      "ease-in-quint": "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
      "ease-in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
      "ease-in-circ": "cubic-bezier(0.6, 0.04, 0.98, 0.335)",
      "ease-in-back": "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
      "ease-out-sine": "cubic-bezier(0.39, 0.575, 0.565, 1)",
      "ease-out-quad": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
      "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
      "ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
      "ease-out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      "ease-out-circ": "cubic-bezier(0.075, 0.82, 0.165, 1)",
      "ease-out-back": "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      "ease-in-out-sine": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
      "ease-in-out-quad": "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
      "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1)",
      "ease-in-out-quart": "cubic-bezier(0.77, 0, 0.175, 1)",
      "ease-in-out-quint": "cubic-bezier(0.86, 0, 0.07, 1)",
      "ease-in-out-expo": "cubic-bezier(1, 0, 0, 1)",
      "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
      "ease-in-out-back": "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    },
    extend: {
      spacing: () => {
        const spacing = {
          none: "none",
          inherit: "inherit",
          "5/2": "10px", // 10px
          "-5/2": "-10px", // -10px
          "gut-1/2": `${gutter * 0.5}px`, // 20px
          "-gut-1/2": `${gutter * -0.5}px`, // -20px
          gut: `${gutter}px`, // 40px
          "-gut": `${gutter * -1}px`, // -40px
          "gut-3/2": `${gutter * 1.5}px`, // 60px
          "-gut-3/2": `${gutter * -1.5}px`, // -60px
          semicol: `${col * 0.5}px`, // 50px
          "-semicol": `${col * -0.5}px`, // -50px
          "col-3/4": `${col * 0.75}px`, // 75px
          "-col-3/4": `${col * -0.75}px`, // -75px
          col: `${col}px`, // 100px
          "col-1": `${col}px`, // 100px
          "col-2": `${col * 2}px`, // 200px
          "col-3": `${col * 3}px`, // 300px
          "col-4": `${col * 4}px`, // 400px
          "col-5": `${col * 5}px`, // 500px
          "col-6": `${col * 6}px`, // 600px
          "col-7": `${col * 7}px`, // 700px
          "col-8": `${col * 8}px`, // 800px
          "col-9": `${col * 9}px`, // 900px
          "col-10": `${col * 10}px`, // 1000px
          "col-11": `${col * 11}px`, // 1100px
          "col-12": `${col * 12}px` // 1200px
        };

        for (let i = 1; i <= 12; i++) {
          spacing[`-col-${i}`] = `${col * -i}px`;
        }

        for (let i = 1; i <= 20; i++) {
          spacing[`${i * 5}vw`] = `${i * 5}vw`;
          spacing[`${i * 5}vh`] = `${i * 5}vh`;
          spacing[`${i * 5}p`] = `${i * 5}%`;
        }

        return spacing;
      },
      inset: theme => theme("spacing"),
      minWidth: theme => ({ ...theme("spacing"), screen: "100vw" }),
      maxWidth: theme => ({ ...theme("spacing"), screen: "100vw" }),
      height: theme => ({ ...theme("width"), screen: "100vh" }),
      minHeight: theme => ({ ...theme("maxWidth"), screen: "100vh" }),
      maxHeight: theme => ({ ...theme("maxWidth"), screen: "100vh" }),
      lineHeight: {
        "0": 0
      }
    }
  },
  variants: {},
  corePlugins: {
    objectFit: false,
    objectPosition: false
  },
  plugins: [
    require("tailwindcss-transitions")(),
    ({ addBase, addUtilities, theme }) => {
      addBase({
        strong: { fontWeight: theme("fontWeight.bold") }
      });

      const objectFitUtilities = {
        ".object-cover": {
          objectFit: "cover",
          fontFamily: '"object-fit: cover"' // eslint-disable-line
        },
        ".object-contain": {
          objectFit: "contain",
          fontFamily: '"object-fit: contain"' // eslint-disable-line
        }
      };
      addUtilities(objectFitUtilities, {
        variants: ["responsive"]
      });

      const flexUtilities = {
        ".flex-center": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      };
      addUtilities(flexUtilities, {
        variants: ["responsive"]
      });

      const transformUtilities = {
        ".transform-center": {
          transform: "translate(-50%, -50%)"
        },
        ".transform-center-x": {
          transform: "translate(-50%, 0)"
        },
        ".transform-center-y": {
          transform: "translate(0, -50%)"
        }
      };
      addUtilities(transformUtilities, {
        variants: ["responsive"]
      });
    }
  ]
};
