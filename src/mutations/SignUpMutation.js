import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import { decodeJWT } from '../lib';

const SignUpWrapper = styled.div`
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

const SIGN_UP = gql`
	mutation SignUp($email: String!, $password: String!) {
		signUp(email: $email, password: $password) {
			token
		}
	}
`;

class SignUpMutation extends Component {
	state = {
		email: '',
		password: '',
		errors: ''
	};

	render() {
		return (
			<Mutation mutation={SIGN_UP}>
				{(signUp, { client }) => (
					<SignUpWrapper>
						<form
							onSubmit={async e => {
								e.preventDefault();
								try {
									const { data } = await signUp({
										variables: { email: this.state.email, password: this.state.password }
									});
									localStorage.setItem('token', data.signUp.token);
									//TODO: this should work with a resolvers and mutation
									const { email } = decodeJWT();
									client.writeData({ data: { token: email } });
									window.location.reload(false);
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
								<button type="submit">Sign Up</button>
							</ButtonWrapper>
						</form>
					</SignUpWrapper>
				)}
			</Mutation>
		);
	}
}

export default SignUpMutation;
