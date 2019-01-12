import React, { Component } from 'react';
import styled from 'styled-components';

const MoviesContainer = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 50%;
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

class MovieTable extends Component {
	render() {
		const { header, children, hasMovies } = this.props;

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
				<MovieHeader>{header}</MovieHeader>
				<MoviesTable>{children}</MoviesTable>
			</MoviesContainer>
		);
	}
}

export default MovieTable;
