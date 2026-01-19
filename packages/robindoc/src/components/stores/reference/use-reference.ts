"use client";

import { useContext } from "react";

import { ReferenceContext } from "./context";

export const useReference = () => {
    const reference = useContext(ReferenceContext);

    return reference.current;
};
