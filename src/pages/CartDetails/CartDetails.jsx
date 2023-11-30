import CartDetailsItems from "./components/CartDetailsItems";
import './styles.scss';

function CartDetails() {
    return <div className="content">
        <h1>Cart Details</h1>

        <div className="cart-details">
            <CartDetailsItems />
        </div>
    </div>
}

export default CartDetails;