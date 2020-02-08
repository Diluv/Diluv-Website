module.exports = {
    theme: {
        minHeight: {
            '0vh': '0vh',
            '25vh': '25vh',
            '50vh': '50vh',
            '70vh': '70vh',
            '100vh': '100vh',
        },
        extend: {
            spinner: (theme) => ({
                default: {
                    color: '#dae1e7', // color you want to make the spinner
                    size: '1em', // size of the spinner (used for both width and height)
                    border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
                    speed: '750ms', // the speed at which the spinner should rotate
                },
            }),
            colors: {
                'diluv': {
                    100: '#ECF6FC',
                    200: '#CFE9F8',
                    300: '#B1DBF4',
                    400: '#77C1EC',
                    500: '#3DA6E4',
                    600: '#3795CD',
                    700: '#256489',
                    800: '#1B4B67',
                    900: '#123244',
                },
                'dark': {
                    100: '#EAEAEA',
                    200: '#CACACA',
                    300: '#AAAAAA',
                    400: '#6B6B6B',
                    500: '#2B2B2B',
                    600: '#272727',
                    700: '#1A1A1A',
                    800: '#131313',
                    900: '#0D0D0D',
                },
            },

        }
    },
    variants: {
        fill: ['responsive', 'hover'],
        spinner: ['responsive'],

    },
    plugins: [
        require('tailwindcss-elevation')(['responsive']),
        require('tailwindcss-spinner')()
    ]
}
