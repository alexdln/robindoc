"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { CurrentHeadingContext, HeadingsContext } from "./context";

export const ContentsProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const headings = useRef<HTMLHeadingElement[]>([]);

    const updateTargetSection = useCallback((rootElement: HTMLElement) => {
        if (rootElement.scrollTop + 20 > rootElement.scrollHeight - window.innerHeight) {
            setActiveIndex(headings.current.length - 1);
        } else {
            const headingIndex = headings.current.findLastIndex((el) => el.offsetTop < rootElement.scrollTop + 100);
            if (
                rootElement.scrollTop + 100 > rootElement.scrollHeight - window.innerHeight &&
                headingIndex < headings.current.length - 2
            ) {
                setActiveIndex(headings.current.length - 2);
            } else {
                setActiveIndex(headingIndex);
            }
        }
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
                    updateTargetSection(rootElement);
                    scheduledAnimationFrame = false;
                }, 100);
            }
        };

        updateTargetSection(rootElement);
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
