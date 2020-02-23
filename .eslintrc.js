module.exports = {
    extends: ['airbnb-typescript'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'max-len': ["error", {"code": 150}],
        'react/jsx-tag-spacing': 0,
        'react/no-unescaped-entities': 0,
        "react/jsx-props-no-spreading": 0,
        "react/no-danger": 0,
        "no-bitwise": 0,
        "jsx-a11y/anchor-is-valid": [ "error", {
            "components": [ "Link" ],
            "specialLink": [ "hrefLeft", "hrefRight" ],
            "aspects": [ "invalidHref", "preferButton" ]
        }]
    }
};