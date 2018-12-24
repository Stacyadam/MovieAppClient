import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Dialog } from '@blueprintjs/core';
import CreateMovieMutation from '../../mutations/CreateMovieMutation';

const ButtonContainer = styled.div`
	margin-top: 10px;
`;

class AddMovie extends Component {
	state = {
		showModal: false
	};
	render() {
		return (
			<ButtonContainer>
				<Button
					intent="success"
					icon="plus"
					text="Add Movie"
					onClick={() => this.setState({ showModal: true })}
				/>
				<Dialog
					isOpen={this.state.showModal}
					onClose={() => this.setState({ showModal: false })}
					title="Add Movie"
				>
					<CreateMovieMutation onClose={() => this.setState({ showModal: false })} />
				</Dialog>
			</ButtonContainer>
		);
	}
}

export default AddMovie;
