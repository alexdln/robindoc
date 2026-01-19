"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { NavigationContext } from "robindoc/lib/components/stores/navigation/contexts";

export const NavigationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <NavigationContext.Provider value={{ usePathname, link: Link }}>{children}</NavigationContext.Provider>;
};
