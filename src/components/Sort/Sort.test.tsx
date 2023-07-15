import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Sort from './Sort';

const mockOnSort = jest.fn();

describe('Sort Component', () => {
  it('renders with all options', () => {
    const { getByRole } = render(<Sort onSort={mockOnSort} />);
    const selectElement = getByRole('combobox');

    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveTextContent('Date: Newest to Oldest');
    expect(selectElement).toHaveTextContent('Date: Oldest to Newest');
    expect(selectElement).toHaveTextContent('Title: A to Z');
    expect(selectElement).toHaveTextContent('Title: Z to A');
  });

  it('calls onSort function with the selected type', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(<Sort onSort={mockOnSort} />);

    await user.selectOptions(getByRole('combobox'), 'createdAtDesc');

    expect(mockOnSort).toHaveBeenCalledWith('createdAtDesc');
  });
});
