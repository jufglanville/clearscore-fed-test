import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from './TaskList';

const mockTask = {
  id: 'er792vrua',
  title: 'Test Task',
  description: 'This is a test task',
  createdAt: '2021-10-10T00:00:00.000Z',
};

describe('TaskList Component', () => {
  beforeEach(() => {
    // Reset 'localStorage' before each test
    jest
      .spyOn(global.Storage.prototype, 'setItem')
      .mockImplementation(() => {});
    jest
      .spyOn(global.Storage.prototype, 'getItem')
      .mockImplementation(() => null);
  });

  it('Adds a new task when the add button is clicked', async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await user.click(screen.getByRole('img', { name: /add/i }));
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();

    // expect the notification to be on screen
    expect(screen.getByText('Task Created')).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.queryByText('Task Created')).not.toBeInTheDocument();
      },
      { timeout: 1100 },
    );
  });

  it('Populates cards from the Local Storage', async () => {
    // Mock 'localStorage' to return a task
    jest
      .spyOn(global.Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify([mockTask]));

    render(<TaskList />);

    expect(screen.getByPlaceholderText(/title/i)).toHaveValue('Test Task');
    expect(screen.getByPlaceholderText(/description/i)).toHaveValue(
      'This is a test task',
    );
    expect(screen.getByText(/10\/10\/2021, 01:00/i)).toBeInTheDocument();

    expect(screen.getByText('Tasks Loaded')).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.queryByText('Tasks Loaded')).not.toBeInTheDocument();
      },
      { timeout: 1100 },
    );
  });

  it('Deletes a task when the delete button is clicked', async () => {
    jest
      .spyOn(global.Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify([mockTask]));
    const user = userEvent.setup();
    render(<TaskList />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();

    await user.click(screen.getByRole('img', { name: /delete/i }));
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument();

    expect(screen.getByText('Task Deleted')).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.queryByText('Task Deleted')).not.toBeInTheDocument();
      },
      { timeout: 1100 },
    );
  });

  it('Updates a task when the user exits the input', async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await user.click(screen.getByRole('img', { name: /add/i }));
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();

    await user.type(screen.getByPlaceholderText('Title'), 'Test Task');
    await user.type(screen.getByPlaceholderText('Description'), 'Test Desc');
    await user.keyboard('{Tab}');

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Desc')).toBeInTheDocument();

    expect(screen.getByText('Task Updated')).toBeInTheDocument();
    await waitFor(
      () => {
        expect(screen.queryByText('Task Updated')).not.toBeInTheDocument();
      },
      { timeout: 1100 },
    );
  });

  it('Correctly sorts the tasks', async () => {
    jest.spyOn(global.Storage.prototype, 'getItem').mockImplementation(() =>
      JSON.stringify([
        mockTask,
        {
          id: '123sdfksdf',
          title: 'Another Task',
          description: 'This is a test task',
          createdAt: '2021-10-11T00:00:00.000Z',
        },
      ]),
    );
    const user = userEvent.setup();
    render(<TaskList />);

    await user.selectOptions(screen.getByRole('combobox'), 'titleAsc');
    expect(screen.getAllByPlaceholderText('Title')[0]).toHaveValue(
      'Another Task',
    );

    await user.selectOptions(screen.getByRole('combobox'), 'titleDesc');
    expect(screen.getAllByPlaceholderText('Title')[0]).toHaveValue('Test Task');

    await user.selectOptions(screen.getByRole('combobox'), 'createdAtDesc');
    expect(screen.getAllByPlaceholderText('Title')[0]).toHaveValue(
      'Another Task',
    );

    await user.selectOptions(screen.getByRole('combobox'), 'createdAtAsc');
    expect(screen.getAllByPlaceholderText('Title')[0]).toHaveValue('Test Task');
  });
});
