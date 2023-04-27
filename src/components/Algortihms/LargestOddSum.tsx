import styled from 'styled-components';
import SectionWrapper from '../../shared/SectionWrapper/SectionWrapper';
import InputField from '../../shared/InputField/InputField';
import { ChangeEvent, useEffect, useState } from 'react';
import Button from '../../shared/Button/Button';
import TextSpan from '../../shared/TextSpan/TextSpan';

const Header = styled.h3`
	margin: 0;
`;

const ResultText = styled.span`
	font-weight: bold;
	word-break: break-all;
`;

const LargestOddSum = () => {
	const [input, setInput] = useState<number[]>([]);
	const [functionResult, setFunctionResult] = useState('');

	const findLargestSum = (array: number[]): number => {
		array.sort((a, b) => b - a);

		let largestOdd = 0;
		let largestEven = 0;

		for (let i = 0; i < array.length; i++) {
			const num = array[i];

			if (num % 2 !== 0 && num > largestOdd) {
				largestOdd = num;
			} else if (num % 2 === 0 && num > largestEven) {
				largestEven = num;
			}
			if (largestEven > 0 && largestOdd > 0) {
				break;
			}
		}

		return largestOdd + largestEven;
	};

	const onInputChange = (value: string) => {
		setInput(value.split(',').map(Number));
	};

	const onCheckItClick = () => {
		const result = findLargestSum(input);
		setFunctionResult(result.toString());
	};

	return (
		<SectionWrapper {...{ isCardPreview: false }}>
			<Header>Largest odd sum</Header>
			<TextSpan
				{...{
					label: 'Function checks an array of numbers and return the maximum odd sum of two numbers',
				}}
			/>
			<InputField
				{...{
					type: 'text',
					onChange: (e: ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value),
					name: 'textAlgorithm',
					label: 'Enter some numbers separated by comma (,)',
				}}
			/>
			<Button {...{ label: 'Check it!', onClick: onCheckItClick }} />
			<ResultText>{functionResult || 0}</ResultText>
		</SectionWrapper>
	);
};

export default LargestOddSum;
