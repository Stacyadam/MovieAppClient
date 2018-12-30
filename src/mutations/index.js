import gql from 'graphql-tag';

export const toggleModal = gql`
	mutation toggleModal {
		toggleModal @client
	}
`;
