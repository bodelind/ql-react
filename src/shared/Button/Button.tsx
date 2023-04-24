import styled from 'styled-components';

const StyledButton = styled.button`
	padding: 8px 16px;
	background-color: #4cbb17;
	font-weight: bold;
	border-radius: 15px;
	text-align: center;
`;

const Button = ({ label, onClick }: { label: string; onClick: () => void }) => {
	return <StyledButton {...{ onClick }}>{label}</StyledButton>;
};

export default Button;
