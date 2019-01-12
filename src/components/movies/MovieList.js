import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button } from '@blueprintjs/core';

import MovieModal from './MovieModal';
import RateMovieModal from './RateMovieModal';

import MovieTable from '../shared/MovieTable';

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

const CHECK_USER = gql`
	{
		user @client
	}
`;

class MovieList extends Component {
	state = {
		showMovieModal: false,
		showRatingModal: false,
		movie: {}
	};

	render() {
		return (
			<Query query={GET_MOVIES}>
				{({ loading, error, data, client }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					const { user } = client.cache.readQuery({ query: CHECK_USER });

					return (
						<MovieTable
							header="Watch List"
							titles={['Name', 'Rank', 'User', 'Info', user && 'Rate']}
							hasMovies={data.movies.length > 0}
						>
							{data.movies
								.sort((a, b) => b.rank - a.rank)
								.map((movie, i) => (
									<tr key={i}>
										<td style={{ width: '30%' }}>{movie.name}</td>
										<td>{movie.rank}</td>
										<td>{movie.user.email}</td>
										<td>
											<Button
												intent="primary"
												text="movie info"
												onClick={() => this.setState({ showMovieModal: true, movie })}
											/>
										</td>
										{user && user === movie.user.email && (
											<td>
												<Button
													intent="danger"
													text="rate movie"
													onClick={() => this.setState({ showRatingModal: true, movie })}
												/>
											</td>
										)}
									</tr>
								))}
							<MovieModal
								isOpen={this.state.showMovieModal}
								movie={this.state.movie}
								closeModal={() => this.setState({ showMovieModal: false, movie: null })}
							/>
							<RateMovieModal
								isOpen={this.state.showRatingModal}
								movie={this.state.movie}
								closeModal={() => this.setState({ showRatingModal: false, movie: null })}
							/>
						</MovieTable>
					);
				}}
			</Query>
		);
	}
}

export default MovieList;
