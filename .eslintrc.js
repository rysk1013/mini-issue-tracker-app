module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // Prettier連携
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    // プロジェクトに合わせてカスタマイズ
    "prettier/prettier": [
      "error",
      {
        semi: false,
        singleQuote: true,
        printWidth: 100,
      },
    ],
  },
}
