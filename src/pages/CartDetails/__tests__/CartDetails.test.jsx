import { Provider } from 'react-redux';
import { render, screen, act } from '@testing-library/react';
import { store } from '../../../state';
import { updateCart, removeFromCart } from '../../../state/slices/cartSlice';
import CartDetails from '../CartDetails';

const mockItem = {
    id: 5,
    title: 'Some item',
    description: 'Some description',
    quantity: 3,
    price: 5.99
};

const setup = (_store = store) => {
    render(
        <Provider store={_store}>
            <CartDetails />
        </Provider>
    );
};

test('Cart Details has H1 title', () => {
    setup();
    expect(screen.getByText(/Cart Details/i)).toBeTruthy();
});

test('Cart Details has no items in cart', () => {
    setup();
    expect(screen.getByText(/No items in cart/i)).toBeTruthy();
});

test('Cart Details has an item in cart', () => {
    store.dispatch(updateCart(mockItem));
    setup(store);

    // matching product details that would be displayed in the cart
    expect(screen.getByText(/Some item/i)).toBeTruthy();
    expect(screen.getByText(/Some description/i)).toBeTruthy();
    expect(screen.getByText(/5.99/i)).toBeTruthy();
    expect(screen.getByText(/Subtotal:/i)).toBeTruthy();
});

test('Cart Details testing quantity reduction', () => {
    const firstMutation = {
        id: 5,
        quantity: 2
    };

    const secondMutation = {
        id: 5,
        quantity: 1
    };

    store.dispatch(updateCart(mockItem));
    setup(store);

    expect(screen.getByText(/Some item/i)).toBeTruthy();
    expect(screen.getByText(/Some description/i)).toBeTruthy();
    expect(screen.getByText(/5.99/i)).toBeTruthy();
    expect(screen.getByText(/Subtotal:/i)).toBeTruthy();
    
    // remove a quantity of 2 from an original quantity of 3
    act(() => {
        store.dispatch(removeFromCart(firstMutation));
    });

    // it should display only 1 item remaining in the cart
    expect(screen.getByText(/x1/i)).toBeTruthy();

    // remove the last item from the cart
    act(() => {
        store.dispatch(removeFromCart(secondMutation));
    });

    // now our cart is empty
    expect(screen.getByText(/No items in cart/i)).toBeTruthy();
});