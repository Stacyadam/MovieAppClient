import React, { useState } from 'react';
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

const Slider = ({ min, max, onChange }) => {
	const [value, updateValue] = useState(5);

	const updateInput = e => {
		updateValue(e.target.value);
		onChange(e.target.value);
	};

	return (
		<SliderContainer>
			<p>Wanna See Level</p>
			<SliderWrapper>
				<input type="range" value={value} name="seeLevel" min={min} max={max} onChange={e => updateInput(e)} />
			</SliderWrapper>
			<ValueWrapper>
				<p>{min}</p>{' '}
				<ValueText value={value} max={max}>
					{value}
				</ValueText>{' '}
				<p>{max}</p>
			</ValueWrapper>
		</SliderContainer>
	);
};

export default Slider;
