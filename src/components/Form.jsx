const Form = (props) => {
	const { values, submit, change, disabled, errors } = props;

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

	return (
		<form className='form container' onSubmit={onSubmit}>
			<div className='form-group submit'>
				<h2>Add A User</h2>

				<div className='errors'>
					<div>{errors.first_name}</div>
					<div>{errors.last_name}</div>
					<div>{errors.email}</div>
					<div>{errors.password}</div>
					<div>{errors.tos}</div>
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
				<label>
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
			<button disabled={disabled}>Submit</button>
		</form>
	);
};

export default Form;
