# node-quadtree
## Description
Quadtree is a node module that encodes and decodes geospatial [quadtrees](http://en.wikipedia.org/wiki/Quadtree).

The encoding algorithm orders the tiles using the [bing maps ordering](http://msdn.microsoft.com/en-us/library/bb259689.aspx) shown below:

![Quadtree ordering](http://i.msdn.microsoft.com/dynimg/IC96238.jpg)

## Installation
    $ npm install quadtree

## Example
	var quadtree = require('quadtree');

	var coordinate = {
		lng: -27.093364,
		lat: -109.367523
	};

	var precision = 8;
	var encoded = quadtree.encode(coordinate, precision);

	var decoded = quadtree.decode(encoded);

	var boundingBox = quadtree.bbox(decoded.origin);

## Contributors
Pair programmed by [Roy Lines](http://roylines.co.uk) and [James Bloomer](https://github.com/jamesbloomer).

