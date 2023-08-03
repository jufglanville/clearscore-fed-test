import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from './TaskList';

const mockTask = {
  id: 'er792vrua',
  title: 'Test Task',
  description: 'This is a test task',
  createdAt: '2021-10-10T00:00:00.000Z',
};

const mockTask2 = {
  id: '123sdfksdf',
  title: 'Another Task',
  description: 'This is a test task',
  createdAt: '2021-10-11T00:00:00.000Z',
};

const expectNotification = async (text: string) => {
  expect(screen.getByText(text)).toBeInTheDocument();
  await waitFor(
    () => {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    },
    { timeout: 1100 },
  );
};

describe('TaskList Component', () => {
  it('Adds a new task when the add button is clicked', async () => {
    const user = userEvent.setup();
    render(<TaskList />);

    await user.click(screen.getByRole('img', { name: /add/i }));
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();

    // expect the notification to be on screen
    await expectNotification('Task Created');
  });

  it('Populates cards from the Local Storage', async () => {
    jest
      .spyOn(global.Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify([mockTask, mockTask2]));

    render(<TaskList />);

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();
    expect(screen.getByText(mockTask2.title)).toBeInTheDocument();

    // expect the notification to be on screen
    await expectNotification('Tasks Loaded');
  });

  it('Deletes a task when the delete button is clicked', async () => {
    jest
      .spyOn(global.Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify([mockTask]));
    const user = userEvent.setup();
    render(<TaskList />);

    expect(screen.getByText(mockTask.title)).toBeInTheDocument();

    await user.click(screen.getByRole('img', { name: /delete/i }));
    expect(screen.queryByText(mockTask.title)).not.toBeInTheDocument();

    // expect the notification to be on screen
    await expectNotification('Task Deleted');
  });

  it('Updates a task when the user exits the input', async () => {
    jest
      .spyOn(global.Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify([mockTask]));
    const user = userEvent.setup();
    render(<TaskList />);

    const updatedTitle = 'Updated Title';
    const updatedDescription = 'Updated Description';

    const title = screen.getByText(mockTask.title);
    const description = screen.getByText(mockTask.description);

    await user.clear(title);
    await user.type(title, updatedTitle);
    await user.clear(description);
    await user.type(description, updatedDescription);
    await user.keyboard('{Tab}');

    expect(screen.getByText(updatedTitle)).toBeInTheDocument();
    expect(screen.getByText(updatedDescription)).toBeInTheDocument();

    // expect the notification to be on screen
    await expectNotification('Task Updated');
  });

  it('Correctly sorts the tasks', async () => {
    jest
      .spyOn(global.Storage.prototype, 'getItem')
      .mockImplementation(() => JSON.stringify([mockTask, mockTask2]));
    const user = userEvent.setup();
    render(<TaskList />);

    await user.selectOptions(screen.getByRole('combobox'), 'titleAsc');
    expect(screen.getAllByPlaceholderText('Title')[0]).toHaveValue(
      mockTask2.title,
    );

    await user.selectOptions(screen.getByRole('combobox'), 'titleDesc');
    expect(screen.getAllByPlaceholderText('Title')[0]).toHaveValue(
      mockTask.title,
    );

    await user.selectOptions(screen.getByRole('combobox'), 'createdAtDesc');
    expect(screen.getAllByPlaceholderText('Title')[0]).toHaveValue(
      mockTask2.title,
    );

    await user.selectOptions(screen.getByRole('combobox'), 'createdAtAsc');
    expect(screen.getAllByPlaceholderText('Title')[0]).toHaveValue(
      mockTask.title,
    );
  });
});
