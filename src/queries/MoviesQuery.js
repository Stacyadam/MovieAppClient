import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Movies } from '../components';

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

export default () => (
	<Query query={GET_MOVIES}>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			return <Movies movies={data.movies} />;
		}}
	</Query>
);
