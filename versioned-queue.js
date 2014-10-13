function VersionedQueue() {
	this.previous = []
	this.current = []
}

VersionedQueue.prototype = {
	push: function(e) {
		this.current.push(e);
	},
	clear: function() {
		this.previous = this.current;
		this.current = [];
	},
	included: function(e) {
		return this.previous.indexOf(e) >= 0;
	}
}