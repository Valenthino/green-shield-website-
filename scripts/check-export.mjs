import { readFileSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const root=resolve('out');
const routes=['/','/en/','/fr/',...['en','fr'].flatMap(lang=>['about','cocoa','contact'].map(page=>`/${lang}/${page}/`))];
for(const route of routes){
 const file=resolve(root,'.'+route,'index.html');
 assert.ok(existsSync(file),`Missing route: ${route}`);
 const html=readFileSync(file,'utf8');
 assert.doesNotMatch(html, /<title>[^<]*(?:private|privé)/i, `Misleading private title: ${route}`);
 const language=route.startsWith('/fr/')?'fr':'en';
 assert.match(html,new RegExp(`<html[^>]*lang="${language}"`),`Wrong language: ${route}`);
 assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`Expected one h1: ${route}`);
 assert.match(html,/<meta name="robots" content="noindex, nofollow"\/>/,`Missing draft robots policy: ${route}`);
 for(const [,set] of html.matchAll(/src[Ss]et="([^"]+)"/g)){
   for(const candidate of set.split(',')){
     const url=candidate.trim().split(/\s+/)[0];
     if(url.startsWith('/images/'))assert.ok(existsSync(resolve(root,'.'+url)),`Missing responsive image: ${route} -> ${url}`);
   }
 }
 for(const [,value] of html.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[^"\s]*)"/g)){
   if(value.startsWith('//')) throw new Error(`Unexpected external resource: ${value}`);
   const target=resolve(root,'.'+value);
   assert.ok(target.startsWith(root),`Unexpected path: ${value}`);
   assert.ok(existsSync(target),`Broken local reference: ${route} -> ${value}`);
   if(statSync(target).isDirectory()) assert.ok(existsSync(resolve(target,'index.html')),`Missing index: ${value}`);
 }
}
console.log(`Export checks passed: ${routes.length} routes, language tags, h1 headings, noindex and local links/assets.`);

for(const language of ['en','fr']){
 const home=readFileSync(resolve(root,language,'index.html'),'utf8');
 const products=readFileSync(resolve(root,language,'cocoa/index.html'),'utf8');
 assert.match(home,/field-visit-480.webp/, 'People-focused hero required');
 assert.doesNotMatch(home,/src="\/images\/cocoa-pod.jpg"/, 'Pod-only hero must not return');
 assert.match(home,language==='fr'?/CAFÉ · CACAO · ANACARDE/:/COFFEE · COCOA · CASHEW/);
 assert.match(products,/cashew-warehouse-800.webp/);
 assert.match(products,/cashew-yard-800.webp/);
 assert.match(products,/Monrovia/); assert.match(products,/Lomé/);
 assert.match(products,language==='fr'?/Les conditions commerciales sont fixées dans le devis/:/Trade terms are agreed in the quotation/);
 assert.match(products,language==='fr'?/Photographies d’archives/:/Historical photographs/);
 assert.doesNotMatch(products,/\bFOB\b/,'Unconfirmed trade term must not be asserted');
}
console.log('Scope checks passed: human cocoa hero, three commodities, historical cashew gallery and qualified shipment locations.');
