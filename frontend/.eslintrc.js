module.exports = {
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'none',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        endOfLine: 'auto',
        printWidth: 100,
        jsxBracketSameLine: true
      }
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    strict: 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
