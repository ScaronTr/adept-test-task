import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useObserver = <T extends HTMLElement>(callback: IntersectionObserverCallback) => {
    const [ref, setRef] = useState<T | null>(null);

    const observerRef = useRef(
        new IntersectionObserver(callback, {
            root: null,
            rootMargin: "0px",
            threshold: 1,
        }),
    );

    useEffect(() => {
        if (ref) {
            observerRef.current.observe(ref);
        }
    }, [ref]);

    const setObserverElementRef = (element: T) => {
        if (element) setRef(element);
    };

    return {
        setObserverElementRef,
    };
};
