function ActorRef(actor) {
	this._actor = actor;
}

ActorRef.prototype = {
	tell: function(action, arg) {
		var behaviour = this._actor._behaviour;
		var value = this._actor.value;
		var self = this;
		var mailbox = this._actor.mailbox;
		mailbox.push(function(){
			var handler = behaviour[action];
			handler && handler(self, value, arg)
		});
	},

//TODO move out from here
	become: function(newBehaviour) {
		this._actor._behaviour = newBehaviour
	},
	createActor: function(definition){
		this._actor.system.createActor(definition);
	},
	destroy: function() {
		this._actor.system.destroyActor(this._actor);
	}

}

function Actor(definition) {
	this.value = Object.create(definition.value);
	this._behaviour = definition.behaviour;
	this._render = definition.render;
	this._bound = definition.bound;
	this.ref = new ActorRef(this);
}

Actor.prototype = {
	mailbox: [],
	run: function() {
		var mailbox = this.mailbox;
		this.mailbox = [];
		mailbox.forEach(function(it){ it() });
	},
	render: function(canvas) {
		this._render(this.value, this.bound, canvas)
	},
	get bound() {
		return this._bound(this.value)
	}
}