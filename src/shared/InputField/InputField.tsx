import { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';
import TextSpan from '../TextSpan/TextSpan';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const Input = styled.input<{ isError: boolean }>`
	margin-top: 2px;
	border-radius: 5px;
	border: ${({ isError }) => (isError ? 'solid #dc3545 1px' : 'solid #0031a5 1px')};
	height: 30px;
	padding: 4px;
	padding-left: 10px;
	font-weight: bold;
	&:focus {
		outline: none;
		border: 1px solid #fad3ff;
	}
	::-webkit-inner-spin-button,
	-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

const InputField = ({
	errorText,
	type,
	value,
	placeholder,
	onChange,
	onKeyDown,
	name,
	label,
	maxLength,
}: {
	errorText?: string | null;
	type: string;
	value?: string;
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
	name: string;
	label: string;
	maxLength?: number;
}) => {
	return (
		<Wrapper>
			<TextSpan {...{ label }} />
			<Input
				{...{ value, type, placeholder, onChange, name, isError: !!errorText, maxLength, onKeyDown }}
			/>
			{errorText && <TextSpan {...{ isError: true, label: errorText }} />}
		</Wrapper>
	);
};
export default InputField;
