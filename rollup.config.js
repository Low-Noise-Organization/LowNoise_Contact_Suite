import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/low-noise-contact-suite.js',
      format: 'umd',
      name: 'LowNoiseContactSuite',
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
      useTsconfigDeclarationDir: true,
    }),
    terser(),
  ],
};
