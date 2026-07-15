import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/low-noise-contact-suite.js',
      format: 'umd',
      name: 'LowNoiseContactSuite',
      exports: 'default',
      sourcemap: true,
    },
    {
      file: 'dist/low-noise-contact-suite.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: false,
      declarationDir: undefined,
    }),
    terser(),
  ],
};
