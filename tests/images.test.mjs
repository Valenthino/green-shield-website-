import test from 'node:test';
import assert from 'node:assert/strict';
import {statSync,readFileSync} from 'node:fs';
test('responsive real-photo variants exist and stay within the page-weight budget',()=>{
 for(const name of ['cocoa-pod','field-cocoa','field-visit','cashew-warehouse','cashew-yard','field-sacks-sewn','field-open-sack','field-founder-warehouse','field-beans-hand','field-beans-check','field-drying-bed','field-container-loading','field-container-liner','field-founder-container']){
  assert.ok(statSync(`public/images/v2/${name}.jpg`).size<=80*1024,`JPEG fallback too heavy: ${name}`);
  for(const [width,budget] of [[480,30],[800,60],[1280,120]]){
   const path=`public/images/v2/${name}-${width}.webp`;
   assert.ok(statSync(path).size<=budget*1024,`Too heavy: ${path}`);
   assert.equal(readFileSync(path).subarray(8,12).toString(),'WEBP');
  }
 }
});
test('gallery web copies carry no camera metadata (no GPS)',()=>{
 for(const name of ['field-sacks-sewn','field-open-sack','field-founder-warehouse','field-beans-hand','field-beans-check','field-drying-bed','field-container-loading','field-container-liner','field-founder-container']){
  for(const file of [`public/images/v2/${name}.jpg`,...[480,800,1280].map(w=>`public/images/v2/${name}-${w}.webp`)]){
   const bytes=readFileSync(file);
   assert.equal(bytes.indexOf('Exif'),-1,`Metadata left in ${file}`);
  }
 }
});
