import { build } from 'esbuild';
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await mkdir(path.join(root,'web/static'),{recursive:true});
await build({entryPoints:[path.join(root,'web/frontend/app.js')],outfile:path.join(root,'web/static/app.js'),bundle:true,
  format:'esm',minify:true,sourcemap:false,target:'es2022',legalComments:'linked'});
await copyFile(path.join(root,'node_modules/world-atlas/countries-110m.json'),path.join(root,'web/static/world.json'));
let licenses='ARMSFLOW — THIRD-PARTY FRONTEND NOTICES\n\n';
for(const name of ['three','d3-geo','d3-array','internmap','topojson-client','world-atlas']) {
  const folder=path.join(root,'node_modules',name);
  const pkg=JSON.parse(await readFile(path.join(folder,'package.json'),'utf8'));
  licenses+=`\n${name} ${pkg.version} — ${pkg.license}\n`;
  try { licenses+=await readFile(path.join(folder,'LICENSE'),'utf8'); }
  catch { try { licenses+=await readFile(path.join(folder,'LICENSE.md'),'utf8'); } catch { licenses+='See the package repository for its license.\n'; } }
}
licenses+='\nMap geometry: Natural Earth, public domain, via world-atlas.\nThe four equipment models are original illustrative exteriors made for ArmsFlow, not technical replicas.\n';
await writeFile(path.join(root,'web/static/THIRD_PARTY_NOTICES.txt'),licenses);
console.log('Built offline-capable frontend, map data and license notices.');
