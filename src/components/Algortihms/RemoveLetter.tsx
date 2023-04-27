import styled from 'styled-components';
import InputField from '../../shared/InputField/InputField';
import SectionWrapper from '../../shared/SectionWrapper/SectionWrapper';
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

const RemoveLetter = () => {
	const [input, setInput] = useState('');
	const [functionResult, setFunctionResult] = useState('');

	const removeLetters = (text: string): string => {
		let tempArr: string[] = [];
		let response: string[] = [];
		for (let i = 0; i < text.length; i++) {
			let currentLetter = text[i];
			if (i === text.length - 1) {
				// last character in string requires special treatment
				if (tempArr.length && tempArr[tempArr.length - 1] === currentLetter) {
					tempArr.push(currentLetter);
				}
				if (tempArr.length === 4) {
					tempArr.pop();
				}
				response.push(...tempArr);

				if (!tempArr.length || (tempArr.length && tempArr[tempArr.length - 1] !== currentLetter)) {
					response.push(currentLetter);
				}
			} else {
				// not last character
				if (!tempArr.length || tempArr[tempArr.length - 1] === currentLetter) {
					tempArr.push(currentLetter);
				} else {
					if (tempArr.length === 4) {
						tempArr.pop();
					}
					response.push(...tempArr);
					tempArr = [currentLetter];
				}
			}
		}
		return response.join('');
	};

	const onInputChange = (value: string) => {
		setInput(value);
	};

	const onCheckItClick = () => {
		const result = removeLetters(input);
		setFunctionResult(result);
	};

	return (
		<SectionWrapper {...{ isCardPreview: false }}>
			<Header>Remove letters</Header>
			<TextSpan
				{...{
					label: 'Function checks a string and if there are 4 consecutive identical letters it removes one letter',
				}}
			/>
			<InputField
				{...{
					type: 'text',
					value: input,
					onChange: (e: ChangeEvent<HTMLInputElement>) => onInputChange(e.target.value),
					name: 'textAlgorithm',
					label: 'Enter text',
				}}
			/>
			<Button {...{ label: 'Check it!', onClick: onCheckItClick }} />
			<ResultText>{functionResult}</ResultText>
		</SectionWrapper>
	);
};

export default RemoveLetter;
