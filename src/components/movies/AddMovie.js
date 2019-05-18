import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Dialog } from '@blueprintjs/core';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import CreateMovieMutation from '../../mutations/CreateMovieMutation';

const ButtonContainer = styled.div`
	margin-top: 10px;
`;

const CHECK_USER = gql`
	{
		user @client
	}
`;

const AddMovie = () => {
	const [modal, showModal] = useState(false);
	const { loading, error, data } = useQuery(CHECK_USER);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	if (!data.user) return <div />;

	return (
		<ButtonContainer>
			<Button intent="success" icon="plus" text="Add Movie" onClick={() => showModal(true)} />
			<Dialog isOpen={modal} onClose={() => showModal(false)} title="Add Movie">
				<CreateMovieMutation onClose={() => showModal(false)} />
			</Dialog>
		</ButtonContainer>
	);
};

export default AddMovie;
