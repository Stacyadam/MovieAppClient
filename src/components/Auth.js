import React, { useState } from 'react';
import styled from 'styled-components';
import SignInMutation from '../mutations/SignInMutation';
import SignUpMutation from '../mutations/SignUpMutation';
import { useQuery, useMutation } from 'react-apollo-hooks';
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

const Auth = () => {
	const [signInModal, showSignInModal] = useState(false);
	const [signUpModal, showSignUpModal] = useState(false);
	const { data, error, loading } = useQuery(CHECK_USER);
	const logout = useMutation(REMOVE_TOKEN);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	if (data.user) {
		return (
			<div>
				<div>{data.user}</div>
				<LogoutButton onClick={logout}>Sign Out</LogoutButton>
			</div>
		);
	}

	return (
		<AuthWrapper>
			<div>
				<a onClick={() => showSignInModal(true)}>Sign In</a>
				<a onClick={() => showSignUpModal(true)}>Sign Up</a>
			</div>
			<Dialog isOpen={signInModal} onClose={() => showSignInModal(false)} title="Sign In">
				<SignInMutation onClose={() => showSignInModal(false)} />
			</Dialog>
			<Dialog isOpen={signUpModal} onClose={() => showSignUpModal(false)} title="Sign Up">
				<SignUpMutation onClose={() => showSignUpModal(false)} />
			</Dialog>
		</AuthWrapper>
	);
};

export default Auth;
