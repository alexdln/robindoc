"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export interface SidebarDropProps {
    childHrefs: string[];
    defaultOpen?: boolean;
    label: string;
    id: string;
}

export const SidebarDrop: React.FC<React.PropsWithChildren<SidebarDropProps>> = ({ childHrefs, label, children }) => {
    const pathname = usePathname();
    const openedByDefault = childHrefs.includes(pathname);
    const [opened, setOpened] = useState(openedByDefault);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const detailsRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
        if (openedByDefault && !opened) setOpened(true);
        if (openedByDefault && detailsRef.current && !detailsRef.current?.open) detailsRef.current.open = true;
    }, [openedByDefault]);

    useEffect(() => {
        detailsRef.current?.style.setProperty(
            "--drop-height",
            (dropdownRef.current?.offsetHeight || 0).toString() + "px",
        );
    }, []);

    return (
        <details className="r-sidebar-drop" open={opened} ref={detailsRef}>
            <summary className="r-sidebar-drop-btn" aria-label={label}>
                <svg
                    className="r-sidebar-drop-icon"
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
            </summary>
            <ul className="r-sidebar-list r-sidebar-sublist" ref={dropdownRef}>
                {children}
            </ul>
        </details>
    );
};
