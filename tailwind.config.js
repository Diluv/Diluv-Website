const plugin = require("tailwindcss/plugin");

module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.ts"],
    theme: {
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
                "project-4": "0.25fr 1.25fr 0.5fr 1fr",
                "project-types": "1fr auto auto auto 1fr",
                "auto": "repeat(auto-fill, minmax(8.3%,1fr));",
                "auto-fit": "repeat(auto-fit, minmax(8.3%,1fr));",
                "pagination": "repeat(auto-fit, minmax(11%,1fr));",
                "tags": "auto auto auto auto 1fr",
                "project-info": "auto auto auto 1fr auto",
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
            },
            colors: {
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
                    default: "#DEEBFF",
                    dark: "#414a5a"
                },
                diluv: {
                    100: "#ECF6FC",
                    200: "#CFE9F8",
                    300: "#B1DBF4",
                    400: "#77C1EC",
                    default: "#3DA6E4",
                    500: "#3DA6E4",
                    600: "#3795CD",
                    700: "#256489",
                    800: "#1B4B67",
                    900: "#123244"
                },
                dark: {
                    "010": '#fefefe',
                    "020": '#fdfdfd',
                    "030": '#fcfcfc',
                    "040": '#fbfbfb',
                    "050": '#fafafa',
                    "100": '#f4f4f5',
                    "200": '#e4e4e7',
                    "300": '#d4d4d8',
                    "400": '#a1a1aa',
                    "500": '#71717a',
                    "600": '#52525b',
                    "700": '#3f3f46',
                    "800": '#27272a',
                    "850": '#202023',
                    "900": '#18181b',
                }
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
    ],
    experimental: {
        applyComplexClasses: true
    },
    future: {
        removeDeprecatedGapUtilities: true
    }
};
