"use client";

import React, { useRef } from "react";
import clsx from "clsx";

import { useReference } from "@src/components/stores/reference/use-reference";
import { NavLink } from "@src/components/blocks/nav-link";
import { usePathname } from "@src/components/stores/navigation/hooks";

import { type TreeItem } from "../types";
import { checkIsTargetPathname, collectItems } from "../tools";

type SidebarLinkProps = {
    branch: Exclude<TreeItem, { type: "separator" }> & { href: string };
};

export const SidebarLink: React.FC<SidebarLinkProps> = ({ branch }) => {
    const pathname = usePathname();
    const isActive = checkIsTargetPathname(branch.href, pathname);
    const isTarget = collectItems(branch).includes(pathname);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const sidebar = useReference();

    return (
        <NavLink
            href={branch.href}
            className={clsx("r-sidebar-link", isActive && "_active", isTarget && "_target")}
            ref={(node) => {
                if (isTarget && sidebar && sidebar.scrollHeight > window.innerHeight - 60) {
                    scrollTimeoutRef.current = null;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (node as any)?.parentElement?.scrollIntoViewIfNeeded?.();
                }
            }}
        >
            {branch.title}
        </NavLink>
    );
};
