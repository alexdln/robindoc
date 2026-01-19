"use client";

import React from "react";

import { ReferenceContext } from "./context";

export const ReferenceProvider: React.FC<
    React.PropsWithChildren<{ reference: React.MutableRefObject<HTMLElement | null> }>
> = ({ reference, children }) => {
    return <ReferenceContext.Provider value={reference}>{children}</ReferenceContext.Provider>;
};
