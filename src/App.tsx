import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import CreditCard from './components/CreditCard/CreditCard';
import RemoveLetter from './components/Algortihms/RemoveLetter';
import LargestOddSum from './components/Algortihms/LargestOddSum';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 16px;
	align-items: center;
`;

const ComponentsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4rem;
`;

const Header = styled.h2`
	font-size: 40px;
	margin-top: 0;
	background: rgb(150, 250, 157);
	background: linear-gradient(90deg, rgba(150, 250, 157, 1) 0%, rgba(250, 211, 255, 1) 100%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const AlgorithmsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 24px;
`;

const App = () => {
	return (
		<Wrapper>
			<GlobalStyles />
			<Header>Queens lab evaluation assignment</Header>
			<ComponentsWrapper>
				<CreditCard />
				<AlgorithmsWrapper>
					<RemoveLetter />
					<LargestOddSum />
				</AlgorithmsWrapper>
			</ComponentsWrapper>
		</Wrapper>
	);
};

export default App;
