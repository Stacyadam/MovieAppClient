import React, { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@blueprintjs/core';
import { Collapse } from 'react-collapse';

const MoviesContainer = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 50%;
`;

const MovieWrapper = styled.div`
	flex-direction: row;
	width: 150px;
	span {
		vertical-align: middle;
	}
	&:hover {
		cursor: pointer;
	}
`;

const MovieHeader = styled.h2`
	text-decoration: underline;
`;

const MoviesTable = styled.table`
	width: 100%;
	th {
		text-align: left;
		padding: 5px;
	}
	td {
		padding: 10px;
	}
`;

const MovieTable = ({ header, children, hasMovies }) => {
	const [show, toggleShow] = useState(true);

	if (!hasMovies) {
		return (
			<MoviesContainer>
				<MovieHeader>{header}</MovieHeader>
				<td>No movies...login/signup to add more movies!</td>
			</MoviesContainer>
		);
	}
	return (
		<MoviesContainer>
			<MovieWrapper>
				<MovieHeader onClick={() => toggleShow(!show)}>
					{header}
					<Icon icon={show ? 'caret-down' : 'caret-up'} />
				</MovieHeader>
			</MovieWrapper>
			<Collapse isOpened={show}>
				<MoviesTable>{children}</MoviesTable>
			</Collapse>
		</MoviesContainer>
	);
};

export default MovieTable;
