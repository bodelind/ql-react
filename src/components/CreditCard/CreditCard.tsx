import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICreditCardInfo } from '../../models/ICreditCardInfo';
import dayjs from 'dayjs';
import { validateCardNumber, validateCreditCardInfo } from './Validation';
import InputField from '../../shared/InputField/InputField';
import TextSpan from '../../shared/TextSpan/TextSpan';
import Button from '../../shared/Button/Button';
import { ICreditCardValidation } from '../../models/ICreditCardValidation';
import SectionWrapper from '../../shared/SectionWrapper/SectionWrapper';

const Wrapper = styled.div`
	display: flex;
	gap: 24px;
	flex-wrap: wrap;
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

const Dropdown = styled.select<{ isError: boolean }>`
	display: flex;
	width: 100%;
	height: 40px;
	padding: 4px;
	border-radius: 5px;
	border: ${({ isError }) => (isError ? 'solid #dc3545 1px' : 'solid #0031a5 1px')};
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

const CardPreviewText = styled.span<{ uppercase?: boolean }>`
	font-weight: bold;
	font-size: 25px;
	${({ uppercase }) => uppercase && 'text-transform: uppercase;'};
`;

const CardPreviewProperty = styled.div<{ alignItems?: string }>`
	display: flex;
	flex-direction: column;
	width: 100%;
	${({ alignItems }) => alignItems && `align-items: ${alignItems};`};
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

const isNumberRegEx = /[0-9\n]/;

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
		if (validation.isCVCError) setValidation({ ...validation, isCVCError: false });
		setCardInfo({ ...cardInfo, ...{ cvc: value } });
	};

	const onSubmit = () => {
		const validation = validateCreditCardInfo(cardInfo);
		setValidation(validation);
		if (Object.values(validation).every((x) => x === false)) {
			alert('Created');
			setCardInfo(initialCreditCardInfo);
		}
	};

	const onKeyDown = (e: KeyboardEvent<HTMLInputElement>, isCardNumber: boolean = false) => {
		if (
			(e.key !== 'Backspace' && !isNumberRegEx.test(e.key)) ||
			(e.key !== 'Backspace' && isCardNumber && cardInfo.cardNumber.length === 16)
		)
			e.preventDefault();
	};

	return (
		<Wrapper>
			<SectionWrapper {...{ isCardPreview: false }}>
				<Header>Create your card</Header>
				<InputField
					{...{
						label: 'Card number',
						type: 'number',
						errorText: validation.isCardNumberError
							? 'Card number is required and must be between 10 and 16 numbers'
							: null,
						name: 'cardNumber',
						onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => onKeyDown(e, true),
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
						maxLength: 25,
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
									isError: validation.isExpirationMonthError,
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
									isError: validation.isExpirationYearError,
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
						maxLength: 3,
						onKeyDown,
						onChange: (e: ChangeEvent<HTMLInputElement>) => onCvcChange(e.target.value),
					}}
				/>
				<BottomWrapper>
					<TextSpan {...{ label: cardType }} />
					<Button {...{ label: 'Submit', type: 'submit', onClick: onSubmit }} />
				</BottomWrapper>
			</SectionWrapper>
			<SectionWrapper {...{ isCardPreview: true, height: '50%' }}>
				<Header>{cardType}</Header>
				<CardPreviewProperty>
					<TextSpan {...{ label: 'card number' }} />
					<CardPreviewText>
						{cardInfo.cardNumber.match(/.{1,4}/g)?.join(' ') || '012345678910'}
					</CardPreviewText>
				</CardPreviewProperty>
				<CardPreviewProperty>
					<TextSpan {...{ label: 'card holder' }} />
					<CardPreviewText {...{ uppercase: true }}>
						{cardInfo.cardHolder || 'Dwayne "The Rock" Johnson'}
					</CardPreviewText>
				</CardPreviewProperty>
				<BottomWrapper>
					<CardPreviewProperty>
						<TextSpan {...{ label: 'expiration date' }} />
						<CardPreviewText>
							{cardInfo.expirationMonth || '12'} / {cardInfo.expirationYear || 2222}
						</CardPreviewText>
					</CardPreviewProperty>
					<CardPreviewProperty {...{ alignItems: 'flex-end' }}>
						<TextSpan {...{ label: 'CVC security code' }} />
						<CardPreviewText>{cardInfo.cvc || 666}</CardPreviewText>
					</CardPreviewProperty>
				</BottomWrapper>
			</SectionWrapper>
		</Wrapper>
	);
};

export default CreditCard;
