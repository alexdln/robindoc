"use client";

import React, { useEffect, useRef } from "react";

import { type NavigateListener } from "./types";
import { NavigateContext } from "./context";

export const NavigateProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const listenersRef = useRef<NavigateListener[]>([]);

    useEffect(() => {
        const popStateHandler = () => {
            listenersRef.current.forEach((el) => el.listener());
        };
        window.addEventListener("popstate", popStateHandler);

        return () => {
            window.removeEventListener("popstate", popStateHandler);
        };
    }, []);

    return <NavigateContext.Provider value={listenersRef.current}>{children}</NavigateContext.Provider>;
};
