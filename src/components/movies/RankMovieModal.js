import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from '../Slider';
import gql from 'graphql-tag';
import { useMutation, useQuery } from 'react-apollo-hooks';

import { Dialog } from '@blueprintjs/core';

const ModalContainer = styled.form`
	padding: 20px 20px 0 20px;
	button {
		margin-left: auto;
	}
`;

const RANK_MOVIE = gql`
	mutation RankMovie($name: String!, $rank: Int!) {
		rankMovie(name: $name, rank: $rank) {
			name
			rank
			user {
				email
			}
		}
	}
`;

const GET_USER = gql`
	{
		userId @client
	}
`;

const GET_MOVIES = gql`
	{
		movies {
			name
			rank
			rankedBy {
				id
			}
			user {
				email
			}
		}
	}
`;

const RankMovieModal = ({ isOpen, movie, closeModal }) => {
	const [rank, updateRank] = useState(5);
	const { data } = useQuery(GET_USER);
	const rankMovie = useMutation(RANK_MOVIE, {
		update: (cache, mutationResult) => {
			const { movies } = cache.readQuery({ query: GET_MOVIES });
			const { rankMovie } = mutationResult.data;

			cache.writeQuery({
				query: GET_MOVIES,
				data: {
					movies: movies.map(x => (x.name === rankMovie.name ? rankMovie : x))
				}
			});
		}
	});

	const [error, updateErrors] = useState(null);

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await rankMovie({
				variables: {
					name: movie.name,
					rank
				}
			});
			closeModal();
		} catch (err) {
			const errors = err.graphQLErrors[0].message;
			updateErrors(errors);
		}
	};

	console.log('THIS IS MOVIE USER', movie, 'THIS IS ME', data.userId);
	if (!movie) return <div />;

	return (
		<Dialog isOpen={isOpen} icon="info-sign" onClose={() => closeModal()} title={movie.name}>
			<ModalContainer onSubmit={e => handleSubmit(e)}>
				<Slider min={1} max={10} startRank={rank} onChange={rank => updateRank(parseInt(rank))} />
				<button type="submit">Rank</button>
			</ModalContainer>
		</Dialog>
	);
};

export default RankMovieModal;
