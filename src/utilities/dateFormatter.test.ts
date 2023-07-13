import formatDate from './dateFormatter';

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const date = new Date('2023-07-15T10:30:00');

    const formattedDate = formatDate(date);

    expect(formattedDate).toBe('15/07/2023, 10:30');
  });
});
