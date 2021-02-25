import React from 'react';
import missing from '../images/placeholder.jpg';

const User = ({ details }) => {
	if (!details) {
		return <h3>Working to fetch users</h3>;
	}

	return (
		<div id={details.first_name + details.last_name} className='user container'>
			{!details.avatar ? (
				<img className='avatar' src={missing} alt='coming soon' />
			) : (
				<img className='avatar' src={details.avatar} alt={details.last_name} />
			)}

			<h2 className='user-name'>
				{details.first_name} {details.last_name}
			</h2>
			<p className='user-info'>
				<span className='bold'>Email:</span>
				<a className='user-email-link' href={`mailto:${details.email}`}>
					{' '}
					{details.email}
				</a>
			</p>
		</div>
	);
};

export default User;
