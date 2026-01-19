"use client";

import { useCallback, useContext } from "react";

import { type AddListener, type RemoveListener } from "./types";
import { NavigateContext } from "./context";

export const useNavigate = () => {
    const listeners = useContext(NavigateContext);

    const addListener: AddListener = useCallback((key, listener) => {
        const prevKeyListener = listeners.findIndex((el) => el.key === key);
        if (prevKeyListener !== -1) {
            listeners.splice(prevKeyListener, 1);
        }
        listeners.push({ key, listener });
    }, []);

    const removeListener: RemoveListener = useCallback((key) => {
        const prevKeyListener = listeners.findIndex((el) => el.key === key);
        if (prevKeyListener !== -1) {
            listeners.splice(prevKeyListener, 1);
        }
    }, []);

    return { listeners, addListener, removeListener };
};
