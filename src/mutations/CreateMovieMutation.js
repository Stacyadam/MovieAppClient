import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
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
			user {
				email
			}
		}
	}
`;

class CreateMovieMutation extends Component {
	state = {
		name: '',
		rank: 5
	};

	componentDidMount() {
		this.nameInput.focus();
	}

	render() {
		return (
			<Mutation
				mutation={CREATE_MOVIE}
				//update ui, get access to the cache in the first argument
				//and the response data from the mutation in the 2nd argument
				update={(cache, { data: { createMovie } }) => {
					//get all the movies from the cache based on the original GET_MOVIES Query
					const { movies } = cache.readQuery({ query: GET_MOVIES });
					//write a new query to cache that gets all the movies currently in cache
					cache.writeQuery({
						query: GET_MOVIES,
						//write new data to cache that takes the current movies and adds the one
						//returned from the mutation
						data: { movies: movies.concat([createMovie]) }
					});
				}}
			>
				{(createMovie, { data }) => (
					<CreateMovieWrapper>
						<form onSubmit={e => this.handleSubmit(e, createMovie)}>
							<InputWrapper>
								<Errors>{this.state.errors}</Errors>
								<p>Movie Name</p>
								<input
									ref={nameInput => (this.nameInput = nameInput)}
									placeholder="All Dogs Go to Heaven"
									type="text"
									onChange={e =>
										this.setState({
											name: titleCase(e.target.value)
										})
									}
									value={this.state.name}
								/>
							</InputWrapper>
							<Slider min={1} max={10} onChange={rank => this.setState({ rank: parseInt(rank) })} />
							<ButtonWrapper>
								<button type="submit">Add</button>
							</ButtonWrapper>
						</form>
					</CreateMovieWrapper>
				)}
			</Mutation>
		);
	}

	handleSubmit = async (e, createMovie) => {
		e.preventDefault();
		try {
			await createMovie({
				variables: { name: this.state.name, rank: this.state.rank }
			});
			this.props.onClose();
		} catch (err) {
			const errors = err.graphQLErrors[0].message;
			this.setState({ errors });
		}
	};
}

export default CreateMovieMutation;
