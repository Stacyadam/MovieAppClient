import React, { Component } from 'react';
import styled from 'styled-components';
import SignInMutation from '../mutations/SignInMutation';
import SignUpMutation from '../mutations/SignUpMutation';
import { Query } from 'react-apollo';
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

const CHECK_TOKEN = gql`
	{
		token @client
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
			<Query query={CHECK_TOKEN}>
				{({ loading, error, data, client }) => {
					if (loading) return <p>Loading...</p>;
					if (error) return <p>Error :(</p>;

					if (data.token) {
						return <div>{data.token}</div>;
					}
					return (
						<AuthWrapper>
							{!this.state.email ? (
								<div>
									<a onClick={() => this.setState({ showSignInModal: true })}>Sign In</a>
									<a onClick={() => this.setState({ showSignUpModal: true })}>Sign Up</a>
								</div>
							) : (
								this.state.email
							)}
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

// class Auth extends Component {
// 	state = {
// 		showSignIn: false,
// 		showSignUp: false,
// 		email: null
// 	};

// 	componentDidUpdate() {
// 		const jwt = decodeJWT();
// 		if (jwt && !this.state.email) {
// 			const { email } = jwt;
// 			this.setState({ email });
// 		}
// 	}

// 	render() {
// 		//TODO The UI isn't updating after logging in

// 		return (
// 			<AuthWrapper>
// 				{!this.state.email ? (
// 					<div>
// 						<a onClick={() => this.setState({ showSignIn: true })}>Sign In</a>
// 						<a onClick={() => this.setState({ showSignUp: true })}>Sign Up</a>
// 					</div>
// 				) : (
// 					this.state.email
// 				)}
// 				<Dialog
// 					isOpen={this.state.showSignIn}
// 					onClose={() => this.setState({ showSignIn: false })}
// 					title="Sign In"
// 				>
// 					<SignInMutation onClose={() => this.setState({ showSignIn: false })} />
// 				</Dialog>
// 				<Dialog
// 					isOpen={this.state.showSignUp}
// 					onClose={() => this.setState({ showSignUp: false })}
// 					title="Sign Up"
// 				>
// 					<SignUpMutation onClose={() => this.setState({ showSignIn: false })} />
// 				</Dialog>
// 			</AuthWrapper>
// 		);
// 	}
// }

export default Auth;
