import * as yup from 'yup';

const formSchema = yup.object().shape({
	first_name: yup
		.string()
		.trim()
		.required('First Name is required, please fill out.')
		.min(2, 'First name must be at least 2 characters long'),
	last_name: yup
		.string()
		.trim()
		.required('Last Name is required, please fill out.')
		.min(2, 'Last name must be at least 2 characters long'),
	email: yup
		.string()
		.email('Must be a valid email address')
		.required('Email is required'),
	password: yup
		.string()
		.required('Please enter a password')
		.min(6, 'Password must be at leaset 6 characters'),
	tos: yup
		.boolean()
		.oneOf([true], 'You must accept the Terms of Service')
		.required('You must accept the Terms of Service'),
});

export default formSchema;
