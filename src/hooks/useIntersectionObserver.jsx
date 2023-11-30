import { useRef, useState, useEffect } from 'react';

const useIntersectionObserver = () => {
    const observerRef = useRef(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsIntersecting(true);
            else setIsIntersecting(false);
        }, { threshold: 0.5 });
        
        if (observerRef.current) observer.observe(observerRef.current);
      
        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [observerRef]);

    return { observerRef, isIntersecting };
};

export default useIntersectionObserver;