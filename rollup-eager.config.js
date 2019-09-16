export default {
  input: ['./lib/##TAG_NAME##.js'],
  output: {
    format: 'es',
    file: './lib/full.js'
  },
  inlineDynamicImports: true
}
