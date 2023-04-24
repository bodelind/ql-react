import { ICreditCardInfo } from '../../models/ICreditCardInfo';
import { ICreditCardTypes } from '../../models/ICreditCardTypes';
import { ICreditCardValidation } from '../../models/ICreditCardValidation';

const VisaCard = /^4[0-9]{12}(?:[0-9]{3})?$/;
const MasterCard = /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/;
const AmericanExpress = /^3[47][0-9]{13}$/;
const VisaMasterCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;

const cardTypes: ICreditCardTypes[] = [
	{ name: 'Visa', regex: VisaCard },
	{ name: 'Master card', regex: MasterCard },
	{ name: 'AmericanExpress', regex: AmericanExpress },
	{ name: 'Visa master card', regex: VisaMasterCard },
];

export const validateCardNumber = (number: string) => {
	const match = cardTypes.find((x) => x.regex.test(number) === true);
	if (match) return match.name;

	return 'Credit card';
};

export const validateCreditCardInfo = (creditCard: ICreditCardInfo): ICreditCardValidation => {
	const model: ICreditCardValidation = {
		isCardNameError: creditCard.cardHolder.length === 0,
		isCardNumberError: creditCard.cardNumber.length >= 16 || creditCard.cardNumber.length <= 9,
		isCVCError: creditCard.cvc.length < 3,
		isExpirationMonthError: !creditCard.expirationMonth,
		isExpirationYearError: !creditCard.expirationYear,
	};

	return model;
};
