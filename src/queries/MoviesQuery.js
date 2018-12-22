import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Movies } from '../components';

export default () => (
	<Query
		query={gql`
			{
				movies {
					name
					rank
					watched
					user {
						email
					}
				}
			}
		`}
	>
		{({ loading, error, data }) => {
			if (loading) return <p>Loading...</p>;
			if (error) return <p>Error :(</p>;

			console.log('data', data.movies);

			return <Movies movies={data.movies} />;
		}}
	</Query>
);
