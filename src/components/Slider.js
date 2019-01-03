import React, { Component } from 'react';
import styled from 'styled-components';
const SliderContainer = styled.div`
	margin-bottom: 10px;
`;

const SliderWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const ValueWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const ValueText = styled.p`
	color: ${props => (props.value > props.max / 2 - 1 ? 'green' : 'red')};
`;

class Slider extends Component {
	state = {
		value: 5
	};

	render() {
		const { min, max } = this.props;
		return (
			<SliderContainer>
				<p>Wanna See Level</p>
				<SliderWrapper>
					<input
						type="range"
						value={this.state.value}
						name="seeLevel"
						min={min}
						max={max}
						onChange={e => this.updateInput(e)}
					/>
				</SliderWrapper>
				<ValueWrapper>
					<p>{min}</p>{' '}
					<ValueText value={this.state.value} max={max}>
						{this.state.value}
					</ValueText>{' '}
					<p>{max}</p>
				</ValueWrapper>
			</SliderContainer>
		);
	}

	// _renderValues = () => {
	// 	const { max } = this.props;
	// 	const arr = [];
	// 	for (let i = 1; i < max + 1; i++) {
	// 		arr.push(i);
	// 	}
	// 	return arr.map(i => <p>{i}</p>);
	// };

	updateInput = e => {
		const { onChange } = this.props;
		this.setState({ value: e.target.value });
		onChange(e.target.value);
	};
}

export default Slider;
