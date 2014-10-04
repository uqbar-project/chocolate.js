function ActorRef(actor){
	this._actor = actor;
}

ActorRef.prototype = {
	tell: function(action, arg) {
		var definition = this._actor._definition;
		var mailbox = this._actor.mailbox;
		mailbox.push(function(){
			var handler = definition[action];
			handler && handler.call(definition, arg);
		});
	}
}

function Actor(definition) {
	this._definition = definition;
	this._ref = new ActorRef(this);
}

Actor.prototype = {
	mailbox: [],
	get ref() {
		return this._ref;
	},
	run: function() {
		var mailbox = this.mailbox;
		this.mailbox = [];
		mailbox.forEach(function(it){ it() });
	},
	render: function(canvas) {
		this._definition.render(canvas)
	},
	get bound() {
		return this._definition.bound
	}
}