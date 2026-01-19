"use client";

import { useCallback, useContext } from "react";
import { HeadingsContext } from "./context";

export const useHeadingRegister = () => {
    const headings = useContext(HeadingsContext);

    const headingRegister = useCallback((ref: HTMLHeadingElement) => {
        if (ref?.id && !headings.find((el) => el.id === ref.id)) {
            headings.push(ref);
        }
    }, []);

    return headingRegister;
};
