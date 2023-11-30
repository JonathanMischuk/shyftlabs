import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { store } from '../../../state';
import ProductList from '../ProductList';

test('Product List has H1 title', async () => {
    const observe = jest.fn();
    const unobserve = jest.fn();

    window.IntersectionObserver = jest.fn(() => ({
        observe,
        unobserve,
    }))

    render(
        <Provider store={store}>
            <ProductList />
        </Provider>
    );

    expect(screen.getByText(/Product List/i)).toBeTruthy();
});