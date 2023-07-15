import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CardList from './CardList';

describe('CardList Component', () => {
  it('renders the card list', () => {
    const { getByTestId } = render(<CardList />);

    expect(getByTestId('card-list')).toBeInTheDocument();
  });

  it('Adds a new task when the add button is clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, getByPlaceholderText } = render(<CardList />);

    const addButton = getByRole('button');
    await user.click(addButton);

    expect(getByPlaceholderText('Title')).toBeInTheDocument();
  });

  it('Deletes a task when the delete button is clicked', async () => {
    const user = userEvent.setup();
    const { getByRole, queryByPlaceholderText, getByAltText } = render(
      <CardList />,
    );

    await user.click(getByRole('button'));
    expect(queryByPlaceholderText('Title')).toBeInTheDocument();

    await user.click(getByAltText('delete'));
    expect(queryByPlaceholderText('Title')).not.toBeInTheDocument();
  });
});
