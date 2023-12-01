import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../Navigation';

test('Navigation should contain correct items', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Navigation />
        </BrowserRouter>
    );

    expect(getByText(/Product List/i)).toBeTruthy();
    expect(getByText(/Cart Details/i)).toBeTruthy();
});