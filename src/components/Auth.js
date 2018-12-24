import React, { Component } from 'react';
import styled from 'styled-components';
import SignInMutation from '../mutations/SignInMutation';
import SignUpMutation from '../mutations/SignUpMutation';
import jwt from 'jsonwebtoken';

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

class Auth extends Component {
	state = {
		showSignIn: false,
		showSignUp: false,
		email: null
	};

	componentDidMount() {
		this.decodeJWT();
	}

	render() {
		//TODO The UI isn't updating after logging in
		return (
			<AuthWrapper>
				{this.state.email || (
					<div>
						<a onClick={() => this.setState({ showSignIn: true })}>Sign In</a>
						<a onClick={() => this.setState({ showSignUp: true })}>Sign Up</a>
					</div>
				)}
				<Dialog
					isOpen={this.state.showSignIn}
					onClose={() => this.setState({ showSignIn: false })}
					title="Sign In"
				>
					<SignInMutation onClose={() => this.setState({ showSignIn: false })} />
				</Dialog>
				<Dialog
					isOpen={this.state.showSignUp}
					onClose={() => this.setState({ showSignUp: false })}
					title="Sign Up"
				>
					<SignUpMutation onClose={() => this.setState({ showSignIn: false })} />
				</Dialog>
			</AuthWrapper>
		);
	}

	decodeJWT = () => {
		const token = localStorage.getItem('token');

		if (!token) return;
		const { email } = jwt.decode(token);
		this.setState({ email });
	};
}

export default Auth;
