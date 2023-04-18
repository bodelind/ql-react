export interface ICreditCardInfo {
	cardHolder: string;
	cardNumber: string;
	expirationYear: number | null;
	expirationMonth: number | null;
	cvc: string;
}
