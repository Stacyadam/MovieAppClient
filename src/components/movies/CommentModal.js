import React, { Component } from 'react';
import styled from 'styled-components';

import { Dialog } from '@blueprintjs/core';

const ModalContainer = styled.div`
	padding: 20px 20px 0 20px;
	h2 {
		margin: 0 0 5px;
	}
`;

class RateMovieModal extends Component {
	render() {
		const { isOpen, movie, closeModal } = this.props;

		if (!movie) return <div />;

		return (
			<Dialog isOpen={isOpen} icon="info-sign" onClose={() => closeModal()} title={movie.name}>
				<ModalContainer>
					<h2>Comment</h2>
					<p>{movie.comment}</p>
				</ModalContainer>
			</Dialog>
		);
	}
}

export default RateMovieModal;
