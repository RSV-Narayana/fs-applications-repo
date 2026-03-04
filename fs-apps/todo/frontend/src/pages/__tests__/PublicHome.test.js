import { render, screen } from '@testing-library/react';
import PublicHome from '../PublicHome';

test('renders public home page', () => {
  render(<PublicHome />);
  expect(screen.getByText(/Public Home/)).toBeInTheDocument();
});
