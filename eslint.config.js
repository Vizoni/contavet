import jestPlugin from 'eslint-plugin-jest';
import pluginJs from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptEslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest, // Adiciona os globals do Jest
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    plugins: {
      'react-hooks': pluginReactHooks,
      '@typescript-eslint': typescriptEslint,
      prettier,
      'simple-import-sort': simpleImportSort,
      storybook,
      jest: jestPlugin, // Adiciona o plugin do Jest
    },
  },
  {
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...pluginReact.configs['jsx-runtime'].rules,
      ...typescriptEslint.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      ...storybook.configs.recommended.rules,
      ...jestPlugin.configs.recommended.rules, // Usa as regras recomendadas do Jest
      // Custom rules
      'no-unused-vars': 'error',
      'no-undef': 'error',
      'no-unused-expressions': 'error',
      'no-void': 'off',
      'no-trailing-spaces': 2,
      'no-restricted-exports': 'off',
      'no-console': [
        'error',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/unbound-method': 'off',
      'default-param-last': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      'react/destructuring-assignment': 'warn',
      'react/function-component-definition': 'off',
      'react/require-default-props': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.ts', '.tsx'],
        },
      ],
    },
  },
  {
    ignores: ['jest.config.js', 'jest.setup.ts'],
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
