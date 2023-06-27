import '@testing-library/jest-dom/extend-expect';
import { ArticlePillar } from '@guardian/libs';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockFetchCalls } from '../../lib/mockFetchCalls';
import { AbuseReportForm } from './AbuseReportForm';

const fetchMock = mockFetchCalls();

describe('Dropdown', () => {
	it('Should show the expected label names', () => {
		const { getByText } = render(
			<AbuseReportForm
				toggleSetShowForm={() => {}}
				pillar={ArticlePillar.Sport}
				commentId={123}
			/>,
		);

		expect(getByText('Category')).toBeInTheDocument();
		expect(getByText('Reason (optional)')).toBeInTheDocument();
		expect(getByText('Email (optional)')).toBeInTheDocument();
	});

	it('Should show the category error message if not chosen on submit', () => {
		const { getByText } = render(
			<AbuseReportForm
				toggleSetShowForm={() => {}}
				pillar={ArticlePillar.Sport}
				commentId={123}
			/>,
		);

		fireEvent.click(getByText('Report'));
		expect(
			getByText('You must select a category before submitting'),
		).toBeInTheDocument();
	});

	it('Should show the success message category is selected', async () => {
		const user = userEvent.setup();
		const { getByText, getByLabelText, getByRole } = render(
			<AbuseReportForm
				toggleSetShowForm={() => {}}
				pillar={ArticlePillar.Sport}
				commentId={123}
			/>,
		);

		await user.selectOptions(getByLabelText('Category'), 'Legal issue');
		await user.click(getByRole('button', { name: 'Report' }));

		await waitFor(() => {
			expect(fetchMock.called(/reportAbuse/)).toBeTruthy();
		});

		await waitFor(() => {
			expect(getByText('Report submitted')).toBeInTheDocument();
		});
	});
});
