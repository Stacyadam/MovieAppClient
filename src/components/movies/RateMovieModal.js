import React, { Component } from 'react';
import styled from 'styled-components';
import ReactStars from 'react-stars';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

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

const MOVIES = gql`
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

const WATCHED_MOVIES = gql`
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

class RateMovieModal extends Component {
	state = {
		stars: null,
		comment: ''
	};

	render() {
		const { isOpen, movie, closeModal } = this.props;

		if (!movie) return <div />;

		return (
			<Dialog isOpen={isOpen} icon="info-sign" onClose={() => closeModal()} title={movie.name}>
				<Mutation
					mutation={RATE_MOVIE}
					update={(cache, { data: { rateMovie } }) => {
						//const { movies } = cache.readQuery({ query: MOVIES });
						const { watchedMovies } = cache.readQuery({ query: WATCHED_MOVIES });
						const { movies } = cache.readQuery({ query: MOVIES });
						cache.writeQuery({
							query: MOVIES,
							data: { movies: movies.filter(movie => movie.name !== rateMovie.name) }
						});

						cache.writeQuery({
							query: WATCHED_MOVIES,
							data: { watchedMovies: watchedMovies.concat([rateMovie]) }
						});
					}}
				>
					{(rateMovie, { data }) => (
						<ModalContainer onSubmit={e => this.handleSubmit(e, rateMovie)}>
							<StarsWrapper>
								<h2>Stars</h2>
								<ReactStars
									value={this.state.stars}
									count={10}
									onChange={stars => this.setState({ stars })}
									size={24}
									color2={'#ffd700'}
								/>
							</StarsWrapper>
							<h2>Comment</h2>
							<CommentTextArea
								placeholder="Add a comment. (optional)"
								value={this.state.comment}
								onChange={e => this.setState({ comment: e.target.value })}
							/>
							<button type="submit">Rate</button>
						</ModalContainer>
					)}
				</Mutation>
			</Dialog>
		);
	}

	handleSubmit = async (e, rateMovie) => {
		e.preventDefault();
		console.log('this is comment', this.state.comment);

		try {
			await rateMovie({
				variables: { name: this.props.movie.name, stars: this.state.stars, comment: this.state.comment }
			});
			this.props.closeModal();
		} catch (err) {
			const errors = err.graphQLErrors[0].message;
			this.setState({ errors });
		}
	};
}

export default RateMovieModal;
