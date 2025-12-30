"use client";

import React from "react";
import clsx from "clsx";
import { saveTab } from "@src/core/utils/tabs-tools";

export interface TabsHeaderProps {
    tabs: { name: string; id: string }[];
    tabsTypeId: string;
    type?: "code";
}

const typeClassNames = {
    code: "r-tab-header-code",
};

export const TabsHeader: React.FC<TabsHeaderProps> = ({ tabs, tabsTypeId, type }) => {
    const changeTabHandler = (tab: string) => {
        const rootElement = document.querySelector<HTMLElement>(".r-root");
        if (!rootElement) return;
        const classNames = Array.from(rootElement.classList);
        classNames.forEach((className) => {
            if (className.startsWith(`r-tabs-global__${tabsTypeId}`)) {
                rootElement.classList.remove(className);
            }
        });
        rootElement.classList.add(`r-tabs-global__${tabsTypeId}`, `r-tabs-global__${tabsTypeId}_${tab}`);
        saveTab(tabsTypeId, tab);
    };

    return (
        <div className="r-tabs-header">
            {tabs.map((tab) => (
                <div
                    key={tab.id}
                    className={clsx(`r-tab-header r-tab-header_${tab.id} r-no-js`, type && typeClassNames[type])}
                    onClick={() => changeTabHandler(tab.id)}
                >
                    {tab.name}
                </div>
            ))}
        </div>
    );
};
