import React, { Component } from 'react';
import { Button } from '@blueprintjs/core';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import MovieTable from '../shared/MovieTable';

import MovieModal from './MovieModal';
import CommentModal from './CommentModal';

const GET_MOVIES = gql`
	{
		watchedMovies {
			name
			comment
			stars
			user {
				email
			}
		}
	}
`;

class MovieList extends Component {
	state = {
		showMovieModal: false,
		showCommentModal: false,
		movie: {}
	};

	render() {
		return (
			<Query query={GET_MOVIES}>
				{({ loading, error, data, client }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					return (
						<MovieTable
							header="Watched List"
							titles={['Name', 'Stars', 'User', 'Info', 'Comments']}
							hasMovies={data.watchedMovies.length > 0}
						>
							{data.watchedMovies
								.sort((a, b) => b.stars - a.stars)
								.map((movie, i) => (
									<tr key={i}>
										<td style={{ width: '30%' }}>{movie.name}</td>
										<td>{movie.stars}</td>
										<td>{movie.user.email}</td>
										<td>
											<Button
												intent="primary"
												text="movie info"
												onClick={() => this.setState({ showMovieModal: true, movie })}
											/>
										</td>
										{movie.comment && (
											<td>
												<Button
													intent="danger"
													text="read comment"
													onClick={() => this.setState({ showCommentModal: true, movie })}
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
							<CommentModal
								isOpen={this.state.showCommentModal}
								movie={this.state.movie}
								closeModal={() => this.setState({ showCommentModal: false, movie: null })}
							/>
						</MovieTable>
					);
				}}
			</Query>
		);
	}
}

export default MovieList;
