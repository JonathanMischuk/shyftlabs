import { useState } from 'react';
import { MAX_PRODUCT_DESCRIPTION_CHARACTER_LENGTH } from '../../../config';

function ProductListItemDescription({ description }) {
    const descriptionLengthOverLimit = description.length > MAX_PRODUCT_DESCRIPTION_CHARACTER_LENGTH;
    const [showAll, setShowAll] = useState(!descriptionLengthOverLimit);
    const formattedDescription = description.substring(0, MAX_PRODUCT_DESCRIPTION_CHARACTER_LENGTH);

    const renderFormattedDescription = () => {
        return <>
            {formattedDescription}...
            <button className='show-description-button' onClick={() => setShowAll(true)}>show more</button>
        </>
    };

    const renderFullDescription = () => {
        return <>
            {description}
            {descriptionLengthOverLimit && <button className='show-description-button' onClick={() => setShowAll(false)}>show less</button>}
        </>
    };

    return <span className='flex-col'>
        {!showAll ? renderFormattedDescription() : renderFullDescription()}
    </span>
}

export default ProductListItemDescription;