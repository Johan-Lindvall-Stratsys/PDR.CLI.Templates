import typescript from 'rollup-plugin-typescript'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default {
  input: ['./frontend/src/##TAG_NAME##.ts'],
  output: {
    dir: 'lib',
    format: 'es'
  },
  external(id) {
    // Other packages that should be external can be added below
    return id === './app'
  },
  plugins: [
    replace({
      VERSION: JSON.stringify(require('./package.json').version)
    }),
    commonjs(),
    typescript(),
    babel({
      extensions: ['.js', '.ts'],
      babelrc: false,
      presets: ['@babel/env', '@babel/typescript'],
      plugins: [
        '@babel/proposal-class-properties',
        '@babel/proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import'
      ]
    })
  ]
}
