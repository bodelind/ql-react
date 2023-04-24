import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICreditCardInfo } from '../../models/ICreditCardInfo';
import dayjs from 'dayjs';
import { validateCardNumber, validateCreditCardInfo } from './Validation';
import InputField from '../../shared/InputField/InputField';
import TextSpan from '../../shared/TextSpan/TextSpan';
import Button from '../../shared/Button/Button';
import { ICreditCardValidation } from '../../models/ICreditCardValidation';

const Wrapper = styled.div`
	display: flex;
	gap: 24px;
`;

const SectionWrapper = styled.div<{ isCardPreview: boolean }>`
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
`;

const InputSectionWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 2px;
`;

const DropdownSectionWrapper = styled.div`
	display: flex;
	width: 100%;
	gap: 16px;
`;

const Dropdown = styled.select`
	display: flex;
	width: 100%;
	height: 40px;
	padding: 4px;
	border-radius: 5px;
	border: solid blue 1px;
	font-weight: bold;
	&:focus {
		outline: none;
		border: 1px solid #fad3ff;
	}
`;

const Header = styled.h3`
	margin: 0;
`;

const BottomWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-top: 16px;
`;

const initialCreditCardInfo: ICreditCardInfo = {
	cardHolder: '',
	cardNumber: '',
	expirationMonth: null,
	expirationYear: null,
	cvc: '',
};

const initialValidation: ICreditCardValidation = {
	isCardNameError: false,
	isCardNumberError: false,
	isCVCError: false,
	isExpirationMonthError: false,
	isExpirationYearError: false,
};

const CreditCard = () => {
	const [cardInfo, setCardInfo] = useState(initialCreditCardInfo);
	const [validation, setValidation] = useState(initialValidation);
	const [cardType, setCardType] = useState('Credit card');
	const yearOptions: number[] = Array.from({ length: 12 }, (_, i) => i + dayjs().year());

	useEffect(() => {
		setCardType(validateCardNumber(cardInfo.cardNumber));
	}, [cardInfo.cardNumber]);

	const onCreditInfoChange = (value: string | number, name: string) => {
		switch (name) {
			case 'cardNumber':
				if (validation.isCardNumberError) setValidation({ ...validation, isCardNumberError: false });
				break;
			case 'cardHolder':
				if (validation.isCardNameError) setValidation({ ...validation, isCardNameError: false });
				break;
			case 'expirationYear':
				if (validation.isExpirationYearError)
					setValidation({ ...validation, isExpirationYearError: false });
				break;
			default:
				if (validation.isExpirationMonthError)
					setValidation({ ...validation, isExpirationMonthError: false });
				break;
		}
		setCardInfo({ ...cardInfo, ...{ [name]: value } });
	};

	const onCvcChange = (value: string) => {
		if (cardInfo.cvc.length > 2) return;
		if (validation.isCVCError) setValidation({ ...validation, isCVCError: false });
		setCardInfo({ ...cardInfo, ...{ cvc: value } });
	};

	const validateCreditCard = () => {
		const validation = validateCreditCardInfo(cardInfo);
		setValidation(validation);
	};

	return (
		<Wrapper>
			<SectionWrapper {...{ isCardPreview: false }}>
				<Header>Create your card</Header>
				<InputField
					{...{
						label: 'Card number',
						type: 'number',
						errorText: validation.isCardNumberError ? 'Card number is required' : null,
						name: 'cardNumber',
						placeholder: 'Card number',
						value: cardInfo.cardNumber || '',
						onChange: (e: ChangeEvent<HTMLInputElement>) =>
							onCreditInfoChange(e.target.value, e.target.name),
					}}
				/>
				<InputField
					{...{
						label: 'Card holder',
						type: 'text',
						errorText: validation.isCardNameError ? 'Card name is required' : null,
						name: 'cardHolder',
						placeholder: 'Card holder',
						value: cardInfo.cardHolder,
						onChange: (e: ChangeEvent<HTMLInputElement>) =>
							onCreditInfoChange(e.target.value, e.target.name),
					}}
				/>

				<InputSectionWrapper>
					<TextSpan {...{ label: 'Expiration' }}></TextSpan>
					<DropdownSectionWrapper>
						<InputSectionWrapper>
							<Dropdown
								{...{
									value: cardInfo.expirationMonth || '',
									name: 'expirationMonth',
									onChange: (e) => onCreditInfoChange(e.target.value, e.target.name),
								}}>
								<option value="" disabled hidden>
									Month
								</option>
								{Array.from({ length: 12 }, (_, i) => i + 1).map((month, index) => (
									<option key={index} value={month}>
										{month}
									</option>
								))}
							</Dropdown>
							{validation.isExpirationMonthError && (
								<TextSpan {...{ label: 'Month is empty', isError: true }} />
							)}
						</InputSectionWrapper>
						<InputSectionWrapper>
							<Dropdown
								{...{
									value: cardInfo.expirationYear || '',
									name: 'expirationYear',
									onChange: (e) => onCreditInfoChange(e.target.value, e.target.name),
								}}>
								<option value="" disabled hidden>
									Year
								</option>
								{yearOptions.map((year, index) => (
									<option key={index} value={year}>
										{year}
									</option>
								))}
							</Dropdown>
							{validation.isExpirationYearError && (
								<TextSpan {...{ label: 'Year is empty', isError: true }} />
							)}
						</InputSectionWrapper>
					</DropdownSectionWrapper>
				</InputSectionWrapper>
				<InputField
					{...{
						label: 'CVC',
						type: 'text',
						errorText: validation.isCVCError ? 'CVC is required' : null,
						name: 'cvc',
						placeholder: 'CVC',
						value: cardInfo.cvc,
						onChange: (e: ChangeEvent<HTMLInputElement>) => onCvcChange(e.target.value),
					}}
				/>
				<BottomWrapper>
					<TextSpan {...{ label: cardType }} />
					<Button {...{ label: 'Submit', type: 'submit', onClick: validateCreditCard }} />
				</BottomWrapper>
			</SectionWrapper>
			<SectionWrapper {...{ isCardPreview: true }}>
				<Header>{cardType}</Header>
				<p>{cardInfo.cardNumber}</p>
			</SectionWrapper>
		</Wrapper>
	);
};

export default CreditCard;
