import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);
    const headingElement = screen.getByText('Idea Board');
    expect(headingElement).toBeInTheDocument();
  });
});
