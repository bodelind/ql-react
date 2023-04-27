import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import RemoveLetter from '../RemoveLetter';

describe('RemoveLetter tests', () => {
	const user = userEvent.setup();
	beforeAll(() => {
		render(<RemoveLetter />);
	});
	afterAll(cleanup);

	it('Header is rendered', () => {
		expect(screen.getByRole('heading', { name: 'Remove letters' })).toBeInTheDocument();
	});

	it('Button is rendered', () => {
		expect(screen.getByRole('button', { name: 'Check it!' })).toBeInTheDocument();
	});

	it('Enter a string should provide correct output', async () => {
		expect(screen.queryByText('ffdtttyy')).not.toBeInTheDocument();

		await user.type(screen.getByRole('textbox'), 'ffdttttyy');
		await user.click(screen.getByRole('button', { name: 'Check it!' }));

		expect(screen.getByText('ffdtttyy')).toBeInTheDocument();
	});

	it('Enter a string should provide correct output', async () => {
		await user.clear(screen.getByRole('textbox'));

		await user.type(screen.getByRole('textbox'), 'iiikigggg');
		await user.click(screen.getByRole('button', { name: 'Check it!' }));

		expect(screen.getByText('iiikiggg')).toBeInTheDocument();
	});

	it('Shows correct result when entering a string', async () => {
		await user.clear(screen.getByRole('textbox'));

		await user.type(
			screen.getByRole('textbox'),
			'aaabbbcccddddeeeeeffffghhiijjkkllllmmnoppqsrrtttuvxxxxxxyzåääääöö'
		);
		await user.click(screen.getByRole('button', { name: 'Check it!' }));

		expect(
			screen.getByText('aaabbbcccdddeeeeefffghhiijjkklllmmnoppqsrrtttuvxxxxxxyzåäääöö')
		).toBeInTheDocument();
	});
});
