
var quadtree = {};

quadtree.encode = function(coordinate, precision) {
	
	var origin = { lng: 0, lat: 0 };
	var range = { lng: 180, lat: 90 };

	var result = '';

	while(precision > 0) {
		range.lng /= 2;
		range.lat /= 2;

		if((coordinate.lng < origin.lng) && (coordinate.lat >= origin.lat)) {
			origin.lng -= range.lng;
			origin.lat += range.lat;
			result += '0';
		} else if((coordinate.lng >= origin.lng) && (coordinate.lat >= origin.lat)) {
			origin.lng += range.lng;
			origin.lat += range.lat;
			result += '1';
		} else if((coordinate.lng < origin.lng) && (coordinate.lat < origin.lat)) {
			origin.lng -= range.lng;
			origin.lat -= range.lat;
			result += '2';
		} else {
			origin.lng += range.lng;
			origin.lat -= range.lat;
			result += '3';
		}

		--precision;
	}

	return result;
};

quadtree.decode = function(quadtree) {

	var origin = { lng: 0, lat: 0 };
	var range = { lng: 180, lat: 90 };

	var precision = quadtree.length;
	var currentPrecision = 0;

	while(currentPrecision < precision) {
		range.lng /= 2;
		range.lat /= 2;

		var quadrant = quadtree[currentPrecision];
		if(quadrant === '0') {
			origin.lng -= range.lng;
			origin.lat += range.lat;
		} else if(quadrant === '1') {
			origin.lng += range.lng;
			origin.lat += range.lat;
		} else if(quadrant === '2') {
			origin.lng -= range.lng;
			origin.lat -= range.lat;
		} else {
			origin.lng += range.lng;
			origin.lat -= range.lat;
		}

		++currentPrecision;
	}

	return origin;
};

module.exports = quadtree;