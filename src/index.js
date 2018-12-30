import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { resolvers } from './resolvers';

import Movies from './components/movies/Movies';
import { Header } from './components';
import { decodeJWT } from './lib';
//import { defaults, resolvers } from './resolvers';

const httpLink = createHttpLink({
	uri: 'https://movies-app666.herokuapp.com/graphql'
});

let token = localStorage.getItem('token');

const authLink = setContext((_, { headers }) => {
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	};
});

const cache = new InMemoryCache();

//TODO: token needs to be reactive in some way but updating with a resolver on initial page load.
const stateLink = withClientState({
	defaults: {
		token: token ? decodeJWT().email : null
	},
	resolvers,
	cache
});

const client = new ApolloClient({
	cache,
	link: ApolloLink.from([stateLink, authLink.concat(httpLink)])
});

const App = () => (
	<ApolloProvider client={client}>
		<div>
			<Header />
			<Movies />
		</div>
	</ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
