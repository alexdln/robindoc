"use client";

import React, { createContext, useSyncExternalStore } from "react";

import { navigationStore } from "./stores";

const usePathnameDefault = () => {
    const pathname = useSyncExternalStore(navigationStore.subscribe, navigationStore.get, () => "");

    return pathname;
};

export const NavigationContext = createContext<{
    usePathname: () => string;
    link: (
        props: Omit<
            React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
            "href"
        > & {
            href: string;
        },
    ) => React.ReactNode;
}>({ usePathname: usePathnameDefault, link: (props) => <a {...props} /> });
