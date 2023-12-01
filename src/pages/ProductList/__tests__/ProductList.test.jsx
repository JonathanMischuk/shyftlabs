import { Provider } from 'react-redux';
import { render, screen, act } from '@testing-library/react';
import { addToList } from '../../../state/slices/productsSlice';
import { store } from '../../../state';
import ProductList from '../ProductList';
import { PAGINATION_LIMIT } from '../../../config';

const mockItem = {
    "id": 13,
    "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    "price": 599,
    "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    "rating": {
        "rate": 2.9,
        "count": 250
    }
};

const mockObserver = () => {
    const observe = jest.fn();
    const unobserve = jest.fn();

    window.IntersectionObserver = jest.fn(() => ({
        observe,
        unobserve,
    }));
}

const setup = () => {
    render(
        <Provider store={store}>
            <ProductList />
        </Provider>
    );
};

test('Product List has H1 title', () => {
    mockObserver();
    setup();

    expect(screen.getByText(/Product List/i)).toBeTruthy();
});

test('Product List contains 0 items', async () => {
    mockObserver();
    setup();

    expect(screen.getAllByText(/Showing 0 of 100/i)).toBeTruthy();
});

test('Product List will contain 20 items', async () => {
    mockObserver();
    setup();

    expect(screen.getAllByText(/Showing 0 of 100/i)).toBeTruthy();
    
    act(() => {
        store.dispatch(addToList(new Array(PAGINATION_LIMIT).fill(mockItem)));
    });
    
    expect(screen.getAllByText(/Acer/i)).toBeTruthy();
    expect(screen.getAllByText(/Acer/i).length).toBe(PAGINATION_LIMIT);
});