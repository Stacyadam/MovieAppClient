import React from 'react';

export default ({ movie }) => {
	return (
		<div style={{ marginLeft: 'auto', marginRight: 'auto', width: '30%' }}>
			<p>{movie.name}</p>
		</div>
	);
};
