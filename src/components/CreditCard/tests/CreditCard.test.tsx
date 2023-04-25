import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import CreditCard from '../CreditCard';

describe('CreditCard tests', () => {
	const user = userEvent.setup();
	beforeAll(() => {
		render(<CreditCard />);
	});
	afterAll(cleanup);

	it('Header is rendered', () => {
		expect(screen.getByRole('heading', { name: 'Create your card' })).toBeInTheDocument();
	});

	it('Card number input is rendered', () => {
		expect(screen.getByText('Card number')).toBeInTheDocument();
	});

	it('Card holder input is rendered', () => {
		expect(screen.getByText('Card holder')).toBeInTheDocument();
	});

	it('Month dropdown is rendered', () => {
		expect(screen.getByText('Month')).toBeInTheDocument();
	});

	it('Year dropdown is rendered', () => {
		expect(screen.getByText('Year')).toBeInTheDocument();
	});

	it('Pressing submit shows validation error when no input', async () => {
		expect(screen.queryByText('CVC is required')).not.toBeInTheDocument();
		await user.click(screen.getByRole('button', { name: 'Submit' }));
		expect(screen.getByText('CVC is required')).toBeInTheDocument();
	});

	it('Typing in CVC after error is shown removes the error', async () => {
		await user.click(screen.getByRole('button', { name: 'Submit' }));
		expect(screen.getByText('CVC is required')).toBeInTheDocument();

		await user.type(screen.getByPlaceholderText('CVC'), '123');
		expect(screen.queryByText('CVC is required')).not.toBeInTheDocument();
	});
});
