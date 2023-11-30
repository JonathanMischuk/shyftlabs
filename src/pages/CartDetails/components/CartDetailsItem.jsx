import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updatedCart } from "../../../state/slices/cartSlice";
import QuantitySelect from "../../../components/QuantitySelect/QuantitySelect";
import { maxItems } from "../../../config";

const CartDetailsItem = ({ title, description, price, id, quantity }) => {
    const dispatch = useDispatch();
    const quantityRef = useRef(null);

    const onChangeHandler = () => {
        dispatch(updatedCart({ title, description, price, id, quantity: Number(quantityRef.current.value) }));
    };

    return <div className="cart-details-item">
        <span className="first">
            <h3>{title}</h3>

            <QuantitySelect quantityRef={quantityRef} maxItems={maxItems + 1} onChangeHandler={onChangeHandler} currentItemAmount={quantity} />
        </span>

        <span>{description}</span>

        <span className="last">
            <span>${price.toFixed(2)} x{quantity}</span>
            <span className="cart-details-item-total">${(price * quantity).toFixed(2)}</span>
        </span>
    </div>
};

export default CartDetailsItem;