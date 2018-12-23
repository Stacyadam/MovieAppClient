import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import styled from 'styled-components';

import MovieModal from './MovieModal';

const MoviesContainer = styled.div`
	margin-left: auto;
	margin-right: auto;
	width: 40%;
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	p {
		text-decoration: underline;
	}
`;

const MoviesWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin: 20px 0;
`;

class Movies extends Component {
	state = {
		showModal: false,
		movie: {}
	};

	render() {
		const { movies } = this.props;

		return (
			<MoviesContainer>
				<Header>
					<p>Name</p>
					<p>Rank</p>
					<p>User</p>
					<p>Info</p>
					<p>Rate</p>
				</Header>
				{movies.map(({ name, rank, user }, i) => (
					<MoviesWrapper key={i}>
						<p>{name}</p>
						<p>{rank}</p>
						<p>{user.email}</p>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Button
								intent="success"
								text="movie info"
								onClick={() => this.showMovieModal({ name, rank, email: user.email })}
							/>
						</div>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Button
								intent="danger"
								text="rate movie"
								onClick={event => {
									console.log('event', event.currentTarget);
								}}
							/>
						</div>
					</MoviesWrapper>
				))}
				<MovieModal
					isOpen={this.state.showModal}
					movie={this.state.movie}
					closeModal={() => this.setState({ showModal: false })}
				/>
			</MoviesContainer>
		);
	}

	showMovieModal = movie => {
		this.setState({ showModal: !this.state.showModal, movie });
	};
}

export default Movies;
