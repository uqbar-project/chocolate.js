var Vertical = {
	position: function(it){return it.x},
	size: function(it) { return it.width }
}

var Horizontal = {
	position: function(it){return it.y}, 
	size:function(it) { return it.height }
}

function withinAxe(point, rectangle, axe) {
	return axe.position(point) >= axe.position(rectangle) &&
	axe.position(point) <= axe.position(rectangle) + axe.size(rectangle)
}