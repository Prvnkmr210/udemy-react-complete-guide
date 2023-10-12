// App.test.js
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

jest.mock('../components/Cart/Cart', () => ({ show }) => show ? <div>Cart</div> : null);
jest.mock('../components/Layout/Header', () => {
  const React = jest.requireActual('react');
  return function MockHeader() {
    const [showCart, setShowCart] = React.useState(false);

    return (
      <div onClick={() => setShowCart(!showCart)}>
        Header
        {showCart && <div>Cart</div>}
      </div>
    );
  };
});
jest.mock('../components/Meals/Meals', () => () => <div>Meals</div>);
jest.mock('../store/CartProvider', () => ({ children }) => <div>{children}</div>);

describe("App", () => {
  
  it("renders Header and Meals components", () => {
    render(<App />);
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Meals")).toBeInTheDocument();
  });

  it("shows Cart when showCartHandler is called..", () => {
    render(<App />);
    userEvent.click(screen.getByText("Header"));
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });

  it('hides Cart when Header is clicked again', () => {
    render(<App />);
    userEvent.click(screen.getByText('Header')); // Show cart
    expect(screen.getByText('Cart')).toBeInTheDocument();
  
    userEvent.click(screen.getByText('Header')); // Hide cart
    expect(screen.queryByText('Cart')).toBeNull();
  });

  it('hides Cart when hideCartHandler is clicked', () => {
    render(<App />);
    userEvent.click(screen.getByText('Header')); // Show cart  
    expect(screen.getByText('Cart')).toBeInTheDocument();
    
    userEvent.click(screen.getByText('Cart')); // Hide cart
    expect(screen.queryByText('Cart')).toBeNull();
  });
});