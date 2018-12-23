import React from 'react';
import styled from 'styled-components';
import Auth from './Auth';
import SignInMutation from '../mutations/SignInMutation';

const Header = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 40px 0;
`;

const HeaderText = styled.p`
	font-size: 30px;
	font-weight: bold;
`;

export default () => {
	return (
		<Header>
			<HeaderText>Movies App</HeaderText>
			<Auth />
		</Header>
	);
};
