function Composite(parts) {
	this.parts = parts;
};

Composite.prototype = {
	collides: function(other) {
		return this.parts.some(function(part){
			return part.collides(other);
		})
	},

	toString: function() {
		return 'C[' + this.parts.join() +']'
	}
};	