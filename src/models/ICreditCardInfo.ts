export interface ICreditCardInfo {
	cardHolder: string;
	cardNumber: number | null;
	expirationYear: number | null;
	expirationMonth: number | null;
	cvc: number | null;
}
