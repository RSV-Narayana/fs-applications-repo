import { render, screen } from '@testing-library/react';
import Dashboard from '../Dashboard';

test('renders dashboard page', () => {
  render(<Dashboard />);
  expect(screen.getByText(/Dashboard|Tableau de bord/)).toBeInTheDocument();
});
