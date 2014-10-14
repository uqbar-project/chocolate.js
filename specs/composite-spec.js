var expect = chai.expect;

describe('composite', function(){
	var composite;

	before(function(){
		composite = new Composite([
			new Rectangle(0, 0, 10, 10),
			new Rectangle(10, 0, 10, 10)]) ;
	})

	describe('collides', function(){
		it('with itself', function(){
			expect(composite.collides(composite)).to.be.true
		})
		it('with a inner rectangle', function(){
			expect(composite.collides(new Rectangle(0, 0, 10, 10))).to.be.true
		})
		it('is symmetric', function(){
			expect(new Rectangle(0, 0, 10, 10).collides(composite)).to.be.true
		})
		it('with a close rectangle', function(){
			expect(composite.collides(new Rectangle(5, 5, 10, 10))).to.be.true
		})
		it('not with remote rectangles', function(){
			expect(composite.collides(new Rectangle(40, 20, 10, 10))).to.be.false
		})
	})

})