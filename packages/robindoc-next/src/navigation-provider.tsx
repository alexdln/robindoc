"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { NavigationContext } from "robindoc/lib/client";

/**
 * Next.js navigation provider for Robindoc.
 * Wraps the app to provide Next.js-specific navigation context (usePathname, Link).
 *
 * @example
 * ```tsx
 * import { NavigationProvider } from "@robindoc/next";
 *
 * export default function Layout({ children }) {
 *   return <NavigationProvider>{children}</NavigationProvider>;
 * }
 * ```
 *
 * @see {@link https://robindoc.com/docs/getting-started/nextjs-integration Next.js integration}
 */
export const NavigationProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <NavigationContext.Provider value={{ usePathname, link: Link }}>{children}</NavigationContext.Provider>;
};
