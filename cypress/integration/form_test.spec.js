/// <reference types="cypress" />

describe('Registered Users App', () => {
	// beforeEach(() => {
	// 	cy.visit('http://10.13.72.149:3000');
	// });

	it('successfully loads', () => {
		cy.visit('http://10.13.72.149:3000');
	});

	it('Sanity check', () => {
		expect(1 + 1).to.equal(2);
	});

	const addNewUserBtn = () => cy.get('button.btn-add-user');
	const userContainer = () => cy.get('.user.container');
	const userAvatar = () => cy.get('.avatar');
	const userH2 = () => cy.get('.user-name');
	const userEmail = () => cy.get('a.user-email-link');
	const firstNameInput = () => cy.get('input[name=first_name]');
	const lastNameInput = () => cy.get('input[name=last_name]');
	const emailInput = () => cy.get('input[name=email]');
	const passwordInput = () => cy.get('input[name=password]');
	const checkbox = () => cy.get('input[type=checkbox]');
	const submitBtn = () => cy.get('button[class=submit]');
	const cancelBtn = () => cy.get('button[class=btn-cancel]');
	const firstNameAlert = () => cy.get('div[class=alert-first-name]');
	const lastNameAlert = () => cy.get('div[class=alert-last-name]');
	const emailAlert = () => cy.get('div[class=alert-email]');
	const passwordAlert = () => cy.get('div[class=alert-password]');
	const tosAlert = () => cy.get('div[class=alert-tos]');

	it('the correct elements are showing on page load', () => {
		addNewUserBtn().should('exist');
		userContainer().should('exist');
		userAvatar().should('exist');
		userH2().should('exist');
		userEmail().should('exist');
	});

	it('open form', () => {
		cy.contains('ADD NEW USER').click();
		firstNameInput().should('exist');
		lastNameInput().should('exist');
		emailInput().should('exist');
		passwordInput().should('exist');
		cy.get('label.tos').should('exist').should('have.text', 'Terms of Service');
		checkbox().should('exist').should('not.be.checked');
		submitBtn().should('exist').should('be.disabled');
		cancelBtn().should('exist');
	});

	describe('form validation tests', () => {
		it('form input validation tests', () => {
			firstNameInput().type('C{backspace}');
			firstNameAlert().should(
				'have.text',
				'First Name is required, please fill out.'
			);
			submitBtn().should('be.disabled');
			lastNameInput().type('C{backspace}');
			lastNameAlert().should(
				'have.text',
				'Last Name is required, please fill out.'
			);
			lastNameInput().clear();
			submitBtn().should('be.disabled');
			emailInput().type('chris.com');
			emailAlert().should('have.text', 'Must be a valid email address');
			emailInput().clear();
			submitBtn().should('be.disabled');
			passwordInput().type('12345');
			passwordAlert().should(
				'have.text',
				'Password must be at leaset 6 characters'
			);
			passwordInput().clear();
			submitBtn().should('be.disabled');
			checkbox().click().click();
			tosAlert().should('have.text', 'You must accept the Terms of Service');
			submitBtn().should('be.disabled');
		});
	});

	describe('form submit test', () => {
		it('form submit tests', () => {
			firstNameInput().type('John').should('have.value', 'John');
			lastNameInput().type('Smith').should('have.value', 'Smith');
			emailInput()
				.type('john@smith.com')
				.should('have.value', 'john@smith.com');
			passwordInput().type('123456').should('have.value', '123456');
			checkbox().click();
			submitBtn().should('be.enabled');
			submitBtn().click();
			cy.get('.add-user.hidden').should('exist');
			cy.get('#JohnSmith').should('exist');
		});
	});

	describe('form cancel button', () => {
		it('cancel button clears and closes form', () => {
			cy.contains('ADD NEW USER').click();
			firstNameInput().type('John');
			lastNameInput().type('Smith');
			emailInput().type('john@smith.com');
			passwordInput().type('123456');
			checkbox().click();
			cancelBtn().click();
			cy.contains('ADD NEW USER').click();
			firstNameInput().should('have.value', '');
			lastNameInput().should('have.value', '');
			emailInput().should('have.value', '');
			passwordInput().should('have.value', '');
			checkbox().should('not.be.checked');
			cancelBtn().click();
		});
	});
});
