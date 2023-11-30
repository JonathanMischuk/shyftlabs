import { useRef, useState, useEffect } from 'react';

/*
logic behind "infinite" scrolling. uses an intersection observer
object to detect when the last element on the page is 50% within
the viewport - threshold: 0.5.
a value of 1 was proving to be a little unreliable, might want to
come back to this at some point.
*/
const useIntersectionObserver = () => {
    const observerRef = useRef(null);
    // refCache is here to preserve the reference in case
    // it is destroyed before the unmount cycle occurs
    const refCache = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);
    
    useEffect(() => {
        if (!refCache.current) refCache.current = observerRef.current;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsIntersecting(true);
            else setIsIntersecting(false);
        }, { threshold: 0.5 });
        
        if (observerRef.current) observer.observe(observerRef.current);
      
        return () => {
            if (refCache.current) observer.unobserve(refCache.current);
        };
    }, [observerRef]);

    return { observerRef, isIntersecting };
};

export default useIntersectionObserver;