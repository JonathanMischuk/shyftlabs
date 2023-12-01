import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../state/slices/cartSlice";
import CartDetailsItem from "./CartDetailsItem";
import Button from "../../../components/Button/Button";

const CartDetailsEmpty = () => {
    return <span>No items in cart</span>;
};

const CartDetailsItems = () => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    // loop through each item to find the product of the quantity value and sum up the total
    const getSubtotal = (acc, next) => acc + cart[next].price * cart[next].quantity;
    const subtotal = Object.keys(cart).reduce(getSubtotal, 0).toFixed(2);
    const isCartEmpty = Object.keys(cart).length === 0;

    const renderCartDetailItems = () => {
        // this list changes based on user interaction so key values
        // must be unique and not just an index value from a loop
        return Object.keys(cart).map(key => <CartDetailsItem key={cart[key].id} {...cart[key]} />);
    };

    const onClickHandler = () => {
        dispatch(clearCart());
    };

    if (isCartEmpty) return <CartDetailsEmpty />;

    return <div className="cart-details-items">
        {renderCartDetailItems()}

        <span className="cart-details-items-footer">
            <Button clickHandler={onClickHandler} isDisabled={isCartEmpty}>Empty cart</Button>

            <span className="cart-details-items-subtotal">
                Subtotal: ${subtotal}
            </span>
        </span>
    </div>;
};

export default CartDetailsItems;