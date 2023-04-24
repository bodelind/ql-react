import styled from 'styled-components';

const Span = styled.span<{ isError?: boolean }>`
	${({ isError }) => (isError ? 'color: #dc3545' : null)};
	font-size: 12px;
	font-weight: bold;
`;

const TextSpan = ({ isError, label }: { isError?: boolean; label: string }) => {
	return <Span {...{ isError }}>{label}</Span>;
};

export default TextSpan;
