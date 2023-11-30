import './styles.scss';

function QuantitySelect({ quantityRef, maxItems, min = 0, currentItemAmount = 1, onChangeHandler = () => {} }) {
    const quantityElements = new Array(maxItems).fill(null);

    return <span className='quantity-select flex-col flex-gap-half'>
        <span className='title'>Quantity:</span>

        <select defaultValue={currentItemAmount} name="quantity" id="quantity" ref={quantityRef} onChange={onChangeHandler}>
            {quantityElements.map((_, i) => <option key={i} value={i + min}>{i + min}</option>)}
        </select>
    </span>
}

export default QuantitySelect;