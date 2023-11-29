import ProductList from "../pages/ProductList/ProductList";
import CartDetails from "../pages/CartDetails/CartDetails";

const navigationItems = [
    {
        name: "Product List",
        path: "/",
        element: () => <ProductList />
    },
    {
        name: "Cart Details",
        path: "/cart",
        element: () => <CartDetails />
    }
];

export default navigationItems;