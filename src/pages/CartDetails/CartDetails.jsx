import CartDetailsItems from "./components/CartDetailsItems";
import './styles.scss';

// root route component
function CartDetails() {
    return <div className="content">
        <h1>Cart Details</h1>

        <CartDetailsItems />
    </div>
}

export default CartDetails;