import { useEffect, useRef, useState } from "react";

export function useReveal(options = {}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.18, ...options }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [options]);

    return { ref, visible };
}

export default function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
    const { ref, visible } = useReveal();
    const delayClass = delay ? `reveal-delay-${delay}` : "";
    return (
        <Tag
            ref={ref}
            className={`reveal ${delayClass} ${visible ? "is-visible" : ""} ${className}`}
        >
            {children}
        </Tag>
    );
}
