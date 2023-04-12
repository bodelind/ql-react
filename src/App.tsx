import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import CreditCard from './components/CreditCard/CreditCard';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;
	align-items: center;
`;

const Header = styled.h2`
	color: red;
`;

const App = () => {
	return (
		<Wrapper>
			<GlobalStyles />
			<Header>Queens lab over all</Header>
			<CreditCard />
		</Wrapper>
	);
};

export default App;
