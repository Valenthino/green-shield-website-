import test from 'node:test';
import assert from 'node:assert/strict';
import {statSync,readFileSync} from 'node:fs';
test('responsive real-photo variants exist and are smaller than preserved JPEG fallbacks',()=>{
 for(const name of ['cocoa-pod','field-cocoa','field-visit']){
  const original=statSync(`public/images/${name}.jpg`).size;
  for(const width of [480,800,1280]){
   const path=`public/images/${name}-${width}.webp`;
   assert.ok(statSync(path).size<original);
   assert.equal(readFileSync(path).subarray(8,12).toString(),'WEBP');
  }
 }
});
