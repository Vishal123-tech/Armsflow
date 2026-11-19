import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bases,filterBases} from '../web/frontend/bases.js';

test('search matches country aliases, cities and names without case sensitivity',()=>{
  assert.equal(filterBases(bases,{query:'  UNITED STATES  '},{united_states:'United States'})[0].id,'norfolk');
  assert.equal(filterBases(bases,{query:'KARACHI'})[0].id,'jauhar');
  assert.equal(filterBases(bases,{query:'Portsmouth'})[0].id,'portsmouth');
});
test('recipient and type filters intersect with search',()=>{
  assert.equal(filterBases(bases,{scope:'recipient',recipient:'india',kind:'Naval base',query:'karwar'}).length,1);
  assert.equal(filterBases(bases,{scope:'recipient',recipient:'india',kind:'Military port'}).length,0);
  assert.equal(filterBases(bases,{scope:'recipient',recipient:'north_korea'}).length,0);
  assert.equal(filterBases(bases,{query:'no such facility'}).length,0);
});
test('clearing filters returns original coverage without mutating records',()=>{
  const before=JSON.stringify(bases);
  filterBases(bases,{query:'India'});
  assert.deepEqual(filterBases(bases),bases);
  assert.equal(JSON.stringify(bases),before);
});
