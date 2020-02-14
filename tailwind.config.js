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
            boxShadow: {
                light: '0 1px 3px 0 rgba(255, 255, 255, .1), 0 1px 2px 0 rgba(255, 255, 255, .06)',
                "light-md": ' 0 4px 6px -1px rgba(255, 255, 255, .1), 0 2px 4px -1px rgba(255, 255, 255, .06)',
                "light-lg": ' 0 10px 15px -3px rgba(255, 255, 255, .1), 0 4px 6px -2px rgba(255, 255, 255, .05)',
                "light-xl": ' 0 20px 25px -5px rgba(255, 255, 255, .1), 0 10px 10px -5px rgba(255, 255, 255, .04)',
                "light-2xl": '0 25px 50px -12px rgba(255, 255, 255, .25)',
                "light-3xl": '0 35px 60px -15px rgba(255, 255, 255, .3)',
                "light-inner": 'inset 0 2px 4px 0 rgba(255, 255, 255,0.06)'
            },
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
                'danger': {
                    100: '#FDEEEF',
                    200: '#FAD6D8',
                    300: '#F7BDC1',
                    400: '#F28B92',
                    500: '#EC5963',
                    600: '#D45059',
                    700: '#8E353B',
                    800: '#6A282D',
                    900: '#471B1E',
                },
                'warning': {
                    100: '#FDFAEE',
                    200: '#FAF4D5',
                    300: '#F6EDBB',
                    400: '#F0DF88',
                    500: '#E9D155',
                    600: '#D2BC4D',
                    700: '#8C7D33',
                    800: '#695E26',
                    900: '#463F1A',
                },
                'success': {
                    100: '#EDFCF0',
                    200: '#D3F7DB',
                    300: '#B8F2C5',
                    400: '#82E999',
                    500: '#4DDF6D',
                    600: '#45C962',
                    700: '#2E8641',
                    800: '#236431',
                    900: '#174321',
                }, 'info': {
                    100: '#EBFBFF',
                    200: '#CDF4FE',
                    300: '#AFEDFD',
                    400: '#73E0FC',
                    500: '#37D2FA',
                    600: '#32BDE1',
                    700: '#217E96',
                    800: '#195F71',
                    900: '#113F4B',
                }, 'darken': {
                    100: 'rgba(0,0,0,0.1)',
                    200: 'rgba(0,0,0,0.2)',
                    300: 'rgba(0,0,0,0.3)',
                    400: 'rgba(0,0,0,0.4)',
                    500: 'rgba(0,0,0,0.5)',
                    600: 'rgba(0,0,0,0.6)',
                    700: 'rgba(0,0,0,0.7)',
                    800: 'rgba(0,0,0,0.8)',
                    900: 'rgba(0,0,0,0.9)',
                },
            },

        }
    },
    variants: {
        fill: ['responsive', 'hover'],
        spinner: ['responsive'],
        opacity: ['responsive', 'hover', 'focus', 'disabled'],
        cursor: ['responsive', 'disabled'],
        backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
        textColor: ['responsive', 'hover', 'focus', 'disabled'],
    },
    plugins: [
        require('tailwindcss-elevation')(['responsive']),
        require('tailwindcss-spinner')()
    ]
}
