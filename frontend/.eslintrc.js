module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  plugins: [
    'scanjs-rules',
    'no-unsanitized',
    'no-wildcard-postmessage'
  ],
  extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
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
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-v-html': 'error',
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
    'scanjs-rules/call_setImmediate' : 'warning',
    'scanjs-rules/call_setInterval' : 'warning',
    'scanjs-rules/call_setTimeout' : 'warning',
    'scanjs-rules/new_Function' : 'error',
    'scanjs-rules/property_addIdleObserver' : 'error',
    'scanjs-rules/property_createContextualFragment' : 'error',
    'scanjs-rules/property_crypto': 'error',
    'scanjs-rules/property_indexedDB' : 'error',
    'scanjs-rules/property_mgmt' : 'error',
    'no-unsanitized/method': 'error',
    'no-unsanitized/property': 'error',
    'no-wildcard-postmessage/no-wildcard-postmessage': 'error'
  },
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
