var expect = chai.expect;

describe('rectangle', function(){
	describe('collides', function(){
		it('collides with itself', function(){
			var rectangle = new Rectangle(0, 0, 10, 10);
			expect(rectangle.collides(rectangle)).to.be.true
		})
		it('does not collide with remote rectangles', function(){
			var rectangle = new Rectangle(0, 0, 10, 10);
			expect(rectangle.collides(new Rectangle(20, 20, 10, 10))).to.be.false
		})
	})

})