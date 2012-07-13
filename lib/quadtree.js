
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

quadtree.decode = function(quadtree) {

	var lngOrigin = 0;
	var latOrigin = 0;

	var lngRange = 180;
	var latRange = 90;

	var precision = quadtree.length;
	var currentPrecision = 0;

	while(currentPrecision < precision) {
		var quadrant = quadtree[currentPrecision];
		if(quadrant === '0') {
			lngOrigin = lngOrigin - lngRange/2;
			latOrigin = latOrigin + latRange/2;
		} else if(quadrant === '1') {
			lngOrigin = lngOrigin + lngRange/2;
			latOrigin = latOrigin + latRange/2;
		} else if(quadrant === '2') {
			lngOrigin = lngOrigin - lngRange/2;
			latOrigin = latOrigin - latRange/2;
		} else {
			lngOrigin = lngOrigin + lngRange/2;
			latOrigin = latOrigin - latRange/2;
		}
		
		lngRange = lngRange / 2;
		latRange = latRange / 2;

		++currentPrecision;
	}

	return { lng: lngOrigin, lat: latOrigin};
};

module.exports = quadtree;