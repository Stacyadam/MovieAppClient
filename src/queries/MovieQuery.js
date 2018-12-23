import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Movie } from '../components';

const GET_MOVIE = gql`
	query Movie($name: String!) {
		movie(name: $name) {
			name
			rank
			watched
			user {
				email
			}
		}
	}
`;

export default ({ name }) => (
	<Query query={GET_MOVIE} variables={{ name }}>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			return <Movie movie={data.movie} />;
		}}
	</Query>
);
