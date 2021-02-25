import { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import formSchema from './validation/formSchema';

import './App.css';

import Form from './components/Form';
import User from './components/User';

// Set Empty form values on page load
const initialFormvalues = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	tos: false,
};

// Set empty yup error values
const initialFormErrors = {
	first_name: '',
	last_name: '',
	email: '',
	password: '',
	tos: '',
};

// Initial state
const initialUsers = [];
const initialSubmitDisabled = true;

function App() {
	// Set components' state
	const [users, setUsers] = useState(initialUsers);
	const [formValues, setFormValues] = useState(initialFormvalues);
	const [formErrors, setFormErrors] = useState(initialFormErrors);
	const [disabled, setDisabled] = useState(initialSubmitDisabled);

	const hidden = document.querySelector('.add-user');

	// GET user from database
	const getUsers = () => {
		axios
			.get('https://reqres.in/api/users?page=1')
			.then((res) => {
				// Assign response to state
				setUsers(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// POST form data to database after validation
	const postNewUser = (newUser) => {
		axios
			.post('https://reqres.in/api/users', newUser)
			.then((res) => {
				setUsers([res.data, ...users]);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
		setFormValues(initialFormvalues);
		hidden.classList.add('hidden');
	};

	// Call function to get users from database
	useEffect(() => {
		getUsers();
	}, []);

	// Enable submit button after verifying that form values agree with formSchema
	// Verify everytime form value is updated
	useEffect(() => {
		formSchema.isValid(formValues).then((valid) => setDisabled(!valid));
	}, [formValues]);

	// Set form input value to typed values after validating with yup
	const inputChange = (name, value) => {
		yup
			.reach(formSchema, name)
			.validate(value)
			.then(() => {
				setFormErrors({ ...formErrors, [name]: '' });
			})
			.catch((err) => {
				setFormErrors({ ...formErrors, [name]: err.errors[0] });
			});
		setFormValues({ ...formValues, [name]: value });
	};

	const showForm = () => {
		hidden.classList.remove('hidden');
	};

	// Use form values to pass a new user to postNewUser()
	const formSubmit = () => {
		const newUser = {
			first_name: formValues.first_name.trim(),
			last_name: formValues.last_name.trim(),
			email: formValues.email.trim(),
			password: formValues.password,
			tos: formValues.tos,
		};

		postNewUser(newUser);
	};

	const resetForm = () => {
		setFormValues(initialFormvalues);
	};

	return (
		<div className='App'>
			<h1>Registered Users</h1>
			<button className='btn-add-user' onClick={showForm}>
				ADD NEW USER
			</button>
			<div className='add-user hidden'>
				<Form
					values={formValues}
					change={inputChange}
					submit={formSubmit}
					disabled={disabled}
					errors={formErrors}
					resetform={resetForm}
				/>
			</div>
			<div></div>
			<div className='flex'>
				{users.map((user) => {
					return <User key={user.id} details={user} />;
				})}
			</div>
		</div>
	);
}

export default App;
