import React from 'react';

export default ({ movies }) => {
	return (
		<div style={{ marginLeft: 'auto', marginRight: 'auto', width: '30%' }}>
			{movies.map(({ name, watched, rank, user }, i) => (
				<div
					key={i}
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'space-between'
					}}
				>
					<p>{name}</p>
					<p>{watched}</p>
					<p>{rank}</p>
					<p>{user.email}</p>
				</div>
			))}
		</div>
	);
};
