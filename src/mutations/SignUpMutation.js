import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';
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

const SignUpMutation = () => {
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

	const signUp = useMutation(SIGN_UP, {
		variables: {
			email: form.email,
			password: form.password
		},
		update: (cache, mutationResult) => {
			const { signUp } = mutationResult.data;
			localStorage.setItem('token', signUp.token);
			const { email } = decodeJWT();
			cache.writeData({ data: { token: email } });
		}
	});

	const handleSubmit = async e => {
		e.preventDefault();
		try {
			await signUp();
			window.location.reload(false);
		} catch (err) {
			const errorsMessage = err.graphQLErrors[0].message;
			updateErrors(errorsMessage);
		}
	};

	return (
		<SignUpWrapper>
			<form onSubmit={e => handleSubmit(e)}>
				<InputWrapper>
					<Errors>{errors}</Errors>
					<p>Email</p>
					<input
						placeholder="jon@gmail.com"
						type="text"
						name="email"
						onChange={e => updateInput(e)}
						value={form.email}
					/>
					<p>Password</p>
					<input type="password" name="password" onChange={e => updateInput(e)} value={form.password} />
				</InputWrapper>
				<ButtonWrapper>
					<button type="submit">Sign Up</button>
				</ButtonWrapper>
			</form>
		</SignUpWrapper>
	);
};

export default SignUpMutation;
