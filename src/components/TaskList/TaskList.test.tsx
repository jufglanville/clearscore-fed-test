import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskList from './TaskList';

describe('TaskList Component', () => {
  afterEach(cleanup);

  it('renders the card list', () => {
    const { getByTestId } = render(<TaskList />);

    expect(getByTestId('card-list')).toBeInTheDocument();
  });

  it('Adds a new task when the add button is clicked', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByAltText } = render(<TaskList />);

    const addButton = getByAltText('add');
    await user.click(addButton);

    expect(getByPlaceholderText('Title')).toBeInTheDocument();
  });

  it('Deletes a task when the delete button is clicked', async () => {
    const user = userEvent.setup();
    const { queryByPlaceholderText, getByAltText } = render(<TaskList />);

    await user.click(getByAltText('add'));
    expect(queryByPlaceholderText('Title')).toBeInTheDocument();

    await user.click(getByAltText('delete'));
    expect(queryByPlaceholderText('Title')).not.toBeInTheDocument();
  });
});
