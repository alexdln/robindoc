"use client";

import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "@src/components/stores/navigate/use-navigate";
import { ReferenceProvider } from "@src/components/stores/reference/provider";

export type SidebarMenuProps = React.PropsWithChildren<{
    translations?: {
        menu?: string;
    };
}>;

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ children, translations }) => {
    const { menu = "Menu" } = translations || {};
    const { addListener, removeListener } = useNavigate();
    const [opened, setOpened] = useState(false);
    const sidebarNavRef = useRef<HTMLElement | null>(null);

    const openHandler = () => {
        const rootElement = document.querySelector<HTMLElement>(".r-root");
        rootElement?.classList.add("body-mobile-lock");
        setOpened(true);
        addListener("closeSidebarMenu", closeHandler);
    };

    const closeHandler = () => {
        const rootElement = document.querySelector<HTMLElement>(".r-root");
        rootElement?.classList.remove("body-mobile-lock");
        setOpened(false);
        removeListener("closeSidebarMenu");
    };

    const toggleHandler = () => {
        if (opened) {
            closeHandler();
        } else {
            openHandler();
        }
    };

    useEffect(
        () => () => {
            closeHandler();
        },
        [],
    );

    return (
        <div className="r-sidebar">
            <input
                type="checkbox"
                id="sidebar-input"
                className="r-sidebar-input"
                hidden
                onChange={toggleHandler}
                checked={opened}
            />
            <label htmlFor="sidebar-input" className="r-sidebar-btn" role="button" tabIndex={0}>
                <svg
                    className="r-sidebar-chevron"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
                <span>{menu}</span>
            </label>
            <nav ref={sidebarNavRef} className="r-sidebar-nav" id="navigation">
                <ReferenceProvider reference={sidebarNavRef}>{children}</ReferenceProvider>
            </nav>
        </div>
    );
};
