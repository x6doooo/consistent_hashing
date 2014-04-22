var ConsistentHashing = require('../lib/index');
var crypto = require('crypto');

var co = new ConsistentHashing();

var len = 10;
while (len--) {
    co.addNode('node' + len);
}

var hitMap = {};

var max = 10 * 10000;

console.log('* get test start ...');
var s = Date.now();

var node;
for (var i = 0; i < max; i++) {
    node = crypto.createHash('md5').update(Math.random() * 1000 + '-' + i).digest('hex');
    node = co.getNode(node);
    if (!hitMap[node]) {
        hitMap[node] = 0;
    }
    hitMap[node] += 1;
}

var arr = [];
for (var key in hitMap) {
    arr.push({
        k: key, 
        t: hitMap[key], 
        p: (hitMap[key] / max * 100).toFixed(2)
    });
}

arr.sort(function(a, b){
    return b.p - a.p
});

console.log('\nid','\t','hit','\t','%');
arr.forEach(function(v) {
    console.log(v.k, '\t', v.t, '\t', v.p);
});

console.log('\ntotal:', max);
var e = Date.now() - s;
console.log('time:', e, 'ms (' + (max/e*1000).toFixed(2), 'o/s)');
