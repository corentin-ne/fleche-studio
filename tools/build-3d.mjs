// Bundles the Murdoku 3D board renderer (src3d/, ES modules + three.js) into one
// minified ES module, js/vendor/murdoku3d.js, loaded lazily by the app with
// `await import(MF.loader.url('js/vendor/murdoku3d.js'))`.
// Usage: npm run build:3d
import { build } from 'esbuild';
import { readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const three = JSON.parse(readFileSync(resolve(root, 'node_modules/three/package.json'), 'utf8'));
const out = resolve(root, 'js/vendor/murdoku3d.js');

const banner = `/*! murdoku3d — rendu 3D du plateau Murdoku pour Flèche Studio.
 * Généré par tools/build-3d.mjs depuis src3d/ (ne pas modifier à la main).
 * Objets, matériaux, lumières et rendus adaptés de building-builder (House Builder).
 *
 * Contient three.js r${three.version.split('.')[1]} (${three.version}) — https://threejs.org
 * The MIT License
 * Copyright © 2010-2025 three.js authors
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */`;

await build({
  entryPoints: [resolve(root, 'src3d/index.js')],
  outfile: out,
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: ['es2020', 'chrome90', 'firefox90', 'safari15'],
  minify: true,
  treeShaking: true,
  legalComments: 'none',
  charset: 'utf8',
  banner: { js: banner },
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});

console.log(`js/vendor/murdoku3d.js : ${(statSync(out).size / 1024).toFixed(1)} Ko (three ${three.version})`);
