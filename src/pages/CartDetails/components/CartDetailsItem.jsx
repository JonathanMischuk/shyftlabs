import { useRef } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../../../state/slices/cartSlice";
import QuantitySelect from "../../../components/QuantitySelect/QuantitySelect";

const CartDetailsItem = ({ title, description, price, id, quantity }) => {
    const dispatch = useDispatch();
    const quantityRef = useRef(null);

    const onChangeHandler = () => {
        dispatch(updateCart({ title, description, price, id, quantity: Number(quantityRef.current.value) }));
    };

    return <div className="cart-details-item">
        <span className="first">
            <h3>{title}</h3>

            <QuantitySelect 
                quantityRef={quantityRef}
                onChangeHandler={onChangeHandler}
                defaultValue={quantity} />
        </span>

        <span>{description}</span>

        <span className="last">
            <span>${price.toFixed(2)} x{quantity}</span>
            <span className="cart-details-item-total">${(price * quantity).toFixed(2)}</span>
        </span>
    </div>
};

export default CartDetailsItem;