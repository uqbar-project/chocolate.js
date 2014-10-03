function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype = {
	within: function(rectangle) {
		return withinAxe(this, rectangle, Horizontal) && withinAxe(this, rectangle, Vertical);
	}, 
	toString: function() {
		return 'P' + this.x + ':'+ this.y
	}
}

