import { render, screen } from '@testing-library/react';
import Profile from '../Profile';

test('renders profile page', () => {
  render(<Profile />);
  expect(screen.getByText(/Profile/)).toBeInTheDocument();
});
