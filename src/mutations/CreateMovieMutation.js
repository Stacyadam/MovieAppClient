import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';

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
		rank: null
	};

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
						<form
							onSubmit={async e => {
								e.preventDefault();
								try {
									await createMovie({
										variables: { name: this.state.name, rank: 4 }
									});
									this.props.onClose();
								} catch (err) {
									const errors = err.graphQLErrors[0].message;
									this.setState({ errors });
								}
							}}
						>
							<InputWrapper>
								<Errors>{this.state.errors}</Errors>
								<p>Movie Name</p>
								<input
									placeholder="All Dogs go to Heaven"
									type="text"
									onChange={e => this.setState({ name: e.target.value })}
									value={this.state.name}
								/>
							</InputWrapper>
							<ButtonWrapper>
								<button type="submit">Add</button>
							</ButtonWrapper>
						</form>
					</CreateMovieWrapper>
				)}
			</Mutation>
		);
	}
}

export default CreateMovieMutation;
