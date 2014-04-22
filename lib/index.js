var crypto = require('crypto');
var ch_funcs = require('../build/Release/chfuncs.node');

var CH = function(config) {
    config = config || {};
    this.ring = {};
    this.keys = [];
    this.nodes = [];
    this.replicas = config.replicas || 256;
    this.hashAlgorithm = config.hashAlgorithm || 'md5';
    this.length = 0;
};

var P = CH.prototype;

P.getHashKey = function(str) {
    return crypto.createHash(this.hashAlgorithm).update(str).digest('hex');
};

P.addNode = function(nodes) {
    var self = this;
    if (Array.isArray(nodes)) {
        nodes.forEach(function(v) {
            self.__addNode__(v);
        });
        return;
    }
    self.__addNode__(nodes);
};

P.__addNode__ = function(node) {
    var key;
    this.nodes.push(node);
    for (var i = 0, len = this.replicas; i < len; i++) {
        key = this.getHashKey(node + i);
        this.ring[key] = node;
        if (this.keys.indexOf(key) < 0) {
            this.keys.push(key);
        }
    }
    this.keys.sort();
};

P.removeNode = function(node) {
    var ring = this.ring;
    var keys = this.keys;
    var nodes = this.nodes;
    var j, jlen, key;
    var tem = [];
    
    for (var i = 0, len = nodes.length; i < len; i++) {
        if (node != nodes[i]) {
            tem.push(nodes[i]);
        }
    }
    this.nodes = tem;

    for (var i = 0, len = this.replicas; i < len; i++) {
        key = this.getHashKey(node + i);
        delete ring[key];
        
        tem = [];
        for (j = 0, jlen = keys.length; j < jlen; j++) {
            if (keys[j] != key) {
                tem.push(keys[j]);
            }
        }
        keys = tem;
    }
    this.keys = keys;

};

P.getNode = function(key) {
    
    var hash = this.getHashKey(key);
    var ring = this.ring;

    if (ring[hash]) {
        return ring[hash];
    }

    var keys = this.keys;

    if (keys.length - 1 == 0) {
        return ring[keys[0]];
    }

    var idx = ch_funcs.getNodePosition(keys, hash);

    return ring[keys[idx]];
    
};

module.exports = CH;

