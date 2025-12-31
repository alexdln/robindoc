"use client";

import React, { useEffect } from "react";

const clientLogic = () => {
    const root = document.querySelector(".r-root");

    if (!root) return;

    const userTheme = localStorage.getItem("theme");
    if (userTheme && ["light", "dark"].includes(userTheme)) {
        root.classList.add(`r-theme-${userTheme}`);
    } else {
        root.classList.add(`r-theme-system`);
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            root.classList.add("r-theme-dark");
        } else {
            root.classList.add("r-theme-light");
        }
    }

    const store = localStorage.getItem("r-tabs");
    const items = store?.split(";").filter((item) => item && /[\w-]+=[\w]+/.test(item)) || [];
    const classNames = Array.from(root.classList);
    classNames.forEach((className) => {
        if (className.startsWith(`r-tabs-global`)) {
            root.classList.remove(className);
        }
    });
    items.forEach((item) => {
        const [tabsKey, tab] = item.split("=");
        root.classList.add(`r-tabs-global__${tabsKey}`, `r-tabs-global__${tabsKey}_${tab}`);
    });
    root.classList.add("r-ready");
};

export const ThemeDetector: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(".r-root");
        if (!root || root.classList.contains("r-ready")) return;
        clientLogic();

        return () => {
            root.classList.remove("r-ready");
        };
    }, []);

    return (
        <script
            id="detect-theme"
            dangerouslySetInnerHTML={{
                __html: `(${clientLogic})()`,
            }}
            async
        />
    );
};
