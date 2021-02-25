/// <reference types="cypress" />

describe('Registered Users App', () => {
	beforeEach(() => {
		cy.visit('http://10.13.72.149:3000');
	});
	it('Sanity check', () => {
		expect(1 + 1).to.equal(2);
	});
});
