# node-quadtree
[![Build Status](https://secure.travis-ci.org/B2MSolutions/node-quadtree.png)](http://travis-ci.org/B2MSolutions/node-quadtree)
## Description
Quadtree is a node module that encodes and decodes geospatial [quadtrees](http://en.wikipedia.org/wiki/Quadtree).

The encoding algorithm orders the tiles using the [bing maps ordering](http://msdn.microsoft.com/en-us/library/bb259689.aspx) shown below:

![Quadtree ordering](http://i.msdn.microsoft.com/dynimg/IC96238.jpg)

## Installation
    $ npm install quadtree

## Usage
	var quadtree = require('quadtree');

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

### quadtree.encode(coordinate, precision)
Encodes a coordinate into a quadtree of the specified precision.

### quadtree.decode(quadtree)
Decodes a quadtree into an origin and error.

### quadtree.neighbour(encoded, north, east)
Finds the neighbour of the given quadtree, walking a number of tiles in the supplied direction.

### quadtree.bbox(encoded)
Returns the bounding box of the tile containing the supplied quadtree.

### quadtree.envelop(bbox, precision)
Returns an array of quadtrees that are enveloped by the bbox at the supplied precision.

## Contributors
Pair programmed by [Roy Lines](http://roylines.co.uk) and [James Bloomer](https://github.com/jamesbloomer).

