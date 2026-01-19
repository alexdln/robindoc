"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { NavigationContext } from "robindoc/lib/client";

export const NavigationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <NavigationContext.Provider value={{ usePathname, link: Link }}>{children}</NavigationContext.Provider>;
};
