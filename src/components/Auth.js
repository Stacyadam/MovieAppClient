import React, { Component } from 'react';
import styled from 'styled-components';
import SignInMutation from '../mutations/SignInMutation';
import SignUpMutation from '../mutations/SignUpMutation';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { Dialog } from '@blueprintjs/core';

const AuthWrapper = styled.div`
	display: flex;
	flex-direction: row;
	a {
		text-decoration: underline;
		&:first-child {
			margin-right: 10px;
		}
	}
`;

const LogoutButton = styled.button`
	display: block;
	margin: 6px auto 0;
`;

const CHECK_USER = gql`
	{
		user @client
	}
`;

const REMOVE_TOKEN = gql`
	mutation {
		logout @client
	}
`;

class Auth extends Component {
	state = {
		showSignInModal: false,
		showSignUpModal: false
	};

	render() {
		return (
			//TODO: this needs to be a mutation that has a resolver that updates client cache
			<Query query={CHECK_USER}>
				{({ loading, error, data, client }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					if (data.user) {
						return (
							<div>
								<div>{data.user}</div>
								<Mutation mutation={REMOVE_TOKEN}>
									{logout => <LogoutButton onClick={logout}>Sign Out</LogoutButton>}
								</Mutation>
							</div>
						);
					}

					return (
						<AuthWrapper>
							<div>
								<a onClick={() => this.setState({ showSignInModal: true })}>Sign In</a>
								<a onClick={() => this.setState({ showSignUpModal: true })}>Sign Up</a>
							</div>
							<Dialog
								isOpen={this.state.showSignInModal}
								onClose={() => this.setState({ showSignInModal: false })}
								title="Sign In"
							>
								<SignInMutation onClose={() => this.setState({ showSignInModal: false })} />
							</Dialog>
							<Dialog
								isOpen={this.state.showSignUpModal}
								onClose={() => this.setState({ showSignUpModal: false })}
								title="Sign Up"
							>
								<SignUpMutation onClose={() => this.setState({ showSignUpModal: false })} />
							</Dialog>
						</AuthWrapper>
					);
				}}
			</Query>
		);
	}
}

export default Auth;
