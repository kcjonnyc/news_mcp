import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    rules: {
      'object-curly-spacing': ['error', 'never'],
      'sort-imports': ['off'],
      'no-duplicate-imports': 'error',
      'indent': ['error', 2],
      'quotes': ['error', 'single', {avoidEscape: true}],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'never'],
      'no-trailing-spaces': 'error',
      'max-len': ['warn', {code: 100, ignoreStrings: true, ignoreTemplateLiterals: true}],
      'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 1}],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}]
    }
  },
  {
    ignores: ['dist/**/*', 'node_modules/**/*', 'tests/**/*']
  }
); 