import React, { Component } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Icon } from '@blueprintjs/core';

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

const MovieHeader = styled.h2`
	text-decoration: underline;
`;

class MovieList extends Component {
	state = {
		showMovieModal: false,
		showRatingModal: false,
		movie: {},
		sortBy: {
			type: 'name',
			desc: true
		}
	};

	render() {
		const { sortBy } = this.state;
		return (
			<Query query={GET_MOVIES}>
				{({ loading, error, data, client }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					const { user } = client.cache.readQuery({ query: CHECK_USER });

					return (
						<MovieTable header="Watch List" hasMovies={data.movies.length > 0}>
							<th onClick={() => this.setState({ sortBy: { type: 'name', desc: !sortBy.desc } })}>
								Name <Icon icon={!sortBy.desc && sortBy.type === 'name' ? 'caret-up' : 'caret-down'} />
							</th>
							<th onClick={() => this.setState({ sortBy: { type: 'rank', desc: !sortBy.desc } })}>
								Rank <Icon icon={!sortBy.desc && sortBy.type === 'rank' ? 'caret-up' : 'caret-down'} />
							</th>
							<th onClick={() => this.setState({ sortBy: { type: 'user', desc: !sortBy.desc } })}>
								User <Icon icon={!sortBy.desc && sortBy.type === 'user' ? 'caret-up' : 'caret-down'} />
							</th>
							<th>Info</th>
							<th>Rate</th>
							{data.movies
								.sort((a, b) => this.sortBy(a, b))
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

	sortBy = (a, b) => {
		switch (this.state.sortBy.type) {
			case 'rank':
				if (this.state.sortBy.desc) {
					return b.rank - a.rank;
				} else {
					return a.rank - b.rank;
				}
			case 'name':
				if (this.state.sortBy.desc) {
					const nameA = a.name.toUpperCase();
					const nameB = b.name.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				} else {
					const nameA = a.name.toUpperCase();
					const nameB = b.name.toUpperCase();
					if (nameA > nameB) {
						return -1;
					}
					if (nameA < nameB) {
						return 1;
					}
					return 0;
				}
			case 'user':
				if (this.state.sortBy.desc) {
					const nameA = a.user.email.toUpperCase();
					const nameB = b.user.email.toUpperCase();
					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				} else {
					const nameA = a.user.email.toUpperCase();
					const nameB = b.user.email.toUpperCase();
					if (nameA > nameB) {
						return -1;
					}
					if (nameA < nameB) {
						return 1;
					}
					return 0;
				}
			default:
				break;
		}
	};
}

export default MovieList;
