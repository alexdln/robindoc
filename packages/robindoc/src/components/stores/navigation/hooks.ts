"use client";

import { useContext } from "react";
import { NavigationContext } from "./contexts";

export const usePathname = () => {
    const { usePathname: usePathnameContext } = useContext(NavigationContext);

    return usePathnameContext();
};

export const useLink = () => {
    const { link } = useContext(NavigationContext);

    return link;
};
