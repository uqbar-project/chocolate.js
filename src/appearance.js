function rectangular(baseRectangle) {
	return function(value) {
		return new Rectangle(
			value.x || baseRectangle.x,
			value.y || baseRectangle.y,
			value.width || baseRectangle.width,
			value.height || baseRectangle.height);
	}
}


