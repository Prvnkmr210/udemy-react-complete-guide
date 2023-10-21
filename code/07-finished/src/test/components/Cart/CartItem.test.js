import { screen, fireEvent, render } from '@testing-library/react';
import CartItem from '../../../components/Cart/CartItem';
import '@testing-library/jest-dom/extend-expect';

describe('CartItem', () => {
  let container;

  const mockOnAdd = jest.fn();
  const mockOnRemove = jest.fn();

  const props = {
    name: 'TestItem',
    price: 10.00,
    amount: 2,
    onAdd: mockOnAdd,
    onRemove: mockOnRemove,
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  

  it('renders correctly, rener in react 17', () => {
    // render(<CartItem {...props} />);
    // expect(screen.getByText('$10.00')).toBeInTheDocument();

    // different way of render using container
    const { getByText } = render(<CartItem {...props} />, container);
    console.log(getByText);
    expect(screen.getByText('TestItem')).toBeInTheDocument();    
    
    // this works with; import ReactDOM from 'react-dom';
    // ReactDOM.render(<CartItem {...props} />, container);
    // this queryselector works only with ReactDom.render not with the testing library render
    // expect(container.querySelector('.cart-item .price').textContent).toBe(`$${props.price.toFixed(2)}`);
    // expect(container.querySelector('.cart-item .amount').textContent).toBe(`x ${props.amount}`);
  });

  it('React 18 way of rendering the component', () => {
    // https://stackoverflow.com/questions/71685441/react-testing-library-gives-console-error-for-reactdom-render-in-react-18

    // const root = ReactDOM.createRoot(container);
    // ReactDOM.createRoot(container).render(<CartItem {...props} />);
    render(<CartItem {...props} />);
    expect(screen.getByText('TestItem')).toBeInTheDocument();
  });

  it('calls onAdd when + button is clicked', () => {
    render(<CartItem {...props} />, container);

    fireEvent.click(screen.getByText('+'));
    expect(mockOnAdd).toHaveBeenCalled();
  });

  it('calls onRemove when - button is clicked', () => {
    render(<CartItem {...props} />, container);

    fireEvent.click(screen.getByText('−'));
    expect(mockOnRemove).toHaveBeenCalled();
  });
});
