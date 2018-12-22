import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { MoviesQuery } from './queries';

const client = new ApolloClient({
	uri: 'https://movies-app666.herokuapp.com/graphql'
});

const App = () => (
	<ApolloProvider client={client}>
		<div>
			<MoviesQuery />
		</div>
	</ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
