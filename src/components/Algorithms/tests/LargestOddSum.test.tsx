import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import LargestOddSum from '../LargestOddSum';

describe('LargestOddSum tests', () => {
	const user = userEvent.setup();
	beforeAll(() => {
		render(<LargestOddSum />);
	});
	afterAll(cleanup);

	it('Header is rendered', () => {
		expect(screen.getByRole('heading', { name: 'Largest odd sum' })).toBeInTheDocument();
	});

	it('Button is rendered', () => {
		expect(screen.getByRole('button', { name: 'Check it!' })).toBeInTheDocument();
	});

	it('Enter some numbers should provide correct result', async () => {
		expect(screen.getByText('0')).toBeInTheDocument();
		expect(screen.queryByText('61')).not.toBeInTheDocument();

		await user.type(screen.getByRole('textbox'), '19, 2, 42, 18');
		await user.click(screen.getByRole('button', { name: 'Check it!' }));

		expect(screen.queryByText('0')).not.toBeInTheDocument();
		expect(screen.getByText('61')).toBeInTheDocument();
	});

	it('Clearing input and enter some other numbers should show correct result', async () => {
		await user.clear(screen.getByRole('textbox'));
		expect(screen.queryByText('93')).not.toBeInTheDocument();

		await user.type(screen.getByRole('textbox'), '61, 32, 51');
		await user.click(screen.getByRole('button', { name: 'Check it!' }));

		expect(screen.getByText('93')).toBeInTheDocument();
	});

	it('Shows correct result when entering a sequence of numbers', async () => {
		await user.clear(screen.getByRole('textbox'));

		await user.type(screen.getByRole('textbox'), '1, 15, 22, 116, 123,123,123,122');
		await user.click(screen.getByRole('button', { name: 'Check it!' }));

		expect(screen.getByText('245')).toBeInTheDocument();
	});
});
