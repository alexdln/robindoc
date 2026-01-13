"use client";

import React, { useState } from "react";
import clsx from "clsx";

import { Tooltip } from "../tooltip";

import "./copy-text.scss";

export interface CopyTextProps {
    text: string;
    className?: string;
    translations?: {
        /** Filename Copied */
        filenameCopied?: string;
        /** Copy */
        copy?: string;
    };
}

export const CopyText: React.FC<CopyTextProps> = ({ translations, text, className }) => {
    const { filenameCopied = "Filename Copied", copy = "Copy" } = translations || {};
    const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);
    const clickHandler = () => {
        if (copyTimeout) clearTimeout(copyTimeout);
        setCopyTimeout(
            setTimeout(() => {
                setCopyTimeout(null);
            }, 1500),
        );
        navigator.clipboard.writeText(text);
    };

    return (
        <button
            tabIndex={-1}
            onClick={clickHandler}
            className={clsx("r-copy-text r-no-js _to-right", copyTimeout && "_active", className)}
            title={copy}
        >
            {text}
            <Tooltip position="bottom-start" visible={Boolean(copyTimeout)}>
                {filenameCopied}
            </Tooltip>
        </button>
    );
};
