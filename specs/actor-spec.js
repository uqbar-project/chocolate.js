var expect = chai.expect;

describe('Actor', function() {
 	var def = {
 		bound: {x: 0, y: 0, width: 10, height: 10}
 	}
 	var actor;

 	before(function(){
 		actor = new Actor(def);
 	})

 	describe('mailbox', function(){
 		it('is initially empty', function(){
 			expect(actor.mailbox).to.be.empty
 		})
 	})

	describe('run', function() {
		it('removes messages from mailbox', function(){
			actor.mailbox.push(function(){});

			actor.run();

			expect(actor.mailbox).to.be.empty
		})
	})

	describe('bound', function(){
		it('answers bound as in definition', function(){
			expect(actor.bound).to.equal(def.bound)
		})
	})

	describe('ActorRef', function(){
		describe('tell', function(){
			it('adds messages to mailbox', function(){
				actor.ref.tell('foo');
				actor.ref.tell('bar');

				expect(actor.mailbox.length).to.be.equal(2)
			})

			it('run does not fail when telling unknown messages to actor ', function(){
				actor.ref.tell('foo')

				actor.run()
			})
		})
	})
})


