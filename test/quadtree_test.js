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
       assert.deepEqual(quadtree.decode('1310333011323110333011323110333011323110333011323111231111111111111111111111111111111111111111111111').origin, {lng : 156.0, lat : 35.0});
     });
     it('should return expected for given quadtree precision 12', function(){
       assert.deepEqual(quadtree.decode('1310333011323').origin, {"lng":155.98388671875,"lat":34.991455078125});
     });
     it('should return expected for given quadtree precision 20', function(){
       assert.deepEqual(quadtree.decode('131033301132301103330').origin, {"lng":155.98088264465332,"lat":35.00119686126709});
     });
    it('should return expected for given quadtree precision 1', function(){
      assert.deepEqual(quadtree.decode('0').origin, {lng : -90.0, lat : 45.0});
      assert.deepEqual(quadtree.decode('1').origin, {lng : 90.0, lat : 45.0});
      assert.deepEqual(quadtree.decode('2').origin, {lng : -90.0, lat : -45.0});
      assert.deepEqual(quadtree.decode('3').origin, {lng : 90.0, lat : -45.0});
    });
  });

  describe('#bbox()', function(){
    it('should return expected for given quadtree precision 12', function(){
     assert.deepEqual(quadtree.bbox('1310333011323'), { minlng: 155.9619140625, minlat: 34.98046875, maxlng: 156.005859375, maxlat: 35.00244140625 });
    });
    it('should return expected for given quadtree precision 20', function(){
     assert.deepEqual(quadtree.bbox('131033301132301103330'), { minlng: 155.98079681396484, minlat: 35.00115394592285, maxlng: 155.9809684753418, maxlat: 35.00123977661133 });
    });
    it('should return expected for given quadtree precision 1', function(){
      assert.deepEqual(quadtree.bbox('0'), { minlng: -180.0, minlat: 0.0, maxlng: 0.0, maxlat: 90.0 });
      assert.deepEqual(quadtree.bbox('1'), { minlng: 0.0, minlat: 0.0, maxlng: 180.0, maxlat: 90.0 });
      assert.deepEqual(quadtree.bbox('2'), { minlng: -180.0, minlat: -90.0, maxlng: 0.0, maxlat: 0.0 });
      assert.deepEqual(quadtree.bbox('3'), { minlng: 0.0, minlat: -90.0, maxlng: 180.0, maxlat: 0.0 });
    });
  });
});