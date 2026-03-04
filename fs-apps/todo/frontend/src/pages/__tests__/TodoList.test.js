import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';

test('renders todo list page', () => {
  render(<TodoList />);
  expect(screen.getByText(/Todo List|Liste de tâches/)).toBeInTheDocument();
});
