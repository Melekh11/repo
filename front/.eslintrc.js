module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ["./tsconfig.json"]
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    "@typescript-eslint/semi": 0,
    "@typescript-eslint/quotes": 0,
    "@typescript-eslint/member-delimiter-style": 0,
    "@typescript-eslint/ban-ts-comment": 0,
  }
}
