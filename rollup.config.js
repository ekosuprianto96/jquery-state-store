import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/jquery-state-store.cjs.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/jquery-state-store.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/jquery-state-store.umd.js',
      format: 'umd',
      name: 'ECarousel',
      sourcemap: true,
    },
    {
      file: 'dist/jquery-state-store.min.js',
      format: 'umd',
      name: 'EStoreJquery',
      plugins: [terser()],
      sourcemap: true,
    },
  ]
};