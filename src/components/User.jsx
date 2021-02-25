import missing from '../images/placeholder.jpg';

const User = ({ details }) => {
	if (!details) {
		return <h3>Working to fetch users</h3>;
	}

	return (
		<div className='user container'>
			{!details.avatar ? (
				<img className='avatar' src={missing} alt='coming soon' />
			) : (
				<img className='avatar' src={details.avatar} alt={details.last_name} />
			)}

			<h2>
				{details.first_name} {details.last_name}
			</h2>
			<p>
				<span className='bold'>Email:</span>
				<a href={`mailto:${details.email}`}> {details.email}</a>
			</p>
		</div>
	);
};

export default User;
