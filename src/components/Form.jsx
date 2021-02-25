import React from 'react';

const Form = (props) => {
	const { values, submit, change, disabled, errors, resetform } = props;

	// Prevent browser from reloading and call submit function
	const onSubmit = (e) => {
		e.preventDefault();
		submit();
	};

	// Set input fields to what is typed
	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		const valueToUse = type === 'checkbox' ? checked : value;
		change(name, valueToUse);
	};

	const setFormHidden = () => {
		const formContainer = document.querySelector('.add-user');
		formContainer.classList.add('hidden');
		resetform();
	};

	return (
		<>
			<form className='form container' onSubmit={onSubmit}>
				<div className='form-group submit'>
					<h2>Add New User</h2>

					<div className='errors'>
						<div className='alert-first-name'>{errors.first_name}</div>
						<div className='alert-last-name'>{errors.last_name}</div>
						<div className='alert-email'>{errors.email}</div>
						<div className='alert-password'>{errors.password}</div>
						<div className='alert-tos'>{errors.tos}</div>
					</div>
				</div>

				<div className='form-group inputs'>
					<input
						type='text'
						name='first_name'
						value={values.first_name || ''}
						onChange={onChange}
						placeholder='Enter first name'
					/>
					<input
						type='text'
						name='last_name'
						value={values.last_name || ''}
						onChange={onChange}
						placeholder='Enter last name'
					/>
					<input
						type='email'
						name='email'
						value={values.email || ''}
						onChange={onChange}
						placeholder='Enter email'
					/>
					<input
						type='password'
						name='password'
						value={values.password || ''}
						onChange={onChange}
						placeholder='Enter password'
					/>
					<label className='tos'>
						Terms of Service
						<input
							className='check'
							type='checkbox'
							name='tos'
							onChange={onChange}
							checked={values.tos}
						/>
					</label>
				</div>
				<div className='btn-submit'>
					<button disabled={disabled} className='submit'>
						Submit
					</button>
				</div>
			</form>
			<div className='btn-cancel-container'>
				<button className='btn-cancel' onClick={setFormHidden}>
					Cancel
				</button>
			</div>
		</>
	);
};

export default Form;
