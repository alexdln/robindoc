"use client";

import React, { useState } from "react";
import clsx from "clsx";

import { usePathname } from "@src/components/stores/navigation/hooks";

export interface SidebarDropProps {
    childHrefs: string[];
    defaultOpen?: boolean;
    label: string;
    id: string;
}

export const SidebarDrop: React.FC<React.PropsWithChildren<SidebarDropProps>> = ({ childHrefs, label, children }) => {
    const pathname = usePathname();
    const [openedByDefault] = useState(childHrefs.includes(pathname));

    return (
        <details
            className={clsx("r-sidebar-drop", !openedByDefault && "_starting-style")}
            open={openedByDefault ? true : undefined}
            ref={(node) => {
                if (node && childHrefs.includes(pathname)) {
                    node.open = true;
                }
            }}
        >
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
            <ul className="r-sidebar-list r-sidebar-sublist">{children}</ul>
        </details>
    );
};
