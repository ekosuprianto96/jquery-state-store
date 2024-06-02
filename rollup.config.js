import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/jquery-state-store.cjs.js',
            format: 'cjs'
        },
        {
            file: 'dist/jquery-state-store.esm.js',
            format: 'esm'
        },
        {
            file: 'dist/jquery-state-store.umd.js',
            format: 'umd',
            name: 'stateManagement',
            globals: {
                jquery: '$'
            }
        },
        {
            file: 'dist/jquery-state-store.min.js',
            format: 'iife',
            name: 'stateManagement',
            plugins: [terser()],
            globals: {
                jquery: '$'
            }
        }
    ],
    external: ['jquery'],
    plugins: [
        resolve(),
        commonjs()
    ]
};