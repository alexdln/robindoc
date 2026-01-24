import React from "react";
import clsx from "clsx";

import { TYPES_DATA } from "./data";

import "./blockquote.scss";

export type BlockquoteType = "note" | "tip" | "important" | "warning" | "caution";

export interface BlockquoteProps {
    className?: string;
    type?: BlockquoteType | null;
}

export const Blockquote: React.FC<React.PropsWithChildren<BlockquoteProps>> = ({ className, type, children }) => {
    const { icon: Icon, title } =
        type && type in TYPES_DATA ? TYPES_DATA[type] : ({} as { icon: undefined; title: undefined });

    return (
        <blockquote className={clsx("r-blockquote", type && `r-blockquote-${type}`, className)}>
            {title && Icon && (
                <p className="r-blockquote-title">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="r-blockquote-icon"
                    >
                        <Icon />
                    </svg>
                    {title}
                </p>
            )}
            {children}
        </blockquote>
    );
};
