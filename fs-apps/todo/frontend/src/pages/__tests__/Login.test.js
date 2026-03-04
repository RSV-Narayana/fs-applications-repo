import { render, screen } from '@testing-library/react';
import Login from '../Login';

test('renders login page', () => {
  render(<Login />);
  expect(screen.getByText(/Login|Connexion/)).toBeInTheDocument();
});
