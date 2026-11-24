import test from 'node:test';
import assert from 'node:assert/strict';
import {statSync,readFileSync} from 'node:fs';
test('responsive real-photo variants exist and are smaller than preserved JPEG fallbacks',()=>{
 for(const name of ['cocoa-pod','field-cocoa','field-visit','cashew-warehouse','cashew-yard','field-sacks-sewn','field-open-sack','field-founder-warehouse','field-beans-hand','field-beans-check','field-drying-bed','field-container-loading','field-container-liner','field-founder-container']){
  const original=statSync(`public/images/${name}.jpg`).size;
  for(const width of [480,800,1280]){
   const path=`public/images/${name}-${width}.webp`;
   assert.ok(statSync(path).size<original);
   assert.equal(readFileSync(path).subarray(8,12).toString(),'WEBP');
  }
 }
});
test('gallery web copies carry no camera metadata (no GPS)',()=>{
 for(const name of ['field-sacks-sewn','field-open-sack','field-founder-warehouse','field-beans-hand','field-beans-check','field-drying-bed','field-container-loading','field-container-liner','field-founder-container']){
  for(const file of [`public/images/${name}.jpg`,...[480,800,1280].map(w=>`public/images/${name}-${w}.webp`)]){
   const bytes=readFileSync(file);
   assert.equal(bytes.indexOf('Exif'),-1,`Metadata left in ${file}`);
  }
 }
});
