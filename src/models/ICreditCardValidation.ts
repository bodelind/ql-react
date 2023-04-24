export interface ICreditCardValidation {
	isCardNameError: boolean;
	isCardNumberError: boolean;
	isExpirationMonthError: boolean;
	isExpirationYearError: boolean;
	isCVCError: boolean;
}
