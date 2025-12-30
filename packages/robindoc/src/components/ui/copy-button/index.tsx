"use client";

import React, { useState } from "react";
import clsx from "clsx";

import { Tooltip } from "../tooltip";

import "./copy-button.scss";

interface CopyButtonProps {
    raw: string;
    className?: string;
    translations?: {
        /** Copy */
        copy?: string;
        /** Code Copied */
        codeCopied?: string;
    };
}

export const CopyButton: React.FC<CopyButtonProps> = ({ translations, raw, className }) => {
    const { copy = "Copy", codeCopied = "Code Copied" } = translations || {};
    const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);
    const clickHandler = () => {
        if (copyTimeout) clearTimeout(copyTimeout);
        setCopyTimeout(
            setTimeout(() => {
                setCopyTimeout(null);
            }, 1500),
        );
        navigator.clipboard.writeText(raw);
    };

    return (
        <button
            tabIndex={-1}
            onClick={clickHandler}
            className={clsx("r-copy-button r-no-js", copyTimeout && "_active", className)}
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="r-copy-button-svg"
            >
                <title>{copy}</title>
                <g className="r-copy-button-success">
                    <path d="M20 6 9 17l-5-5" />
                </g>
                <g className="r-copy-button-base">
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                </g>
            </svg>
            <Tooltip position="bottom-end" visible={Boolean(copyTimeout)}>
                {codeCopied}
            </Tooltip>
        </button>
    );
};
