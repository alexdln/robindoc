"use client";

import { useEffect, useRef, useState } from "react";

export const VisibleWrapper: React.FC<React.PropsWithChildren<{ className: string }>> = ({ className, children }) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.6 });
        observer.observe(ref.current as Element);

        return () => {
            if (ref.current) observer.unobserve(ref.current as Element);
        };
    }, []);

    return (
        <div className={`${className} ${visible ? "_visible" : "_unvisible"}`} ref={ref}>
            {children}
        </div>
    );
};
