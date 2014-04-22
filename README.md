consistent hashing
===
Node.js Consistent Hashing Module (Javascript & C++)

[![NPM](https://nodei.co/npm/consistent_hashing.png)](https://nodei.co/npm/consistent_hashing/)

### Installation
	npm install consistent_hashing

### Usage

```javascript
var ConsistentHashing = require('./consistent_hashing');
var co = new ConsistentHashing;
co.addNode('node0');	//=> add string
co.addNode(['node1', 'node2', 'node3', 'node4']);	//=> add array

console.log(co.getNode('8.8.8.8'));	//=> node2
co.removeNode('node2');
console.log(co.getNode('8.8.8.8'));	//=> node3

console.log(co.nodes);	//=>	['node0', 'node1', 'node3', 'node4']
```

### Configure

```javascript
new ConsistentHashing({
	replicas: 128 // default is 256
	hashAlgorithm: 'sha1' //default is 'md5'
})
```


### Performance

	node ./test/test-performance.js

	eg: ( Intel Core i5 1.7 GHz / 4 GB)
	------------------------------------------------
	* get test start ...
	
	id 	 hit 	 %
	node7 	 10882 	 10.88
	node2 	 10743 	 10.74
	node9 	 10380 	 10.38
	node4 	 10187 	 10.19
	node6 	 10106 	 10.11
	node5 	 9908 	 9.91
	node0 	 9904 	 9.90
	node1 	 9521 	 9.52
	node8 	 9241 	 9.24
	node3 	 9128 	 9.13
	
	total: 100,000
	time: 2362 ms (42337.00 o/s)



