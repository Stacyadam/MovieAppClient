import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Dialog } from '@blueprintjs/core';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CreateMovieMutation from '../../mutations/CreateMovieMutation';
import Slider from '../Slider';

const ButtonContainer = styled.div`
	margin-top: 10px;
`;

const CHECK_TOKEN = gql`
	{
		token @client
	}
`;

class AddMovie extends Component {
	state = {
		showModal: false
	};

	render() {
		return (
			//This needs to be a mutation with a resolver that updates the client caches token
			<Query query={CHECK_TOKEN}>
				{({ loading, error, data, client }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					if (!data.token) return <div />;

					return (
						<ButtonContainer>
							<Button
								intent="success"
								icon="plus"
								text="Add Movie"
								onClick={() => this.setState({ showModal: true })}
							/>
							<Dialog
								isOpen={this.state.showModal}
								onClose={() => this.setState({ showModal: false })}
								title="Add Movie"
							>
								<CreateMovieMutation onClose={() => this.setState({ showModal: false })} />
							</Dialog>
						</ButtonContainer>
					);
				}}
			</Query>
		);
	}
}

export default AddMovie;
