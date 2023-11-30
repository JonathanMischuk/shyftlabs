import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { store } from '../../../state';
import CartDetails from '../CartDetails';

test('Cart Details has H1 title', async () => {
    render(
        <Provider store={store}>
            <CartDetails />
        </Provider>
    );

    expect(screen.getByText(/Cart Details/i)).toBeTruthy();
});