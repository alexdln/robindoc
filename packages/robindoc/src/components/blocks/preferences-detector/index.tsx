"use client";

import React, { useEffect } from "react";

import { getTheme } from "@src/core/helpers/theme";
import { getTabs } from "@src/core/helpers/tabs";

const clientLogic = (theme: string, tabs: string[]) => {
    const root = document.querySelector(".r-root");

    if (!root || root.classList.contains("r-ready")) return;

    root.classList.forEach((className) => {
        if (className.startsWith(`r-theme-`) || className.startsWith(`r-tabs-global`)) {
            root.classList.remove(className);
        }
    });

    root.classList.add("r-ready");
    if (theme && ["light", "dark"].includes(theme)) {
        root.classList.add(`r-theme-${theme}`);
    } else {
        root.classList.add(`r-theme-system`);
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            root.classList.add("r-theme-dark");
        } else {
            root.classList.add("r-theme-light");
        }
    }

    tabs.forEach((item) => {
        const [tabsKey, tab] = item.split("=");
        root.classList.add(`r-tabs-global__${tabsKey}`, `r-tabs-global__${tabsKey}_${tab}`);
    });
};

export const PreferencesDetector: React.FC = () => {
    useEffect(() => {
        const root = document.querySelector(".r-root");
        if (!root || root.classList.contains("r-ready")) return;
        clientLogic(getTheme(), getTabs());

        return () => {
            root.classList.forEach((className) => {
                if (className.startsWith("r-theme-") || className.startsWith("r-tabs-global")) {
                    root.classList.remove(className);
                }
            });
        };
    }, []);

    return (
        <script
            id="detect-preferences"
            dangerouslySetInnerHTML={{
                __html: `(${clientLogic})((${getTheme})(), (${getTabs})())`,
            }}
            async
        />
    );
};
