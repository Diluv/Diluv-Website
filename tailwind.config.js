const plugin = require("tailwindcss/plugin");

module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.tsx',
        './src/**/*.ts',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                "1-auto": "repeat(1, auto)",
                "2-auto": "repeat(2, auto)",
                "3-auto": "repeat(3, auto)",
                "4-auto": "repeat(4, auto)",
                "5-auto": "repeat(5, auto)",
                "6-auto": "repeat(6, auto)",
                "7-auto": "repeat(7, auto)",
                "8-auto": "repeat(8, auto)",
                "9-auto": "repeat(9, auto)",
                "10-auto": "repeat(10, auto)",
                "11-auto": "repeat(11, auto)",
                "12-auto": "repeat(12, auto)",
                "project-4": "0.25fr 1fr 0.60fr 1fr",
                "project-types": "1fr auto auto auto 1fr",
                "auto": "repeat(auto-fill, minmax(8.3%,1fr));",
                "auto-fit": "repeat(auto-fit, minmax(8.3%,1fr));",
                "pagination": "repeat(auto-fit, minmax(11%,1fr));"
            },
            gridTemplateRows: {
                "1-auto": "repeat(1, auto)",
                "2-auto": "repeat(2, auto)",
                "3-auto": "repeat(3, auto)",
                "4-auto": "repeat(4, auto)",
                "5-auto": "repeat(5, auto)",
                "6-auto": "repeat(6, auto)",
                "7-auto": "repeat(7, auto)",
                "8-auto": "repeat(8, auto)",
                "9-auto": "repeat(9, auto)",
                "10-auto": "repeat(10, auto)",
                "11-auto": "repeat(11, auto)",
                "12-auto": "repeat(12, auto)",
                "project-4": "0.25fr 1fr 0.60fr 1fr",
                "project-types": "1fr auto auto auto 1fr",
                "auto": "repeat(auto-fill, minmax(8.3%,1fr));",
                "auto-fit": "repeat(auto-fit, minmax(8.3%,1fr));",
                "pagination": "repeat(auto-fit, minmax(11%,1fr));"
            },
            opacity: {
                "95": "95%",
                "90": "90%",
                "85": "85%",
                "80": "80%"
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
                "0vh": "0vh",
                "25vh": "25vh",
                "50vh": "50vh",
                "70vh": "70vh",
                "100vh": "100vh",
                "1/4": "25%",
                "1/2": "50%",
                "3/4": "70%",
                "10": "2.5rem",
                "12": "3rem",
                "24": "6rem",
                "28": "7rem",
                "32": "8rem",
                "40": "10rem"
            },
            height: {
                "screen": "100vh",
                "28": "7rem"
            },
            width: {
                "28": "7rem"
            },
            spinner: (theme) => ({
                default: {
                    color: "#dae1e7", // color you want to make the spinner
                    size: "1em", // size of the spinner (used for both width and height)
                    border: "2px", // border-width of the spinner (shouldn't be bigger than half the spinner's size)
                    speed: "750ms" // the speed at which the spinner should rotate
                }
            }),
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
                "hsl": {
                    "100": "hsl(0,0%,90%)",
                    "200": "hsl(%0,0,80%)",
                    "300": "hsl(0,0%,70%)",
                    "400": "hsl(0,0%,60%)",
                    "500": "hsl(0,0%,50%)",
                    "600": "hsl(0,0%,40%)",
                    "700": "hsl(0,0%,30%)",
                    "800": "hsl(0,0%,20%)",
                    "900": "hsl(0,0%,10%)"
                },
                "tag": {
                    default: "#DEEBFF"
                },
                "diluv": {
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
                "dark": {
                    100: "#EAEAEA",
                    200: "#CACACA",
                    300: "#AAAAAA",
                    400: "#6B6B6B",
                    500: "#2B2B2B",
                    600: "#272727",
                    700: "#1A1A1A",
                    800: "#131313",
                    900: "#0D0D0D"
                },
                "danger": {
                    100: "#FDEEEF",
                    200: "#FAD6D8",
                    300: "#F7BDC1",
                    400: "#F28B92",
                    500: "#EC5963",
                    600: "#D45059",
                    700: "#8E353B",
                    800: "#6A282D",
                    900: "#471B1E"
                },
                "warning": {
                    100: "#FDFAEE",
                    200: "#FAF4D5",
                    300: "#F6EDBB",
                    400: "#F0DF88",
                    500: "#E9D155",
                    600: "#D2BC4D",
                    700: "#8C7D33",
                    800: "#695E26",
                    900: "#463F1A"
                },
                "success": {
                    100: "#EDFCF0",
                    200: "#D3F7DB",
                    300: "#B8F2C5",
                    400: "#82E999",
                    500: "#4DDF6D",
                    600: "#45C962",
                    700: "#2E8641",
                    800: "#236431",
                    900: "#174321"
                }, "info": {
                    100: "#EBFBFF",
                    200: "#CDF4FE",
                    300: "#AFEDFD",
                    400: "#73E0FC",
                    500: "#37D2FA",
                    600: "#32BDE1",
                    700: "#217E96",
                    800: "#195F71",
                    900: "#113F4B"
                }, "darken": {
                    100: "rgba(0,0,0,0.1)",
                    200: "rgba(0,0,0,0.2)",
                    300: "rgba(0,0,0,0.3)",
                    400: "rgba(0,0,0,0.4)",
                    500: "rgba(0,0,0,0.5)",
                    600: "rgba(0,0,0,0.6)",
                    700: "rgba(0,0,0,0.7)",
                    800: "rgba(0,0,0,0.8)",
                    900: "rgba(0,0,0,0.9)"
                }, "lighten": {
                    100: "rgba(255,255,255,0.1)",
                    200: "rgba(255,255,255,0.2)",
                    300: "rgba(255,255,255,0.3)",
                    400: "rgba(255,255,255,0.4)",
                    500: "rgba(255,255,255,0.5)",
                    600: "rgba(255,255,255,0.6)",
                    700: "rgba(255,255,255,0.7)",
                    800: "rgba(255,255,255,0.8)",
                    900: "rgba(255,255,255,0.9)"
                }
            }

        }
    },
    variants: {
        fill: ["responsive", "hover"],
        spinner: ["responsive"],
        opacity: ["responsive", "hover", "focus", "disabled"],
        cursor: ["responsive", "disabled"],
        backgroundColor: ["responsive", "hover", "focus", "disabled", "dark", "dark-hover", "dark-group-hover", "dark-even", "dark-odd"],
        textColor: ["responsive", "hover", "focus", "disabled", "dark", "dark-hover", "dark-active", "dark-placeholder"],
        transitionProperty: ["responsive", "hover", "focus"],
        borderWidth: ["responsive", "hover", "focus"],
        borderColor: ["responsive", "hover", "focus", "active", "group-hover", "dark", "dark-hover", "dark-active"]
    },
    plugins: [
        require("tailwindcss-spinner")(),
        require("tailwindcss-dark-mode")(),
        require("tailwindcss-triangle-after")({
                triangles: {
                    select: {
                        color: "#3DA6E4",
                        direction: "down",
                        size: [10, 6]
                    },
                    expand: {
                        color: "#B1DBF4",
                        direction: "down",
                        right: "0px",
                        top: "35%",
                        size: [10, 6]
                    }
                }
            }
        ),
        plugin(function ({ addBase, config }) {
            addBase({
                "h1": { fontSize: config("theme.fontSize.4xl") },
                "h2": { fontSize: config("theme.fontSize.2xl") },
                "h3": { fontSize: config("theme.fontSize.lg") },
                "h4": { fontSize: config("theme.fontSize.base") },
                "h5": { fontSize: config("theme.fontSize.sm") },
                "h6": { fontSize: config("theme.fontSize.xs") }
            });
        })
    ]
};
