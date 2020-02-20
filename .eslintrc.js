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
        "no-bitwise": 0
    }
};