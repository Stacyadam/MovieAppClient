import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

const GET_MOVIES = gql`
	{
		movies {
			name
			rank
			user {
				email
			}
		}
	}
`;

class Movies extends Component {
	state = {
		showModal: false,
		movie: {}
	};

	render() {
		return (
			<Query query={GET_MOVIES}>
				{({ loading, error, data, client }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					const sortedMovies = data.movies.sort((a, b) => b.rank - a.rank);

					return (
						<MoviesContainer>
							<Header>
								<p>Name</p>
								<p>Rank</p>
								<p>User</p>
								<p>Info</p>
								<p>Rate</p>
							</Header>
							{sortedMovies.map((movie, i) => (
								<MoviesWrapper key={i}>
									<p>{movie.name}</p>
									<p>{movie.rank}</p>
									<p>{movie.user.email}</p>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<Button
											intent="primary"
											text="movie info"
											onClick={() => this.setState({ showModal: true, movie })}
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
								closeModal={() => this.setState({ showModal: false, movie: null })}
							/>
						</MoviesContainer>
					);
				}}
			</Query>
		);
	}
}

// class Movies extends Component {
// 	state = {
// 		showModal: false,
// 		movie: {}
// 	};

// 	render() {
// 		const { movies } = this.props;
// 	}

// 	showMovieModal = movie => {
// 		this.setState({ showModal: !this.state.showModal, movie });
// 	};
// }

export default Movies;
