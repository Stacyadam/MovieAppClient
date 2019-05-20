import React, { useState } from 'react';
import styled from 'styled-components';
import ReactStars from 'react-stars';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

import { Dialog } from '@blueprintjs/core';

const ModalContainer = styled.form`
	padding: 20px 20px 0 20px;
	button {
		margin-left: auto;
	}
`;

const StarsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 20px;
	h2 {
		margin: 0 20px 0 0;
	}
`;

const CommentTextArea = styled.textarea`
	width: 100%;
	height: 150px;
`;

const RATE_MOVIE = gql`
	mutation RateMovie($name: String!, $stars: Float!, $comment: String) {
		rateMovie(name: $name, stars: $stars, comment: $comment) {
			name
			stars
			comment
			user {
				email
			}
		}
	}
`;

const ALL_MOVIES = gql`
	{
		movies {
			name
			rank
			user {
				email
			}
		}
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

const RateMovieModal = ({ isOpen, movie, closeModal }) => {
	const [stars, updateStars] = useState(0);
	const [comment, updateComment] = useState('');
	const [error, updateErrors] = useState(null);

	const closeAndResetStars = () => {
		updateStars(null);
		closeModal();
	};

	const rateMovie = useMutation(RATE_MOVIE, {
		update: (cache, mutationResult) => {
			const { watchedMovies, movies } = cache.readQuery({ query: ALL_MOVIES });
			const { rateMovie } = mutationResult.data;

			cache.writeQuery({
				query: ALL_MOVIES,
				data: {
					movies: movies.filter(movie => movie.name !== rateMovie.name),
					watchedMovies: watchedMovies.concat([rateMovie])
				}
			});
		}
	});

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await rateMovie({
				variables: {
					stars,
					comment,
					name: movie.name
				}
			});
			closeModal();
		} catch (err) {
			const errors = err.graphQLErrors[0].message;
			updateErrors(errors);
		}
	};

	if (!movie) return <div />;

	return (
		<Dialog isOpen={isOpen} icon="info-sign" onClose={closeAndResetStars} title={movie.name}>
			<ModalContainer onSubmit={e => handleSubmit(e)}>
				<StarsWrapper>
					<h2>Stars</h2>
					<ReactStars
						value={stars}
						count={10}
						onChange={stars => updateStars(stars)}
						size={24}
						color2={'#ffd700'}
					/>
				</StarsWrapper>
				<h2>Comment</h2>
				<CommentTextArea
					placeholder="Add a comment. (optional)"
					value={comment}
					onChange={e => updateComment(e.target.value)}
				/>
				<button type="submit">Rate</button>
			</ModalContainer>
		</Dialog>
	);
};

export default RateMovieModal;
