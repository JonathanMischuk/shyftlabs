import ProductListItems from './components/ProductListItems';
import "./styles.scss";

// root route component
function ProductList() {
    return <div className="content">
        <h1>Product List</h1>

        <ProductListItems />
    </div>
}

export default ProductList;