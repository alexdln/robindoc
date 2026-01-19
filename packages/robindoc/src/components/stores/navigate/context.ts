"use client";

import { createContext } from "react";

import { type NavigateContextType } from "./types";

export const NavigateContext = createContext<NavigateContextType>([]);
