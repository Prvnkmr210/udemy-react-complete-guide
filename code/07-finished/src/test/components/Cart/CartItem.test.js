import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../../components/Cart/CartItem';

describe('CartItem', () => {
  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();

  const props = {
    name: 'Test Item',
    price: 10.00,
    amount: 2,
    onAdd: mockOnAdd,
    onRemove: mockOnRemove,
  };

  it('renders correctly', () => {
    render(<CartItem {...props} />);

    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('$10.00')).toBeInTheDocument();
    expect(screen.getByText('x 2')).toBeInTheDocument();
  });

  it('calls onAdd when + button is clicked', () => {
    render(<CartItem {...props} />);

    fireEvent.click(screen.getByText('+'));
    expect(mockOnAdd).toHaveBeenCalled();
  });

  it('calls onRemove when - button is clicked', () => {
    render(<CartItem {...props} />);

    fireEvent.click(screen.getByText('−'));
    expect(mockOnRemove).toHaveBeenCalled();
  });
});