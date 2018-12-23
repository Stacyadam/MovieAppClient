import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGN_IN = gql`
	mutation SignIn($email: String!, $password: String!) {
		signIn(email: $email, password: $password) {
			token
		}
	}
`;

const SignInMutation = ({ onClose }) => {
	let email;
	let password;

	return (
		<Mutation mutation={SIGN_IN}>
			{(signIn, { data }) => (
				<div>
					<form
						onSubmit={e => {
							e.preventDefault();
							signIn({ variables: { email: email.value, password: password.value } });
							onClose();
							email.value = '';
							password.value = '';
						}}
					>
						<input
							ref={node => {
								email = node;
							}}
						/>
						<input
							type="password"
							ref={node => {
								password = node;
							}}
						/>
						<button type="submit">Sign In</button>
					</form>
				</div>
			)}
		</Mutation>
	);
};

export default SignInMutation;
