const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    purge: {
        layers: ["utilities"],
        content: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.ts"]
    },
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: "#000000",
            white: "#FFFFFF",
            gray: colors.trueGray,
            blueGray: colors.blueGray,
            red: {
                100: "#FFF5F5",
                200: "#FED7D7",
                300: "#FEB2B2",
                400: "#FC8181",
                500: "#F56565",
                600: "#E53E3E",
                700: "#C53030",
                800: "#9B2C2C",
                900: "#742A2A"
            },
            orange: {
                100: "#FFFAF0",
                200: "#FEEBC8",
                300: "#FBD38D",
                400: "#F6AD55",
                500: "#ED8936",
                600: "#DD6B20",
                700: "#C05621",
                800: "#9C4221",
                900: "#7B341E"
            },
            yellow: {
                100: "#FFFFF0",
                200: "#FEFCBF",
                300: "#FAF089",
                400: "#F6E05E",
                500: "#ECC94B",
                600: "#D69E2E",
                700: "#B7791F",
                800: "#975A16",
                900: "#744210"
            },
            green: {
                100: "#F0FFF4",
                200: "#C6F6D5",
                300: "#9AE6B4",
                400: "#68D391",
                500: "#48BB78",
                600: "#38A169",
                700: "#2F855A",
                800: "#276749",
                900: "#22543D"
            },
            teal: {
                100: "#E6FFFA",
                200: "#B2F5EA",
                300: "#81E6D9",
                400: "#4FD1C5",
                500: "#38B2AC",
                600: "#319795",
                700: "#2C7A7B",
                800: "#285E61",
                900: "#234E52"
            },
            blue: {
                100: "#EBF8FF",
                200: "#BEE3F8",
                300: "#90CDF4",
                400: "#63B3ED",
                500: "#4299E1",
                600: "#3182CE",
                700: "#2B6CB0",
                800: "#2C5282",
                900: "#2A4365"
            },
            indigo: {
                100: "#EBF4FF",
                200: "#C3DAFE",
                300: "#A3BFFA",
                400: "#7F9CF5",
                500: "#667EEA",
                600: "#5A67D8",
                700: "#4C51BF",
                800: "#434190",
                900: "#3C366B"
            },
            purple: {
                100: "#FAF5FF",
                200: "#E9D8FD",
                300: "#D6BCFA",
                400: "#B794F4",
                500: "#9F7AEA",
                600: "#805AD5",
                700: "#6B46C1",
                800: "#553C9A",
                900: "#44337A"
            },
            pink: {
                100: "#FFF5F7",
                200: "#FED7E2",
                300: "#FBB6CE",
                400: "#F687B3",
                500: "#ED64A6",
                600: "#D53F8C",
                700: "#B83280",
                800: "#97266D",
                900: "#702459"
            },
            hsl: {
                100: "hsl(0,0%,90%)",
                200: "hsl(0,0%,80%)",
                300: "hsl(0,0%,70%)",
                400: "hsl(0,0%,60%)",
                500: "hsl(0,0%,50%)",
                600: "hsl(0,0%,40%)",
                700: "hsl(0,0%,30%)",
                800: "hsl(0,0%,20%)",
                900: "hsl(0,0%,10%)"
            },
            tag: {
                DEFAULT: "#DEEBFF",
                dark: "#414a5a"
            },
            diluv: {
                100: "#ECF6FC",
                200: "#CFE9F8",
                300: "#B1DBF4",
                400: "#77C1EC",
                DEFAULT: "#3DA6E4",
                500: "#3DA6E4",
                600: "#3795CD",
                700: "#256489",
                800: "#1B4B67",
                900: "#123244"
            },
            dark: {
                ...colors.trueGray,
                850: "#1F1F1F"
            },
            amber: colors.amber
        },
        extend: {
            textIndent: (theme, { negative }) => ({
                ...{
                    sm: "2rem",
                    md: "3rem",
                    lg: "4rem"
                },
                ...negative({
                    sm: "2rem",
                    md: "3rem",
                    lg: "4rem"
                })
            }),
            spacing: {
                0.125: "2px"
            },
            gridTemplateColumns: {
                "file": "0.75fr 1fr 1.5fr 1fr 1.25fr",
                "project-4": "0.25fr 1.25fr 0.5fr 1fr",
                "project-types": "1fr auto auto auto 1fr",
                "auto": "repeat(auto-fill, minmax(8.3%,1fr));",
                "auto-fit": "repeat(auto-fit, minmax(8.3%,1fr));",
                "pagination": "repeat(auto-fit, minmax(11%,1fr));",
                "tags": "auto auto auto auto 1fr",
                "project-info": "auto auto auto 1fr auto auto",
                "project-type-nav": "2.5fr 0.5fr"
            },
            gridTemplateRows: {
                "project-4": "0.25fr 1fr 0.60fr 1fr",
                "project-types": "1fr auto auto auto 1fr",
                "auto": "repeat(auto-fill, minmax(8.3%,1fr));",
                "auto-fit": "repeat(auto-fit, minmax(8.3%,1fr));",
                "pagination": "repeat(auto-fit, minmax(11%,1fr));"
            },
            opacity: {
                95: "0.95",
                90: "0.90",
                85: "0.85",
                80: "0.80"
            },
            minWidth: {
                "0": "0",
                "1/4": "25%",
                "1/2": "50%",
                "3/4": "75%",
                "full": "100%",
                "32": "3.2rem",
                "24": "2.4rem",
                "20": "2rem"
            },
            minHeight: {
                "100vh": "100vh",
                "10": "2.5rem",
                "12": "3rem",
                "24": "6rem",
                "28": "7rem",
                "32": "8rem",
                "40": "10rem"
            },
            height: {
                screen: "100vh",
                28: "7rem",
                80: "20rem",
                112: "28rem"
            },
            width: {
                28: "7rem"
            },
            boxShadow: {
                "light": "0 1px 3px 0 rgba(255, 255, 255, .1), 0 1px 2px 0 rgba(255, 255, 255, .06)",
                "light-md": " 0 4px 6px -1px rgba(255, 255, 255, .1), 0 2px 4px -1px rgba(255, 255, 255, .06)",
                "light-lg": " 0 10px 15px -3px rgba(255, 255, 255, .1), 0 4px 6px -2px rgba(255, 255, 255, .05)",
                "light-xl": " 0 20px 25px -5px rgba(255, 255, 255, .1), 0 10px 10px -5px rgba(255, 255, 255, .04)",
                "light-2xl": "0 25px 50px -12px rgba(255, 255, 255, .25)",
                "light-3xl": "0 35px 60px -15px rgba(255, 255, 255, .3)",
                "light-inner": "inset 0 2px 4px 0 rgba(255, 255, 255,0.06)",
                "valid-light": "0 0 0 3px rgba(72,187,120,0.5)",
                "invalid-light": "0 0 0 3px rgba(245,101,101,0.5)",
                "valid-dark": "0 0 0 3px rgba(72,187,120,0.8)",
                "invalid-dark": "0 0 0 3px rgba(245,101,101,0.8)"
            }
        }
    },
    variants: {
        fill: ["responsive", "hover"],
        opacity: ["responsive", "hover", "focus", "disabled"],
        cursor: ["responsive", "disabled"],
        backgroundColor: [
            "responsive",
            "hover",
            "focus",
            "disabled",
            "odd",
            "even",
            "dark",
            "dark-focus",
            "dark-hover",
            "dark-group-hover",
            "dark-even",
            "dark-odd"
        ],
        textColor: ["responsive", "hover", "focus", "disabled", "dark", "dark-hover", "dark-active", "dark-focus", "dark-placeholder"],
        transitionProperty: ["responsive", "hover", "focus"],
        borderWidth: ["responsive", "hover", "focus"],
        borderColor: ["responsive", "hover", "focus", "active", "group-hover", "dark", "dark-hover", "dark-active", "dark-focus"],
        textIndent: ["responsive"]
    },
    plugins: [
        require("tailwindcss-dark-mode")(),
        require("tailwindcss-text-indent")(),
        plugin(function ({ addBase, config }) {
            addBase({
                h1: { fontSize: config("theme.fontSize.4xl") },
                h2: { fontSize: config("theme.fontSize.2xl") },
                h3: { fontSize: config("theme.fontSize.lg") },
                h4: { fontSize: config("theme.fontSize.base") },
                h5: { fontSize: config("theme.fontSize.sm") },
                h6: { fontSize: config("theme.fontSize.xs") }
            });
        })
    ]
};
