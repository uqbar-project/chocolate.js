var time;
function schedule(loop, period) {
	(function _schedule(){
		requestAnimationFrame(function() {
			var now = new Date().getTime();
			var dt = now - (time || now);
			time = now;

			_schedule();
			
			loop(dt / 1000)
		});     
	})();
}

function Game(period, canvas, objects) {
	this.period = period;
	this.canvas = canvas;
	this.objects = objects;
	this.canvas.onMouseDown(this.onMouseDown.bind(this));
	this.canvas.onKeyPress(this.onKeyPress.bind(this));
}

Game.prototype = {
	actors: [],
	get refs() {
		return this.actors.map(function(actor){
			return actor.ref
		})
	},
	createActor: function(definition){
		var actor = new Actor(definition);
		actor.system = this;
		this.actors.push(actor);
	},
	dispatch: function(action, _this){
		this.refs.forEach(action, _this);
	},
	exec: function(action, _this) {
		this.actors.forEach(action, _this);
	},
	onMouseDown: function(e) {
		var point = new Point(e.pageX, e.pageY) 
		this.exec(function(actor){
			if(point.within(actor.bound)) {
				actor.ref.tell('mouseDown', point);
			}	
		})
	},
	onKeyPress: function(e) {
		this.dispatch(function(ref){
			ref.tell('keyPress', e.keyCode)
		})
	},
	updateTime: function(t) {
		this.dispatch(function(ref) {
			ref.tell('update', t);
		});
	}, 
	updateCollisions: function() {
		this.exec(function(actor){
			var collisions = actor.collisions || [];
			actor.collisions = [];
			this.exec(function(actor2) {
				if(actor !== actor2) {
					if(actor.bound.collides(actor2.bound)) {
						if(collisions.indexOf(actor2) === -1) {
							actor.ref.tell('collide', actor2.ref);
						}
						actor.collisions.push(actor2)
					} else if(collisions.indexOf(actor2) !== -1) {
						actor.ref.tell('uncollide', actor2.ref);
					}
				}
			})
		}, this);
	},
	update: function(t) {
		this.updateCollisions();
		this.updateTime(t);

		this.exec(function(actor){ 
			actor.run();
		});
		this.dispatch(function(ref){
			ref.tell('resume');
		})
	},
	render: function() {
		this.canvas.clear();
		this.exec(function(actor){
			actor.render(this.canvas);
		}, this)
	}, 
	loop: function (t) {
		this.update(t);
		this.render();
	},
	run: function() {
		schedule(this.loop.bind(this), this.period)
	}
}