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
	var encoded = quadtree.encode(coordinate, precision);

	var decoded = quadtree.decode(encoded);

	var boundingBox = quadtree.bbox(decoded.origin);

### quadtree.encode(coordinate, precision)
Encodes a coordinate of the form _{ lng: -27.093364, lat: -109.367523 }_ into a quadtree of the specified precision.

### quadtree.decode(quadtree)
Decodes a quadtree of the form _'01122332'_ into an object of the form _{ origin: { lng: -27.093364, lat: -109.367523 }, error: { lng: 0.343, lat: 0.444 }}_.

### quadtree.neighbour(encoded, north, east)
Finds the neighbour of the given quadtree, walking a number of tiles in the supplied direction. Use -1 to walk south or west one tile.

### quadtree.bbox(encoded)
Returns the bounding box of the tile containing the supplied quadtree. The bounding box is returned in the following form: _{ minlng: -27.093364, minlat: -109.367523, maxlng: -27.093365, maxlat: -109.367525 }_

## Contributors
Pair programmed by [Roy Lines](http://roylines.co.uk) and [James Bloomer](https://github.com/jamesbloomer).

