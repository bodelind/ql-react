import { useState } from 'react';
import styled from 'styled-components';
import { ICreditCardInfo } from '../../models/ICreditCardInfo';

const Wrapper = styled.div`
	displa: flex;
	flex-direction: column;
	padding: 8px;
	width: 500px;
	background-color: #fad3ff;
`;

const Header = styled.h3`
	margin: 0;
`;

const initialCreditCardInfo: ICreditCardInfo = {
	cardHolder: '',
	cardNumber: null,
	expirationMonth: null,
	expirationYear: null,
	cvc: null,
};

const CreditCard = () => {
	const [cardInfo, setCardInfo] = useState(initialCreditCardInfo);

	const onCreditInfoChange = (value: string | number, name: string) => {
		setCardInfo({ ...cardInfo, ...{ [name]: value } });
	};

	return (
		<Wrapper>
			<Header>Credit card</Header>
			<input
				type="number"
				name="cardNumber"
				placeholder="Card number"
				value={cardInfo.cardNumber || ''}
				onChange={(e) => onCreditInfoChange(e.target.value, 'cardNumber')}
			/>
			<input
				type="text"
				name="cardHolder"
				placeholder="Card holder"
				value={cardInfo.cardHolder}
				onChange={(e) => onCreditInfoChange(e.target.value, 'cardHolder')}
			/>
		</Wrapper>
	);
};

export default CreditCard;
