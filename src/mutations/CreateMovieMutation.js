import React, { useState, useRef, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import Slider from '../components/Slider';
import { titleCase } from '../lib';

const CreateMovieWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
`;

const InputWrapper = styled.div`
	input {
		margin-bottom: 10px;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Errors = styled.p`
	color: red;
`;

const CREATE_MOVIE = gql`
	mutation CreateMovie($name: String!, $rank: Int!) {
		createMovie(name: $name, rank: $rank) {
			name
			rank
			rankedBy
			user {
				email
			}
		}
	}
`;

const GET_MOVIES = gql`
	{
		movies {
			name
			rank
			rankedBy
			user {
				email
			}
		}
	}
`;

const CreateMovieMutation = ({ onClose }) => {
	const [name, updateName] = useState('');
	const [rank, updateRank] = useState(5);
	const [errors, updateErrors] = useState(null);
	const nameInput = useRef();

	const createMovie = useMutation(CREATE_MOVIE, {
		variables: {
			name,
			rank
		},
		update: (cache, mutationResult) => {
			const { createMovie } = mutationResult.data;
			const { movies } = cache.readQuery({ query: GET_MOVIES });
			cache.writeQuery({
				query: GET_MOVIES,
				data: { movies: movies.concat([createMovie]) }
			});
		}
	});

	useEffect(() => {
		nameInput.current.focus();
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await createMovie();
			onClose();
		} catch (err) {
			const errorMessage = err.graphQLErrors[0].message;
			updateErrors(errorMessage);
		}
	};

	return (
		<CreateMovieWrapper>
			<form onSubmit={e => handleSubmit(e)}>
				<InputWrapper>
					<Errors>{errors}</Errors>
					<p>Movie Name</p>
					<input
						ref={nameInput}
						placeholder="All Dogs Go to Heaven"
						type="text"
						onChange={e => updateName(titleCase(e.target.value))}
						value={name}
					/>
				</InputWrapper>
				<Slider min={1} max={10} onChange={rank => updateRank(parseInt(rank))} />
				<ButtonWrapper>
					<button type="submit">Add</button>
				</ButtonWrapper>
			</form>
		</CreateMovieWrapper>
	);
};

export default CreateMovieMutation;
