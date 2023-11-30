import ProductList from "../pages/ProductList/ProductList";
import CartDetails from "../pages/CartDetails/CartDetails";

// used to populate routes and navigation from one place.
// adding more items to this array will update all necessary
// areas of the application
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