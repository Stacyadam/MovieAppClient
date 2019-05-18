import React, { useState } from 'react';
import { Button } from '@blueprintjs/core';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
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

const WatchedMovieList = () => {
	const [movieModal, showMovieModal] = useState(false);
	const [commentModal, showCommentModal] = useState(false);
	const [movie, updateMovie] = useState({});
	const { loading, error, data } = useQuery(GET_MOVIES);

	const headers = ['Name', 'Stars', 'User', 'Info', 'Comments'];

	const showModal = (modal = () => {}, movie = () => {}) => {
		modal();
		movie();
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<MovieTable header="Watched List" hasMovies={!!data.watchedMovies.length}>
			{headers.map(title => (
				<th key={title}>{title}</th>
			))}
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
								onClick={() => showModal(showMovieModal(true), updateMovie(movie))}
							/>
						</td>
						{movie.comment && (
							<td>
								<Button
									intent="danger"
									text="read comment"
									onClick={() => showModal(showCommentModal(true), updateMovie(movie))}
								/>
							</td>
						)}
					</tr>
				))}
			<MovieModal
				isOpen={movieModal}
				movie={movie}
				closeModal={() => showModal(showMovieModal(false), updateMovie(null))}
			/>
			<CommentModal
				isOpen={commentModal}
				movie={movie}
				closeModal={() => showModal(showCommentModal(false), updateMovie(null))}
			/>
		</MovieTable>
	);
};

export default WatchedMovieList;
