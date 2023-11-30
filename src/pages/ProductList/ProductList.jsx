import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addedToList } from "../../state/slices/productsSlice";
import ProductListItem from "./components/ProductListItem";
import FetchError from "../../components/FetchError/FetchError";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { getProducts } from "../../services/fakeStore";
import "./styles.scss";

function ProductList() {
    const maxPaginationCount = 5;
    const dispatch = useDispatch();
    const firstRunRef = useRef(true);
    const { isIntersecting, observerRef } = useIntersectionObserver();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const productsList = useSelector(state => state.productsList);

    const fetchProducts = async () => {
        setIsLoading(true);
        setError(null);

        const { error, response } = await getProducts();

        if (error) setError(error);
        if (response) {
            dispatch(addedToList({ paginationCount: productsList.paginationCount + 1, products: [...response] }));
            setIsLoading(false);
        }
    };
    
    // prevent double loading products on mount. React StrictMode causes a double render of
    // pure components in development mode. However, using this condition will prevent
    // double loading if something else is the cause as well.
    useEffect(() => {
       if (firstRunRef.current && !isLoading && productsList.products.length === 0) {
            firstRunRef.current = false;
            fetchProducts();
        } else {
            setIsLoading(false);
        }
    }, []); 

    // managing pagination logic and side effects on observer intersection
    useEffect(() => {
        if (isIntersecting && !isLoading && productsList.paginationCount < maxPaginationCount) {
            fetchProducts();
        }
    }, [isIntersecting]);

    return <div className="content">
        <h1>Product List</h1>
        <span className="product-list-item-count">Showing {productsList.products.length} of 100</span>

        {error && <FetchError />}

        <div className="product-list-items">
            {productsList.products.map((product, i) => {
                return <ProductListItem key={i} {...product} />
            })}
        </div>

        {productsList.paginationCount < maxPaginationCount && <div className="product-list-items-observer" ref={observerRef}></div>}
    </div>
}

export default ProductList;