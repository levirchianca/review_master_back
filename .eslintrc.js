module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "extends": [
        "standard",
        "prettier/@typescript-eslint",
        "plugin:@typescript-eslint/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
};
