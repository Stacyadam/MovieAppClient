import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
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

const SignInMutation = () => {
	const [form, setValues] = useState({
		email: '',
		password: ''
	});
	const [errors, updateErrors] = useState('');

	const updateInput = e => {
		setValues({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const signIn = useMutation(SIGN_IN, {
		variables: { email: form.email, password: form.password },
		update: (cache, mutationResult) => {
			const { signIn } = mutationResult.data;
			localStorage.setItem('token', signIn.token);
			const { email } = decodeJWT();
			cache.writeData({ data: { user: email } });
		}
	});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await signIn();
			window.location.reload(false);
		} catch (err) {
			const errorsMsg = err.graphQLErrors[0].message;
			updateErrors(errorsMsg);
		}
	};

	return (
		<SignInWrapper>
			<form onSubmit={e => handleSubmit(e)}>
				<InputWrapper>
					<Errors>{errors}</Errors>
					<p>Email</p>
					<input
						name="email"
						placeholder="jon@gmail.com"
						type="text"
						onChange={e => updateInput(e)}
						value={form.email}
					/>
					<p>Password</p>
					<input name="password" type="password" onChange={e => updateInput(e)} value={form.password} />
				</InputWrapper>
				<ButtonWrapper>
					<button type="submit">Sign In</button>
				</ButtonWrapper>
			</form>
		</SignInWrapper>
	);
};

export default SignInMutation;
