import { useRef, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../../state/slices/cartSlice';
import ProductListItemDescription from './ProductListItemDescription';
import Button from '../../../components/Button/Button';
import QuantitySelect from '../../../components/QuantitySelect/QuantitySelect';
import { hasOwnProperty } from '../../../utils';
import { MAX_SELECTABLE_ITEMS } from '../../../config';

function ProductListItem({ title, description, price, id, image }) {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const quantityRef = useRef(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [addToCartDisabled, setAddToCartDisabled] = useState(false);
    const [removeFromCartDisabled, setRemoveFromCartDisabled] = useState(false);
    const reachedQuantityLimit = () => getCurrentQuantity() >= MAX_SELECTABLE_ITEMS;

    const getCurrentQuantity = useCallback(() => {
        return hasOwnProperty(cart, id) ? Number(cart[id].quantity) : 0;
    }, [cart, id]);

    // intended to enable or disable add to cart and remove from cart buttons
    // on state change if selected quantity is greater than MAX_SELECTABLE_ITEMS or
    // less than 0
    useEffect(() => {
        const _currentQuantity = getCurrentQuantity();

        if (_currentQuantity === 0 || selectedQuantity > _currentQuantity) setRemoveFromCartDisabled(true);
        else setRemoveFromCartDisabled(false);

        if (_currentQuantity + selectedQuantity > MAX_SELECTABLE_ITEMS) setAddToCartDisabled(true);
        else setAddToCartDisabled(false);
    }, [cart, selectedQuantity, getCurrentQuantity]);

    const onChangeHandler = () => {
        setSelectedQuantity(Number(quantityRef.current.value));
    };

    const addToCartClickHandler = () => {
        let quantity = Number(quantityRef.current.value);
        const _currentQuantity = getCurrentQuantity();
        
        // make sure sum is not more than item limit
        const sum = quantity + _currentQuantity;
        if (_currentQuantity >= MAX_SELECTABLE_ITEMS || sum > MAX_SELECTABLE_ITEMS) return;
        
        // don't dispatch if value is zero
        if (quantity > 0) dispatch(addToCart({ title, description, price, id, quantity, image }));
    };

    const removeFromCartClickHandler = () => {
        let _quantity = Number(quantityRef.current.value || 1);
        const _currentQuantity = getCurrentQuantity();

        // similar to logic for addToCartClickHandler
        const difference = _currentQuantity - _quantity;
        if (_currentQuantity <= 0 || difference < 0) return;

        if (_quantity > 0) dispatch(removeFromCart({ id, quantity: _quantity }));
    };

    return <div className="product-list-item">
        <span>
            <h3>{title}</h3>
            <img src={image} alt="" />
            <p><ProductListItemDescription description={description} /></p>
            <p className='bold'>Price: ${price}</p>
        </span>

        <span className='product-list-item-form-group'>
            <span className='flex-col flex-gap-half'>
                <QuantitySelect quantityRef={quantityRef} min={1} onChangeHandler={onChangeHandler} />

                <span>In cart: {getCurrentQuantity()}</span>
            </span>

            <span className='product-list-item-button-group'>
                <Button isDisabled={reachedQuantityLimit() || addToCartDisabled} clickHandler={addToCartClickHandler}>
                    Add to cart
                </Button>

                <Button className='light-blue' isDisabled={removeFromCartDisabled} clickHandler={removeFromCartClickHandler}>
                    Remove
                </Button>
            </span>
        </span>
    </div>
}

export default ProductListItem;