import React, { Component } from 'react';
import styled from 'styled-components';
import SignInMutation from '../mutations/SignInMutation';

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
		showSignUp: false
	};
	render() {
		return (
			<AuthWrapper>
				<a onClick={() => this.setState({ showSignIn: true })}>Sign In</a>
				<a onClick={() => this.setState({ showSignUp: true })}>Sign Up</a>
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
				/>
			</AuthWrapper>
		);
	}
}

export default Auth;
