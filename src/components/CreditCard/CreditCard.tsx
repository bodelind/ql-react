import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICreditCardInfo } from '../../models/ICreditCardInfo';
import dayjs from 'dayjs';
import { validateCardNumber } from './Validation';

const Wrapper = styled.div`
	display: flex;
	gap: 24px;
`;

const SectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8px;
	padding: 8px;
	width: 400px;
	background-image: url('./credit-card.jpg');
	border-radius: 15px;
	color: #fad3ff;
	box-shadow: #fad3ff 1px 1px 7px 2px;
`;

const Header = styled.h3`
	margin: 0;
`;

const initialCreditCardInfo: ICreditCardInfo = {
	cardHolder: '',
	cardNumber: '',
	expirationMonth: null,
	expirationYear: null,
	cvc: '',
};

const CreditCard = () => {
	const [cardInfo, setCardInfo] = useState(initialCreditCardInfo);
	const [cardType, setCardType] = useState('Credit card');
	const yearOptions: number[] = Array.from({ length: 12 }, (_, i) => i + dayjs().year());

	useEffect(() => {
		if (!cardInfo.cardNumber) return;
		setCardType(validateCardNumber(cardInfo.cardNumber));
	}, [cardInfo.cardNumber]);

	const onCreditInfoChange = (value: string | number, name: string) => {
		setCardInfo({ ...cardInfo, ...{ [name]: value } });
	};

	const onCvcChange = (value: string) => {
		if (cardInfo.cvc.length > 2) return;
		setCardInfo({ ...cardInfo, ...{ cvc: value } });
	};

	return (
		<Wrapper>
			<SectionWrapper>
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

				<p>Expiration date</p>
				<select
					value={cardInfo.expirationMonth || ''}
					onChange={(e) => onCreditInfoChange(e.target.value, 'expirationMonth')}>
					<option value="" disabled hidden>
						Month
					</option>
					{Array.from({ length: 12 }, (_, i) => i + 1).map((month, index) => (
						<option key={index} value={month}>
							{month}
						</option>
					))}
				</select>
				<select
					value={cardInfo.expirationYear || ''}
					onChange={(e) => onCreditInfoChange(e.target.value, 'expirationYear')}>
					<option value="" disabled hidden>
						Year
					</option>
					{yearOptions.map((year, index) => (
						<option key={index} value={year}>
							{year}
						</option>
					))}
				</select>

				<input
					type="text"
					name="cvc"
					autoComplete="off"
					placeholder="CVC"
					value={cardInfo.cvc}
					onChange={(e) => onCvcChange(e.target.value)}
				/>
			</SectionWrapper>
			<SectionWrapper>
				<Header>{cardType}</Header>
				<p>{cardInfo.cardNumber}</p>
			</SectionWrapper>
		</Wrapper>
	);
};

export default CreditCard;
