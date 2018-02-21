import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

const ts2 = require('typescript');

const defaults = {
  name: 'lampix',
  input: 'src/index.ts'
}

export default [
  // UMD - for script:src in html files
  {
    input: defaults.input,
    output: {
      file: 'lib/umd/index.js',
      format: 'umd',
      name: defaults.name
    },
    plugins: [
      typescript({
        typescript: ts2
      }),
      resolve(),
      commonjs()
    ]
  }
]
