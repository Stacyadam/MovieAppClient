import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import MovieList from './components/movies/MovieList';
import WatchedMovieList from './components/movies/WatchedMovieList';
import { Header } from './components';
import { resolvers } from './resolvers';
import { decodeJWT } from './lib';

//TODO: token needs to be reactive in some way but updating with a resolver on initial page load.
const token = localStorage.getItem('token');
console.log('this is token', token);

const client = new ApolloClient({
	uri: 'https://movies-app666.herokuapp.com/graphql',
	request: operation => {
		const token = localStorage.getItem('token');
		operation.setContext(context => {
			return {
				...context.headers,
				headers: {
					authorization: token ? `Bearer ${token}` : ''
				}
			};
		});
	},
	clientState: {
		defaults: {
			user: token ? decodeJWT(token).email : null,
			userRole: token ? decodeJWT(token).role : null
		},
		resolvers
	}
});

const App = () => (
	<ApolloProvider client={client}>
		<div>
			<Header />
			<MovieList />
			<WatchedMovieList />
		</div>
	</ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
