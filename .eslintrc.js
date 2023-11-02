module.exports = {
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    root: true,
    rules: {
        'prefer-const': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
    },
    ignorePatterns: [
        ".eslintrc.js",
        "*.config.js",
    ]
};