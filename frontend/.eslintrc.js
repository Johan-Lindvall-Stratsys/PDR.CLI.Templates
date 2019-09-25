module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'prettier',
    '@typescript-eslint',
    'scanjs-rules',
    'no-unsanitized',
  ],
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
    'strict': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'scanjs-rules/accidental_assignment': 'error',
    'scanjs-rules/assign_to_hostname' : 'error',
    'scanjs-rules/assign_to_href' : 'error',
    'scanjs-rules/assign_to_location' : 'error',
    'scanjs-rules/assign_to_onmessage' : 'error',
    'scanjs-rules/assign_to_pathname' : 'error',
    'scanjs-rules/assign_to_protocol' : 'error',
    'scanjs-rules/assign_to_search' : 'error',
    'scanjs-rules/assign_to_src' : 'error',
    'scanjs-rules/call_Function' : 'error',
    'scanjs-rules/call_addEventListener_message' : 'error',
    'scanjs-rules/call_connect' : 'error',
    'scanjs-rules/call_eval' : 'error',
    'scanjs-rules/call_execScript' : 'error',
    'scanjs-rules/call_hide' : 'error',
    'scanjs-rules/call_open_remote=true' : 'error',
    'scanjs-rules/call_parseFromString' : 'error',
    'scanjs-rules/call_setImmediate' : 'warn',
    'scanjs-rules/call_setInterval' : 'warn',
    'scanjs-rules/call_setTimeout' : 'warn',
    'scanjs-rules/new_Function' : 'error',
    'scanjs-rules/property_addIdleObserver' : 'error',
    'scanjs-rules/property_createContextualFragment' : 'error',
    'scanjs-rules/property_crypto': 'error',
    'scanjs-rules/property_indexedDB' : 'error',
    'scanjs-rules/property_mgmt' : 'error',
    'no-unsanitized/method': 'error',
    'no-unsanitized/property': 'error',
  }
}
