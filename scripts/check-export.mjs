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
