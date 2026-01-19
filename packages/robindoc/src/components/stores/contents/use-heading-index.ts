"use client";

import { useContext } from "react";
import { CurrentHeadingContext } from "./context";

export const useHeadingIndex = () => {
    const headingIndex = useContext(CurrentHeadingContext);

    return headingIndex;
};
