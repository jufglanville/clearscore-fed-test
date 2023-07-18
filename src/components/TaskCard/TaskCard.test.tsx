import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Card from './TaskCard';

const mockOnDelete = jest.fn();
const mockOnSave = jest.fn();

const mockTask = {
  id: '1',
  title: 'Test Title',
  description: 'Test Description',
  createdAt: new Date(),
};

const mockTemplateTask = {
  id: '2',
  title: '',
  description: '',
  createdAt: new Date(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Card Component', () => {
  it('renders the card with placeholders if no task is provided', () => {
    const { getByPlaceholderText } = render(
      <Card
        task={mockTemplateTask}
        onDelete={mockOnDelete}
        onSave={mockOnSave}
      />,
    );

    expect(getByPlaceholderText('Title')).toBeInTheDocument();
    expect(getByPlaceholderText('Description')).toBeInTheDocument();
  });

  it('renders the title and description', () => {
    const { getByPlaceholderText } = render(
      <Card task={mockTask} onDelete={mockOnDelete} onSave={mockOnSave} />,
    );

    expect(getByPlaceholderText('Title')).toHaveDisplayValue('Test Title');
    expect(getByPlaceholderText('Description')).toHaveDisplayValue(
      'Test Description',
    );
  });

  it('renders the character count when the description is focused', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByText } = render(
      <Card
        task={mockTemplateTask}
        onDelete={mockOnDelete}
        onSave={mockOnSave}
      />,
    );

    const description = getByPlaceholderText('Description');
    await user.click(description);

    expect(getByText('140')).toBeInTheDocument();
  });

  it('does not render the character count when the description is not focused', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, queryByText } = render(
      <Card
        task={mockTemplateTask}
        onDelete={mockOnDelete}
        onSave={mockOnSave}
      />,
    );

    const description = getByPlaceholderText('Description');
    await user.click(description);
    await user.tab();

    expect(queryByText('140')).not.toBeInTheDocument();
  });

  it('calls the onSave function when user exits the title input', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(
      <Card task={mockTask} onDelete={mockOnDelete} onSave={mockOnSave} />,
    );

    const title = getByPlaceholderText('Title');
    await user.clear(title);
    await user.type(title, 'New Title');
    await user.tab();

    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it('does not call the onSave function when user exits the title input with no changes', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(
      <Card task={mockTask} onDelete={mockOnDelete} onSave={mockOnSave} />,
    );

    const title = getByPlaceholderText('Title');
    await user.click(title);
    await user.tab();

    expect(mockOnSave).not.toHaveBeenCalled();
  });

  it('calls the onSave function when user exits the description input', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(
      <Card task={mockTask} onDelete={mockOnDelete} onSave={mockOnSave} />,
    );

    const description = getByPlaceholderText('Description');
    await user.clear(description);
    await user.type(description, 'New Description');
    await user.tab();

    expect(mockOnSave).toHaveBeenCalledTimes(1);
  });

  it('does not call the onSave function when user exits the description input with no changes', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText } = render(
      <Card task={mockTask} onDelete={mockOnDelete} onSave={mockOnSave} />,
    );

    const description = getByPlaceholderText('Description');
    await user.click(description);
    await user.tab();

    expect(mockOnSave).not.toHaveBeenCalled();
  });
});
