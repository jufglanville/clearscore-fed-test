import { render, act } from '@testing-library/react';

import Notification from './Notification';

jest.useFakeTimers();
const mockClearNotification = jest.fn();

describe('Notification Component', () => {
  it('renders with notification and clears after timeout', () => {
    const { getByText } = render(
      <Notification
        notification="Notification message"
        clearNotification={mockClearNotification}
      />,
    );

    expect(getByText('Notification message')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockClearNotification).toHaveBeenCalled();
  });

  it('does not render without notification', () => {
    const { queryByText } = render(
      <Notification
        notification=""
        clearNotification={mockClearNotification}
      />,
    );

    expect(queryByText('Notification message')).not.toBeInTheDocument();
  });
});
