function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype = {
	within: function(rectangle) {
		return withinAxe(this, rectangle, Horizontal) && withinAxe(this, rectangle, Vertical);
	}, 
	update: function(delta){
		return new Point(this.x + (delta.x || 0), this.y + (delta.y || 0));
	},
	toString: function() {
		return 'P' + this.x + ':'+ this.y
	}
}

