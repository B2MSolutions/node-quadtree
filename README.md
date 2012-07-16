# node-quadtree
## Description
Quadtree is a node module that encodes and decodes geospatial [quadtrees](http://en.wikipedia.org/wiki/Quadtree).

The encoding algorithm orders the tiles using the [bing maps ordering](http://msdn.microsoft.com/en-us/library/bb259689.aspx) shown below:

![Quadtree ordering](http://i.msdn.microsoft.com/dynimg/IC96238.jpg)

## Installation
    $ npm install quadtree

## Usage
	var quadtree = require('quadtree');

	var coordinate = {
		lng: -27.093364,
		lat: -109.367523
	};

	var precision = 8;
	var encoded = quadtree.encode(coordinate, precision); // returns "23323322"

	var decoded = quadtree.decode(encoded); // returns { origin: { lng: -27.421875, lat: -89.6484375 }, error: { lng: 0.703125, lat: 0.3515625 } }

	var neighbour = quadtree.neighbour(encoded, 1, 1); // returns "23323321"

	var boundingBox = quadtree.bbox(encoded); // returns { minlng:-28.125, minlat: -90, maxlng: -26.71875, maxlat: -89.296875 }

	var enveloped = quadtree.envelop(boundingBox, precision); // returns ["23323322", "23323323", "23323320", "23323321"]

### quadtree.encode(coordinate, precision)
Encodes a coordinate into a quadtree of the specified precision.

### quadtree.decode(quadtree)
Decodes a quadtree into an origin and error.

### quadtree.neighbour(encoded, north, east)
Finds the neighbour of the given quadtree, walking a number of tiles in the supplied direction.

### quadtree.bbox(encoded)
Returns the bounding box of the tile containing the supplied quadtree.

### quadtree.envelop(bbox, precision)
Returns an array of quadtrees that envelop the bbox at the supplied precision.

## Contributors
Pair programmed by [Roy Lines](http://roylines.co.uk) and [James Bloomer](https://github.com/jamesbloomer).

