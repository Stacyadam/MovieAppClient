import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';

import { Dialog, Button } from '@blueprintjs/core';

const ModalContainer = styled.div`
	padding: 20px 20px 0 20px;
`;

const UserWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

const UserTable = styled.table`
	margin-left: auto;
	margin-right: auto;
	td {
		text-align: center;
	}
	th {
		padding: 0 20px;
	}
`;

const MainContent = styled.div`
	padding: 20px;
	p {
		font-size: 16px;
	}
	iframe {
		display: block;
		margin: 0 auto 20px;
	}
	h3 {
		margin-bottom: 10px;
	}
`;

const ButtonsWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
`;

class MovieModal extends Component {
	state = {
		movie: {}
	};

	render() {
		const { isOpen, movie, closeModal } = this.props;

		return (
			<Dialog
				isOpen={isOpen}
				icon="info-sign"
				onClose={() => closeModal()}
				title={movie.name}
				onOpening={this.getMovieData}
			>
				<ModalContainer>
					<UserTable>
						<tbody>
							<tr>
								<th>User</th>
								<th>User Rank</th>
								<th>Internet Rank</th>
							</tr>
							<tr>
								<td>{movie.email}</td>
								<td>{movie.rank}</td>
								<td>{this.state.movie.internetRank}</td>
							</tr>
						</tbody>
					</UserTable>
					<MainContent>
						<iframe
							width="400"
							height="200"
							src={`https://www.youtube.com/embed?&listType=search&list=${movie.name}trailer`}
							frameborder="0"
							allow="autoplay; encrypted-media"
							allowfullscreen
						/>
						<p>{this.state.movie.overview}</p>
						<h3>Release Date:</h3>
						<p>{this.state.movie.releaseDate}</p>
					</MainContent>
					<ButtonsWrapper>
						<Button intent="none" text="Close" onClick={() => closeModal()} style={{ marginRight: 10 }} />
						<Button intent="primary" text="IMDB" onClick={() => console.log('sdf')} />
					</ButtonsWrapper>
				</ModalContainer>
			</Dialog>
		);
	}

	getMovieData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=16c797cea17cb30c3344fef931dc1d4b&query=${
				this.props.movie.name
			}`
		);

		const movieResult = data.results[0];

		//handle if movie doens't exit in movie DB
		if (!movieResult) return;

		const releaseDate = moment(movieResult.release_date).format('MMMM Do YYYY');

		const movie = {
			internetRank: movieResult.vote_average,
			overview: movieResult.overview,
			releaseDate,
			backdropUrl: `http://image.tmdb.org/t/p/w400${movieResult.backdrop_path}`
		};

		this.setState({ movie });
	};
}

export default MovieModal;
