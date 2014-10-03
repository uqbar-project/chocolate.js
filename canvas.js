function Canvas(id) {
	this.innerCanvas = document.getElementById(id);
	this.context = this.innerCanvas.getContext('2d');
}
Canvas.prototype = {
	onMouseDown: function(callback) {
		this.innerCanvas.addEventListener('mousedown', callback, false);
	},
	drawRectangle: function(myRectangle, color) {
		this.context.beginPath();
		this.context.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
		this.context.fillStyle =  color || '#8ED6FF';
		this.context.fill();
		this.context.lineWidth = myRectangle.borderWidth;
		this.context.strokeStyle = 'black';
		this.context.stroke();
	}, 
	clear: function(){
		this.context.clearRect(0, 0, this.innerCanvas.width, this.innerCanvas.height)
	}
}