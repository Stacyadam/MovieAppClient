import React from 'react';
import styled from 'styled-components';
import Auth from './Auth';
import AddMovie from '../components/movies/AddMovie';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

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

const PremiumText = styled.p`
	margin-top: 10px;
	color: red;
`;

const CHECK_USER_ROLE = gql`
	{
		userRole @client
	}
`;

export default () => {
	return (
		<Query query={CHECK_USER_ROLE}>
			{({ data }) => {
				return (
					<Header>
						<HeaderText>Movies App</HeaderText>
						<Auth />
						{data.userRole === 'admin' ? (
							<AddMovie />
						) : (
							<PremiumText>
								Only premium members can add movies. Join now for only $300 a month.
							</PremiumText>
						)}
					</Header>
				);
			}}
		</Query>
	);
};
