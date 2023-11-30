import { MAX_SELECTABLE_ITEMS } from '../../config';
import './styles.scss';

function QuantitySelect({ quantityRef, min = 0, defaultValue = 1, onChangeHandler = () => {} }) {
    const amount = min === 0 ? MAX_SELECTABLE_ITEMS + 1 : MAX_SELECTABLE_ITEMS;
    const quantityElements = new Array(amount).fill(null);

    return <span className='quantity-select flex-col flex-gap-half'>
        <span className='title'>Quantity:</span>

        <select defaultValue={defaultValue} name="quantity" id="quantity" ref={quantityRef} onChange={onChangeHandler}>
            {quantityElements.map((_, i) => <option key={i} value={i + min}>{i + min}</option>)}
        </select>
    </span>
}

export default QuantitySelect;