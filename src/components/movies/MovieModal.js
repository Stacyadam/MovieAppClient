import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { format } from 'date-fns';
import { Dialog, Button } from '@blueprintjs/core';

const ModalContainer = styled.div`
	padding: 20px 20px 0 20px;
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

const MovieModal = ({ isOpen, movie, closeModal }) => {
	const [movieData, updateMovie] = useState({});

	const getMovieData = async () => {
		const { data } = await axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=16c797cea17cb30c3344fef931dc1d4b&query=${movie.name}`
		);

		const movieResult = data.results[0];

		//handle if movie doesn't exit in movie DB
		if (!movieResult) return;

		const releaseDate = format(movieResult.release_date, 'MMMM Do YYYY');

		const updatedMovieData = {
			internetRank: movieResult.vote_average,
			overview: movieResult.overview,
			releaseDate,
			backdropUrl: `http://image.tmdb.org/t/p/w400${movieResult.backdrop_path}`
		};

		updateMovie(updatedMovieData);
	};

	if (!movie) return <div />;

	return (
		<Dialog
			isOpen={isOpen}
			icon="info-sign"
			onClose={() => closeModal()}
			title={movie.name}
			onOpening={getMovieData}
		>
			<ModalContainer>
				<UserTable>
					<tbody>
						<tr>
							<th>User</th>
							{movie.stars && <th>User Stars</th>}
							<th>Internet Rank</th>
						</tr>
						<tr>
							<td>{movie.user && movie.user.email}</td>
							{movie.stars && <td>{movie.stars}</td>}
							<td>{movieData.internetRank}</td>
						</tr>
					</tbody>
				</UserTable>
				<MainContent>
					<iframe
						title="Movie Trailer"
						width="400"
						height="200"
						src={`https://www.youtube.com/embed?&listType=search&list=${movie.name}trailer`}
						frameBorder="0"
						allow="autoplay; encrypted-media"
						allowFullscreen
					/>
					<p>{movieData.overview}</p>
					<h3>Release Date:</h3>
					<p>{movieData.releaseDate}</p>
				</MainContent>
				<ButtonsWrapper>
					<Button intent="none" text="Close" onClick={() => closeModal()} style={{ marginRight: 10 }} />
					<Button
						intent="primary"
						text="IMDB"
						onClick={() => window.open(`https://www.imdb.com/search/title?title=${movie.name}`, '_blank')}
					/>
				</ButtonsWrapper>
			</ModalContainer>
		</Dialog>
	);
};

export default MovieModal;
