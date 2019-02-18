import React, { Component } from 'react';
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

class MovieTable extends Component {
	state = {
		show: true
	};

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
				<MovieWrapper>
					<MovieHeader onClick={() => this.setState({ show: !this.state.show })}>
						{header}
						<Icon icon={this.state.show ? 'caret-down' : 'caret-up'} />
					</MovieHeader>
				</MovieWrapper>
				<Collapse isOpened={this.state.show}>
					<MoviesTable>{children}</MoviesTable>
				</Collapse>
			</MoviesContainer>
		);
	}
}

export default MovieTable;
