import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToList } from "../../state/slices/productsSlice";
import ProductListItem from "./components/ProductListItem";
import FetchError from "../../components/FetchError/FetchError";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { getProductsLimit } from "../../services/fakeStore";
import { PAGINATION_LIMIT, MAX_PAGINATION_ITEMS } from "../../config";
import "./styles.scss";

// root route component
function ProductList() {
    const dispatch = useDispatch();
    const firstRunRef = useRef(true);
    const { isIntersecting, observerRef } = useIntersectionObserver();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const productsList = useSelector(state => state.productsList);

    // memoize the following functions that are used inside a useeffect
    const lessThanMaxPaginationItems = useCallback(() => {
        const nextCount = productsList.length + PAGINATION_LIMIT;
        return nextCount <= MAX_PAGINATION_ITEMS;
    }, [productsList.length]);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const { error, response } = await getProductsLimit(PAGINATION_LIMIT);

        if (error) setError(error);
        if (response) {
            dispatch(addToList([...response]));
            setIsLoading(false);
        }
    }, [dispatch]);
    
    // prevent double loading products on mount. React StrictMode causes a double render of
    // pure components in development mode. However, using this condition will prevent
    // double loading if something else is the cause as well.
    useEffect(() => {
       if (firstRunRef.current && !isLoading && productsList.length === 0) {
            firstRunRef.current = false;
            fetchProducts();
        } else {
            setIsLoading(false);
        }
    }, [fetchProducts]); 

    // managing "infinite" scrolling and pagination logic
    // and side effects with an observer intersection
    useEffect(() => {
        if (isIntersecting && !isLoading && lessThanMaxPaginationItems()) {
            fetchProducts();
        }
    }, [fetchProducts, isIntersecting, lessThanMaxPaginationItems]);

    return <div className="content">
        <h1>Product List</h1>
        <span className="product-list-item-count">Showing {productsList.length} of 100</span>

        {error && <FetchError />}

        <div className="product-list-items">
            {productsList.map((product, i) => {
                return <ProductListItem key={i} {...product} />
            })}
        </div>

        {lessThanMaxPaginationItems() && <div className="product-list-items-observer" ref={observerRef}></div>}
        {!lessThanMaxPaginationItems() && <span className="product-list-items-end">That's it! No other items in stock.</span>}
    </div>
}

export default ProductList;