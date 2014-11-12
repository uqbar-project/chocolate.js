function SlowTime(period){
	this.elapsedTime = 0;
	this.period = period;
}

SlowTime.prototype = {
	elapse: function(dt) {
		this.elapsedTime += dt;
	},
	tick: function(dt, action) {
		this.elapse(dt);
		if(this.elapsedTime >= this.period) {
			action(this.period);
			this.elapsedTime = 0;
		}
	}
}