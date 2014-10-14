//Axes

var Horizontal = {
	position: function(it){return it.x},
	setPosition: function(it, value) { it.x = value },
	size: function(it) { return it.width },
	delta: function(value) {
		return {x: value}
	}
}

var Vertical = {
	position: function(it){return it.y}, 
	setPosition: function(it, value) { it.y = value },
	size:function(it) { return it.height },
	delta: function(value) {
		return {y: value}
	}
}

function withinAxe(point, rectangle, axe) {
	return axe.position(point) >= axe.position(rectangle) &&
	axe.position(point) <= axe.position(rectangle) + axe.size(rectangle)
}

//Senses

var Forward = {
	deltaModule: function(value) {
		return value
	}
}

var Backward = {
	deltaModule: function(value) {
		return -value
	}
}

//Directions

function Direction(axe, sense) {
	this.axe = axe;
	this.sense = sense;
}

Direction.prototype = {
	delta: function(value) {
		return this.axe.delta(this.sense.deltaModule(value));
	},
	oppositeOf: function(value) {
		return value === this.opposite;
	}
}

Direction.fromKeyCode = function(code) {
	if(code === KeyCodes.UP_ARROW) return Up;
	if(code === KeyCodes.DOWN_ARROW) return Down;
	if(code === KeyCodes.LEFT_ARROW) return Left;
	if(code === KeyCodes.RIGHT_ARROW) return Right;
}

var Left = new Direction(Horizontal, Backward) 
var Right = new Direction(Horizontal, Forward)
var Up =  new Direction(Vertical, Backward)
var Down = new Direction(Vertical, Forward)

Left.opposite = Right;
Right.opposite = Left;
Down.opposite = Up;
Up.opposite = Down;

