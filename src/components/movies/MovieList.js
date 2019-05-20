import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import { Button, Icon } from '@blueprintjs/core';
import { sortBy } from '../../lib';

import MovieModal from './MovieModal';
import RankMovieModal from './RankMovieModal';
import RateMovieModal from './RateMovieModal';
import MovieTable from '../shared/MovieTable';

const GET_MOVIES = gql`
	{
		movies {
			name
			rank
			rankedBy
			user {
				id
				email
			}
		}
		user @client
	}
`;

const MovieList = () => {
	const [movieModal, showMovieModal] = useState(false);
	const [rankModal, showRankModal] = useState(false);
	const [ratingModal, showRatingModal] = useState(false);
	const [movie, updateMovie] = useState({});
	const [sort, updateSort] = useState({ type: 'rank', desc: true });
	const { loading, error, data } = useQuery(GET_MOVIES);

	const showModal = (modal = () => {}, movie = () => {}) => {
		modal();
		movie();
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<MovieTable header="Watch List" hasMovies={data.movies.length > 0}>
			<th onClick={() => updateSort({ type: 'name', desc: !sort.desc })}>
				Name <Icon icon={!sort.desc && sort.type === 'name' ? 'caret-up' : 'caret-down'} />
			</th>
			<th onClick={() => updateSort({ type: 'rank', desc: !sort.desc })}>
				Rank <Icon icon={!sort.desc && sort.type === 'rank' ? 'caret-up' : 'caret-down'} />
			</th>
			<th onClick={() => updateSort({ type: 'user', desc: !sortBy.desc })}>
				User <Icon icon={!sort.desc && sort.type === 'user' ? 'caret-up' : 'caret-down'} />
			</th>
			<th>Info</th>
			{data.user && <th>Rank</th>}
			{data.user && <th>Rate</th>}
			{data.movies
				.sort((a, b) => sortBy(a, b, sort))
				.map((movie, i) => (
					<tr key={i}>
						<td style={{ width: '30%', textTransform: 'capitalize' }}>{movie.name}</td>
						<td>{movie.rank}</td>
						<td>{movie.user.email}</td>
						<td>
							<Button
								intent="primary"
								text="movie info"
								onClick={() => showModal(showMovieModal(true), updateMovie(movie))}
							/>
						</td>
						{data.user && (
							<td>
								<Button
									intent="warning"
									text="rank movie"
									onClick={() => showModal(showRankModal(true), updateMovie(movie))}
								/>
							</td>
						)}
						{data.user && (
							<td>
								<Button
									intent="danger"
									text="rate movie"
									onClick={() => showModal(showRatingModal(true), updateMovie(movie))}
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
			<RankMovieModal
				isOpen={rankModal}
				movie={movie}
				closeModal={() => showModal(showRankModal(false), updateMovie(null))}
			/>
			<RateMovieModal
				isOpen={ratingModal}
				movie={movie}
				closeModal={() => showModal(showRatingModal(false), updateMovie(null))}
			/>
		</MovieTable>
	);
};

export default MovieList;
