//Object for sending messages to an actor
function ActorRef(actor) {
	this._actor = actor;
}

ActorRef.prototype = {
	tell: function(action, arg) {
		var behaviour = this._actor._behaviour;
		var context = this._actor._context;
		var value = this._actor.value;
		this._actor.mailbox.push(function(){
			var handler = behaviour[action];
			handler && handler(context, value, arg);
		});
	}
}

//Object for altering the actor system
function ActorContext(actor){
	this._actor = actor;
}

ActorContext.prototype = {
	become: function(newBehaviour) {
		this._actor._behaviour = newBehaviour
	},
	createActor: function(definition){
		this._actor.system.createActor(definition);
	},
	destroy: function() {
		this._actor.system.destroyActor(this._actor);
	},
	get self() {
		return this._actor.ref;
	},
}


function Actor(definition) {
	function defaultInit() { return {} }

	this.value = (definition.init || defaultInit)();
	this._behaviour = definition.behaviour || {};

	validateExists(definition.appearance.render, "appearance.render");
	validateExists(definition.appearance.bound, "appearance.bound");

	this._appearance =  definition.appearance;

	this._context = new ActorContext(this);
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
		this._appearance.render(this.value, this.bound, canvas)
	},
	get bound() {
		return this._appearance.bound(this.value)
	}
}