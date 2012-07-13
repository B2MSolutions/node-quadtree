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
      assert.equal(quadtree.encode({lng : 156.0, lat : 35.0}, 12), '131033301132');
    });
    it('should return expected for precision 100', function(){
      assert.equal(quadtree.encode({lng : 156.0, lat : 35.0}, 100), '1310333011323110333011323110333011323110333011323111231111111111111111111111111111111111111111111111');
    });
  });

  describe('#decode()', function(){
     it('should return expected for given quadtree precision 100', function() {
       assert.deepEqual(quadtree.decode('1310333011323110333011323110333011323110333011323111231111111111111111111111111111111111111111111111'), {lng : 156.0, lat : 35.0});
     });
     it('should return expected for given quadtree precision 12', function(){
       assert.deepEqual(quadtree.decode('1310333011323'), {"lng":155.98388671875,"lat":34.991455078125});
     });
     it('should return expected for given quadtree precision 20', function(){
       assert.deepEqual(quadtree.decode('131033301132301103330'), {"lng":155.98088264465332,"lat":35.00119686126709});
     });
    it('should return expected for given quadtree precision 1', function(){
      assert.deepEqual(quadtree.decode('0'), {lng : -90.0, lat : 45.0});
      assert.deepEqual(quadtree.decode('1'), {lng : 90.0, lat : 45.0});
      assert.deepEqual(quadtree.decode('2'), {lng : -90.0, lat : -45.0});
      assert.deepEqual(quadtree.decode('3'), {lng : 90.0, lat : -45.0});
    });
  });
});