"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { CurrentHeadingContext, HeadingsContext } from "./context";

export const ContentsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState<{ from: number; to: number }>({ from: 0, to: 0 });
    const headings = useRef<HTMLHeadingElement[]>([]);

    const updateTargetSection = useCallback(() => {
        const fromIndex = headings.current.findLastIndex((el) => el.getBoundingClientRect().top < 40);
        const searchToStartIndex = fromIndex + 1;
        let toIndex = headings.current.length - 1;

        for (let i = searchToStartIndex; i < headings.current.length; i++) {
            if (headings.current[i].getBoundingClientRect().top > window.innerHeight) {
                toIndex = i - 1;
                break;
            }
        }

        setActiveIndex((prev) =>
            prev.from !== fromIndex || prev.to !== toIndex ? { from: fromIndex, to: toIndex } : prev,
        );
    }, []);

    useEffect(() => {
        let scheduledAnimationFrame = false;
        const rootElement = document.querySelector<HTMLElement>(".r-root");

        if (!rootElement) return;

        const scrollElement = rootElement === document.documentElement ? window : rootElement;

        const scrollHandler = () => {
            if (!scheduledAnimationFrame && window.innerWidth > 1080) {
                scheduledAnimationFrame = true;
                setTimeout(() => {
                    updateTargetSection();
                    scheduledAnimationFrame = false;
                }, 100);
            }
        };

        updateTargetSection();
        scrollElement.addEventListener("scroll", scrollHandler);

        return () => {
            scrollElement.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <HeadingsContext.Provider value={headings.current}>
            <CurrentHeadingContext.Provider value={activeIndex}>{children}</CurrentHeadingContext.Provider>
        </HeadingsContext.Provider>
    );
};
