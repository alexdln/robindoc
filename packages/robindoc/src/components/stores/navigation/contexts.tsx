"use client";

import React, { createContext, useEffect, useState } from "react";
import { navigationStore } from "./stores";

const usePathnameDefault = () => {
    const [pathname, setPathname] = useState("/");

    useEffect(() => {
        setPathname(navigationStore.get());
        return navigationStore.subscribe(setPathname);
    }, []);

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
