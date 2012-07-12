var assert = require('assert'),
	quadtree = require('../lib/quadtree');

describe('quadtree', function(){
  describe('#encode()', function(){
    it('should return expected for precision 1', function(){
      assert.equal(quadtree.encode({lng : 156.0, lat : 35.0}, 1), '1');
    });
    it('should return expected for precision 2', function(){
      assert.equal(quadtree.encode({lng : 156.0, lat : 35.0}, 2), '13');
    });
    it('should return expected for precision 3', function(){
      assert.equal(quadtree.encode({lng : 156.0, lat : 35.0}, 3), '131');
    });
     it('should return expected for precision 12', function(){
      assert.equal(quadtree.encode({lng : 156.0, lat : 35.0}, 12), '1310333011323');
    });
  });
});