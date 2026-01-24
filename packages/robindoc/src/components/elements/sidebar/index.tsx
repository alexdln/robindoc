import React from "react";
import clsx from "clsx";

import { type TreeItem } from "./types";
import { SidebarMenu } from "./sidebar-menu";
import { SidebarDrop } from "./sidebar-drop";
import { SidebarLink } from "./sidebar-link";
import { collectItems, isActiveItem } from "./tools";

import "./sidebar.scss";

type LinkBranchProps = {
    branch: TreeItem;
    depth: number;
    translations?: {
        /** Expand {title} */
        expandTitle?: string;
    };
};

const LinkBranch: React.FC<LinkBranchProps> = ({ branch, depth, translations }) => {
    const { expandTitle = "Expand {title}" } = translations || {};

    if (branch.type === "separator") {
        return <li className="r-sidebar-li _separator" />;
    }

    return (
        <li
            className={clsx(
                "r-sidebar-li",
                branch.type === "heading" && "r-sidebar-heading",
                branch.items && branch.items.length > 0 && "_droppable",
            )}
        >
            {isActiveItem(branch) ? (
                <SidebarLink branch={branch} />
            ) : (
                <p className={clsx("r-sidebar-p", branch.type === "heading" && "r-sidebar-heading")}>{branch.title}</p>
            )}
            {branch.items && branch.items.length > 0 && (
                <SidebarDrop
                    childHrefs={collectItems(branch)}
                    defaultOpen={false}
                    id={branch.href + branch.title}
                    label={expandTitle.replace("{title}", branch.title)}
                >
                    {branch.items.map((item, index) => (
                        <LinkBranch
                            branch={item}
                            key={item.type === "separator" ? `sep${index}` : item.href + item.title}
                            depth={depth >= 4 ? 4 : depth + 1}
                            translations={translations}
                        />
                    ))}
                </SidebarDrop>
            )}
        </li>
    );
};

export type SidebarProps = {
    tree?: TreeItem[] | null;
    translations?: LinkBranchProps["translations"];
};

/**
 * Sidebar component for documentation navigation.
 * Renders a hierarchical navigation menu based on the documentation structure.
 *
 * @see {@link https://robindoc.com/docs/customization/elements/sidebar Sidebar customization}
 */
export const Sidebar: React.FC<SidebarProps> = ({ tree, translations }) => {
    if (!tree?.length) return <div className="r-sidebar" />;

    return (
        <>
            <div className="r-sidebar-top-mock" />
            <SidebarMenu>
                <ul className="r-sidebar-list">
                    {tree.map((item, index) => (
                        <LinkBranch
                            branch={item}
                            key={item.type === "separator" ? `sep${index}` : item.href + item.title}
                            depth={0}
                            translations={translations}
                        />
                    ))}
                </ul>
            </SidebarMenu>
        </>
    );
};
