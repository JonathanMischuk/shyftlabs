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
    const reachedQuantityLimit = () => getCurrentCartQuantity() >= MAX_SELECTABLE_ITEMS;
    
    const getCurrentCartQuantity = useCallback(() => {
        return hasOwnProperty(cart, id) ? Number(cart[id].quantity) : 0;
    }, [cart, id]);
    
    const hasItemsInCart = getCurrentCartQuantity() > 0;
    
    // intended to enable or disable add to cart and remove from cart buttons
    // on state change if selected quantity is greater than MAX_SELECTABLE_ITEMS or
    // less than 0
    useEffect(() => {
        const currentCartQuantity = getCurrentCartQuantity();

        if (currentCartQuantity === 0 || selectedQuantity > currentCartQuantity) setRemoveFromCartDisabled(true);
        else setRemoveFromCartDisabled(false);

        if (currentCartQuantity + selectedQuantity > MAX_SELECTABLE_ITEMS) setAddToCartDisabled(true);
        else setAddToCartDisabled(false);
    }, [cart, selectedQuantity, getCurrentCartQuantity]);

    const onChangeHandler = () => {
        setSelectedQuantity(Number(quantityRef.current.value));
    };

    const addToCartClickHandler = () => {
        const selectedQuantity = Number(quantityRef.current.value);
        const currentCartQuantity = getCurrentCartQuantity();
        
        // make sure sum is not more than item limit
        const sum = selectedQuantity + currentCartQuantity;
        if (currentCartQuantity >= MAX_SELECTABLE_ITEMS || sum > MAX_SELECTABLE_ITEMS) return;
        
        // don't dispatch if value is zero
        if (selectedQuantity > 0) dispatch(addToCart({ title, description, price, id, quantity: selectedQuantity, image }));
    };

    const removeFromCartClickHandler = () => {
        const selectedQuantity = Number(quantityRef.current.value || 1);
        const currentCartQuantity = getCurrentCartQuantity();

        // similar to logic for addToCartClickHandler
        const difference = currentCartQuantity - selectedQuantity;
        if (currentCartQuantity <= 0 || difference < 0) return;

        if (selectedQuantity > 0) dispatch(removeFromCart({ id, quantity: selectedQuantity }));
    };

    return <div className="product-list-item">
        <span>
            <h3>{title}</h3>
            <span className='product-list-item-image'><img src={image} alt="" /></span>
            <p><ProductListItemDescription description={description} /></p>
            <p className='bold'>Price: ${price}</p>
        </span>

        <span className='product-list-item-form-group'>
            <span className='flex-col flex-gap-half'>
                <QuantitySelect quantityRef={quantityRef} min={1} onChangeHandler={onChangeHandler} />

                <span className={hasItemsInCart ? 'highlight' : 'normal'}>In cart: {getCurrentCartQuantity()}</span>
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