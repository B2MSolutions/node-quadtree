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

  describe('#neighbour()', function(){
    it('should return expected for given quadtree precision 12', function(){
      assert.deepEqual(quadtree.neighbour('1310333011320', 0, 1), '1310333011321');
    });
    it('should return expected for given quadtree precision 1 and quadrant 0', function(){
      assert.equal(quadtree.neighbour('0', 0, 0), '0');
      assert.equal(quadtree.neighbour('0', 0, 1), '1');
      assert.equal(quadtree.neighbour('0', -1, 0), '2');
      assert.equal(quadtree.neighbour('0', -1, 1), '3');
    });

    it('should return expected for given quadtree precision 1 and quadrant 1', function(){
      assert.equal(quadtree.neighbour('1', 0, -1), '0');
      assert.equal(quadtree.neighbour('1', 0, 0), '1');
      assert.equal(quadtree.neighbour('1', -1, -1), '2');
      assert.equal(quadtree.neighbour('1', -1, 0), '3');
    });
  });

  describe('#envelop()', function(){
    it('should return expected for given bbox precision 1', function() {
      assert.equal(JSON.stringify(quadtree.envelop({ minlng: -10, minlat: -10, maxlng: 20, maxlat: 20 }, 1)), JSON.stringify(['2','3','0','1']));
    });

    it('should return expected for given bbox precision 3', function() {
      var bbox = quadtree.bbox(quadtree.encode({lng: 0,lat: 0}, 3));
      var end = quadtree.encode({ lng: bbox.maxlng, lat: bbox.maxlat }, 3);
      var start = quadtree.encode({ lng: bbox.minlng, lat: bbox.minlat }, 3);
      var envelop = quadtree.envelop(bbox,3);
      assert.deepEqual([ '122', '123', '120', '121' ], envelop);
    });
  });

  describe('examples', function() {
    it('should return values described in the README', function() {
      var coordinate = {
          lat: -27.093364,
          lng: -109.367523
      };

      var precision = 8;
      var encoded = quadtree.encode(coordinate, precision); // returns "20310230")

      var decoded = quadtree.decode(encoded); // returns { origin: { lng: -108.984375, lat: -27.0703125 }, error: { lng: 0.703125, lat: 0.3515625 } }

      var neighbour = quadtree.neighbour(encoded, 1, 1); // returns "20310213"

      var boundingBox = quadtree.bbox(encoded); // returns { minlng: -109.6875, minlat: -27.421875, maxlng: -108.28125, maxlat: -26.71875 }

      var enveloped = quadtree.envelop(boundingBox, precision); // returns [ '20310230', '20310231', '20310212', '20310213' ]

      assert.equal(encoded, '20310230');
      assert.deepEqual(decoded, { origin: { lng: -108.984375, lat: -27.0703125 }, error: { lng: 0.703125, lat: 0.3515625 } });
      assert.equal(neighbour, '20310213');
      assert.deepEqual(boundingBox, { minlng: -109.6875, minlat: -27.421875, maxlng: -108.28125, maxlat: -26.71875 });
      assert.equal(JSON.stringify(enveloped), '["20310230","20310231","20310212","20310213"]');
    });
  });

  describe('issues', function() {
    it('bbox should enclose original coordinate', function() {
      var coords = {lat: -27.093364, lng: -109.367523};
      var encoded = quadtree.encode(coords, 20);
      var bbox = quadtree.bbox(encoded);
      assert(bbox.minlng <= coords.lng);
      assert(bbox.minlat <= coords.lat);
      assert(bbox.maxlng >= coords.lng);
      assert(bbox.maxlat >= coords.lat);
    });

    it('encode then decode should return coordinates within error of the original point', function() {
      var coords = {lat: -27.093364, lng: -109.367523};
      var encoded = quadtree.encode(coords, 20);
      var decoded = quadtree.decode(encoded);
      assert(decoded.origin.lat - decoded.error.lat <= coords.lat);
      assert(decoded.origin.lat + decoded.error.lat >= coords.lat);
      assert(decoded.origin.lng - decoded.error.lng <= coords.lng);
      assert(decoded.origin.lng + decoded.error.lng >= coords.lng);
    });
  });
});