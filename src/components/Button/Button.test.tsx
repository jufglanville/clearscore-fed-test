import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

const mockOnClick = jest.fn();

describe('Button', () => {
  it('renders without crashing', () => {
    const { getByRole } = render(
      <Button icon="" type="" onClick={mockOnClick} />,
    );

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    const icon = 'icon';
    const altText = 'Icon Alt Text';

    const { getByAltText } = render(
      <Button icon={icon} type={altText} onClick={mockOnClick} />,
    );

    expect(getByAltText(altText)).toBeInTheDocument();
  });

  it('fires event when clicked', async () => {
    const user = userEvent.setup();

    const { getByRole } = render(
      <Button icon="" type="" onClick={mockOnClick} />,
    );

    await user.click(getByRole('button'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
