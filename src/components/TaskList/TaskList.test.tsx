import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TaskList from './TaskList';

describe('TaskList Component', () => {
  afterEach(() => {
    window.history.pushState(null, document.title, '/');
  });

  it('Adds a new task when the add button is clicked', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByAltText } = render(<TaskList />);

    const addButton = getByAltText('add');
    await user.click(addButton);

    expect(getByPlaceholderText('Title')).toBeInTheDocument();
  });

  it('Adds a new task when the add button is clicked', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByAltText } = render(<TaskList />);

    const addButton = getByAltText('add');
    await user.click(addButton);

    expect(getByPlaceholderText('Title')).toBeInTheDocument();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the card list', () => {
    const { getByTestId } = render(<TaskList />);

    expect(getByTestId('card-list')).toBeInTheDocument();
  });

  it('Deletes a task when the delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TaskList />);
    await user.click(screen.getByAltText('add'));
    screen.logTestingPlaygroundURL();
    // console.log(prettyDOM(screen.container));
    // expect(getByPlaceholderText('Title')).toBeInTheDocument();
    // await user.click(getByAltText('delete'));
    // expect(getByPlaceholderText('Title')).not.toBeInTheDocument();
  });
});
