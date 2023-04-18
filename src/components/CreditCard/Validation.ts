import { ICreditCardTypes } from '../../models/ICreditCardTypes';

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
