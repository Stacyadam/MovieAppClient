import React from 'react';
import { Button } from '@blueprintjs/core';

export default ({ movie }) => {
	return (
		<div style={{ marginLeft: 'auto', marginRight: 'auto', width: '30%' }}>
			<p>{movie.name}</p>
		</div>
	);
};
