"use client";

import { createContext } from "react";

export const HeadingsContext = createContext<HTMLHeadingElement[]>([]);
export const CurrentHeadingContext = createContext<{ from: number; to: number }>({ from: 0, to: 0 });
