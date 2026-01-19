"use client";

import { createContext } from "react";

export const ReferenceContext = createContext<React.MutableRefObject<HTMLElement | null>>({ current: null });
