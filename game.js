var time;
function schedule(loop) {
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

function tellCollisions(actor, actor2) {
	if(actor.bound.collides(actor2.bound)) {
		if(!actor.collisions.included(actor2)) {
			actor.ref.tell('collide', actor2.ref);
		}
		actor.collisions.push(actor2)
	} else if(actor.collisions.included(actor2)) {
		actor.ref.tell('uncollide', actor2.ref);
	}
}

function tellVisibility(actor, canvasBound) {
	if(actor.bound.collides(canvasBound)) {
		if(!actor.visible) {
			actor.ref.tell('show');
		}
		actor.visible = true;
	} else {
		if(actor.visible) {
			actor.ref.tell('hide');
		}
		actor.visible = false;
	}
}

function Game(canvas) {
	this.canvas = canvas;
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
		actor.collisions = new VersionedQueue();
		actor.visible = false;
		actor.system = this;
		this.actors.push(actor);
	},
	destroyActor: function(actor) {
		//TODO
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
	updateResume: function(){
		this.dispatch(function(ref){
			ref.tell('resume');
		});
	},
	updateTime: function(t) {
		this.dispatch(function(ref) {
			ref.tell('update', t);
		});
	}, 
	updateCollisions: function() {
		this.exec(function(actor) {
			actor.collisions.clear();
			this.actors.filter(function(a) { 
				return a !== actor 
			}).forEach(function(actor2) {
				tellCollisions(actor, actor2)
			})
		}, this);
	},
	updateVisibility: function() {
		this.exec(function(actor) {
			tellVisibility(actor, this.canvas.bound)
		}, this);
	},
	update: function(t) {
		this.updateCollisions();
		this.updateTime(t);
		this.updateVisibility();

		this.exec(function(actor){ 
			actor.run();
		});
		this.updateResume();

		this.render();
	},
	render: function() {
		this.canvas.clear();
		this.actors.filter(function(actor){
			return actor.visible
		}).forEach(function(actor){
			actor.render(this.canvas)
		}, this)
	}, 
	loop: function (t) {
		this.update(t);
		this.render();
	},
	run: function() {
		schedule(this.loop.bind(this))
	}
}