import { render, screen } from '@testing-library/react';
import AdminPanel from '../AdminPanel';

test('renders admin panel page', () => {
  render(<AdminPanel />);
  expect(screen.getByText(/Admin Panel/)).toBeInTheDocument();
});
