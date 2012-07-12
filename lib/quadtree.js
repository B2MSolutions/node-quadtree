
var quadtree = {};


quadtree.encode = function(coordinate, precision) {
	
	var lngOrigin = 0;
	var latOrigin = 0;

	var lngRange = 180;
	var latRange = 90;

	var result = '';

	while(precision > 0) {
		if((coordinate.lng < lngOrigin) && (coordinate.lat >= latOrigin)) {
			lngOrigin = lngOrigin - lngRange/2;
			latOrigin = latOrigin + latRange/2;
			result += '0';
		} else if((coordinate.lng >= lngOrigin) && (coordinate.lat >= latOrigin)) {
			lngOrigin = lngOrigin + lngRange/2;
			latOrigin = latOrigin + latRange/2;
			result += '1';
		} else if((coordinate.lng < lngOrigin) && (coordinate.lat < latOrigin)) {
			lngOrigin = lngOrigin - lngRange/2;
			latOrigin = latOrigin - latRange/2;
			result += '2';
			continue;
		} else {
			lngOrigin = lngOrigin + lngRange/2;
			latOrigin = latOrigin - latRange/2;
			result += '3';
		}

		lngRange = lngRange / 2;
		latRange = latRange / 2;

		precision--;
	}

	return result;
};

module.exports = quadtree;