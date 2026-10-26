// Règles de qualité du code (npm run lint). Scripts classiques partageant l'espace global MF.
import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'js/data/clues-*.js', 'test-results/'] },
  js.configs.recommended,
  {
    files: ['js/**/*.js', 'sw.js', 'tests/run.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'script',
      globals: { ...globals.browser, ...globals.worker, MF: 'writable' },
    },
    rules: {
      'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }],
      'no-empty': ['error', { allowEmptyCatch: true }],
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': ['error', { destructuring: 'all' }],
      'no-implicit-globals': 'error',
    },
  },
  // Le service worker a sa propre portée globale (pas de page partagée)
  { files: ['sw.js'], rules: { 'no-implicit-globals': 'off' } },
  {
    files: ['eslint.config.mjs', 'tests/ci.mjs'],
    // ci.mjs : Node, plus les fonctions qu'il fait exécuter dans la page (page.evaluate)
    languageOptions: { ecmaVersion: 2023, sourceType: 'module', globals: { ...globals.node, ...globals.browser } },
  },
];
