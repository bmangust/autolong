// http://eslint.org/docs/user-guide/configuring
module.exports = {
    'root': true,
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'sourceType': 'module',
    },
    'env': {
        'es6': true,
        'browser': true,
        'node': true
    },
    'rules': {
        'semi': 'off',
        'arrow-parens': 'off',
        'comma-dangle': 'off',
        'indent': 'off',
        'require-jsdoc': 'off',
        'operator-linebreak': 'off',
        'valid-jsdoc': 'off',
        'space-before-function-paren': 'off',
        'react/prop-types': 'off',
    },
    'plugins': [
        'react',
    ],
    'ignorePatterns': [
        'resources/js/components/UI/iconComponents/*.tsx'
    ],
    'extends': [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'eslint:recommended',
        'google'
    ]
}
