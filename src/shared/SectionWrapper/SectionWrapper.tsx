import styled from 'styled-components';

const SectionWrapper = styled.div<{ isCardPreview: boolean; height?: string }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	padding: 16px;
	width: 400px;
	${({ isCardPreview }) =>
		isCardPreview ? `background-image: url('./credit-card.jpg')` : 'background-color: white'};
	border-radius: 15px;
	color: ${({ isCardPreview }) => (isCardPreview ? '#fad3ff' : '')};
	box-shadow: #fad3ff 1px 1px 7px 2px;
	${({ height }) => (height ? `height: ${height};` : null)};
`;

export default SectionWrapper;
