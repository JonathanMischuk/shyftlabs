import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addedToCart, removedFromCart } from '../../../state/slices/cartSlice';
import Button from '../../../components/Button/Button';
import QuantitySelect from '../../../components/QuantitySelect/QuantitySelect';
import { maxItems } from '../../../config';

function ProductListItem({ title, description, price, id }) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const quantityRef = useRef(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [addToCartDisabled, setAddToCartDisabled] = useState(false);
    const [removeFromCartDisabled, setRemoveFromCartDisabled] = useState(false);
    const reachedQuantityLimit = () => getCurrentQuantity() >= maxItems;

    // intended to enable or disable add to cart and remove from cart buttons
    // on state change if selected quantity is greater than maxItems or
    // less than 0
    useEffect(() => {
        const _currentQuantity = getCurrentQuantity();

        if (_currentQuantity === 0 || selectedQuantity > _currentQuantity) setRemoveFromCartDisabled(true);
        else setRemoveFromCartDisabled(false);

        if (_currentQuantity + selectedQuantity > maxItems) setAddToCartDisabled(true);
        else setAddToCartDisabled(false);
    }, [cart, selectedQuantity]);

    const onChangeHandler = () => {
        setSelectedQuantity(Number(quantityRef.current.value));
    };

    const addToCartClickHandler = () => {
        let quantity = Number(quantityRef.current.value);
        const _currentQuantity = getCurrentQuantity();
        
        // make sure sum is not more than item limit
        const sum = quantity + _currentQuantity;
        if (_currentQuantity >= maxItems || sum > maxItems) return;
        
        // don't dispatch if value is zero
        if (quantity > 0) dispatch(addedToCart({ title, description, price, id, quantity }));
    };

    const removeFromCartClickHandler = () => {
        let _quantity = Number(quantityRef.current.value || 1);
        const _currentQuantity = getCurrentQuantity();

        // similar to logic for addToCartClickHandler
        const difference = _currentQuantity - _quantity;
        if (_currentQuantity <= 0 || difference < 0) return;

        if (_quantity > 0) dispatch(removedFromCart({ id, quantity: _quantity }));
    };

    const getCurrentQuantity = () => {
        return cart.hasOwnProperty(id) ? Number(cart[id].quantity) : 0;
    };

    const getFormattedDescription = () => {
        if (description.length > 256) return description.substring(0, 256) + '...';

        console.log(description)

        return description;
    };

    return <div className="product-list-item">
        <span>
            <h3>{title}</h3>
            <p>{getFormattedDescription()}</p>
            <p className='bold'>Price: ${price}</p>
        </span>

        <span className='product-list-item-form-group'>
            <span className='flex-col flex-gap-half'>
                <QuantitySelect quantityRef={quantityRef} min={1} maxItems={maxItems} onChangeHandler={onChangeHandler} />

                <span>In cart: {getCurrentQuantity()}</span>
            </span>

            <span className='product-list-item-button-group'>
                <Button className='button' isDisabled={reachedQuantityLimit() || addToCartDisabled} clickHandler={addToCartClickHandler}>
                    Add to cart
                </Button>

                <Button className='button light-blue' isDisabled={removeFromCartDisabled} clickHandler={removeFromCartClickHandler}>
                    Remove
                </Button>
            </span>
        </span>
    </div>
}

export default ProductListItem;