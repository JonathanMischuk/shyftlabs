export const getProducts = async () => {
    let response = null;
    let error = null;

    try {
        response = await fetch('https://fakestoreapi.com/products').then(res => res.json());
    } catch (err) {
        error = err;
    } finally {
        return { error, response };
    }
};