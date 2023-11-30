// fetch logic for fakestore api
export const getProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products').then(res => res.json());
        return { response, error: null };
    } catch (err) {
        return { response: null, error: err };
    }
};

export const getProductsLimit = async (limit) => {
    if (typeof limit !== 'number') throw new Error('parameter must be of number type.');

    try {
        const response = await fetch(`https://fakestoreapi.com/products?limit=${limit}`).then(res => res.json());
        return { response, error: null };
    } catch (err) {
        return { response: null, error: err };
    }
};