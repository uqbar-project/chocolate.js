function Rectangle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Rectangle.prototype = {
	get points() {
		return [
		new Point(this.x, this.y),
		new Point(this.x, this.y + this.height),
		new Point(this.x + this.width, this.y),
		new Point(this.x + this.width, this.y + this.width)
		]
	},

	collides: function(other) {
		return this.points.some(function(point){
			return other.includesPoint(point);
		}, this)
	},

	includesPoint: function(point) {
		return point.within(this);
	},

	toString: function() {
		return 'R' + this.x + ":" + this.y +":"+ this.width +":"+ this.height
	}
}
