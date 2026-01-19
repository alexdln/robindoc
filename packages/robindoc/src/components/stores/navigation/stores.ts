"use client";

const getPathname = () => {
    if (typeof window === "undefined") return "/";
    return window.location.pathname;
};

export const createNavigationStore = () => {
    let pathname = getPathname();
    const listeners = new Set<(pathname: string) => void>();

    const notify = () => {
        pathname = getPathname();
        listeners.forEach((l) => l(pathname));
    };

    const subscribe = (listener: (pathname: string) => void) => {
        listeners.add(listener);
        return () => {
            listeners.delete(listener);
        };
    };

    const init = () => {
        if (typeof window === "undefined") return;

        const pushState = history.pushState;
        const replaceState = history.replaceState;

        history.pushState = (...args: Parameters<typeof history.pushState>) => {
            const ret = pushState.apply(history, args);
            window.dispatchEvent(new Event("locationchange"));
            return ret;
        };

        history.replaceState = (...args: Parameters<typeof history.replaceState>) => {
            const ret = replaceState.apply(history, args);
            window.dispatchEvent(new Event("locationchange"));
            return ret;
        };

        window.addEventListener("popstate", notify);
        window.addEventListener("locationchange", notify);
    };

    init();

    return {
        get: () => pathname,
        subscribe,
    };
};

export const navigationStore = createNavigationStore();
