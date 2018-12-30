import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { decodeJWT } from '../lib';

const SignInWrapper = styled.div`
	display: flex;
	justify-content: center;
	padding: 20px;
`;

const InputWrapper = styled.div`
	input {
		margin-bottom: 10px;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Errors = styled.p`
	color: red;
`;

const SIGN_IN = gql`
	mutation SignIn($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			token
		}
	}
`;

class SignInMutation extends Component {
	state = {
		email: '',
		password: '',
		errors: ''
	};

	render() {
		return (
			<Mutation mutation={SIGN_IN}>
				{(signIn, { client }) => (
					<SignInWrapper>
						<form
							onSubmit={async e => {
								e.preventDefault();
								try {
									const { data } = await signIn({
										variables: { email: this.state.email, password: this.state.password }
									});
									localStorage.setItem('token', data.signIn.token);
									//TODO: this should work with a resolvers and mutation
									const { email } = decodeJWT();
									client.writeData({ data: { token: email } });
									this.props.onClose();
								} catch (err) {
									const errors = err.graphQLErrors[0].message;
									this.setState({ errors });
								}
							}}
						>
							<InputWrapper>
								<Errors>{this.state.errors}</Errors>
								<p>Email</p>
								<input
									placeholder="test@test.coms"
									type="text"
									onChange={e => this.setState({ email: e.target.value })}
									value={this.state.email}
								/>
								<p>Password</p>
								<input
									type="password"
									onChange={e => this.setState({ password: e.target.value })}
									value={this.state.password}
								/>
							</InputWrapper>
							<ButtonWrapper>
								<button type="submit">Sign In</button>
							</ButtonWrapper>
						</form>
					</SignInWrapper>
				)}
			</Mutation>
		);
	}
}

export default SignInMutation;
