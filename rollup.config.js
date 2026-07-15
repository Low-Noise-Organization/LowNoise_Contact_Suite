import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const sharedPlugins = (declaration = false) => [
  typescript({
    tsconfig: './tsconfig.json',
    declaration,
    declarationDir: undefined,
  }),
  terser(),
];

const sharedOutput = {
  sourcemap: true,
};

export default [
  // Main entry (vanilla)
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/low-noise-contact-suite.js',
        format: 'umd',
        name: 'LowNoiseContactSuite',
        exports: 'default',
        ...sharedOutput,
      },
      {
        file: 'dist/low-noise-contact-suite.esm.js',
        format: 'esm',
        ...sharedOutput,
      },
    ],
    plugins: sharedPlugins(),
  },
  // React entry
  {
    input: 'src/react/index.ts',
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    output: [
      {
        file: 'dist/react.js',
        format: 'umd',
        name: 'LowNoiseContactSuiteReact',
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        ...sharedOutput,
      },
      {
        file: 'dist/react.esm.js',
        format: 'esm',
        ...sharedOutput,
      },
    ],
    plugins: sharedPlugins(),
  },
  // Vanilla auto-init entry
  {
    input: 'src/vanilla/auto-init.ts',
    output: [
      {
        file: 'dist/vanilla-auto-init.js',
        format: 'iife',
        name: 'LowNoiseContactSuiteAutoInit',
        ...sharedOutput,
      },
      {
        file: 'dist/vanilla-auto-init.esm.js',
        format: 'esm',
        ...sharedOutput,
      },
    ],
    plugins: sharedPlugins(),
  },
];
