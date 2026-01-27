"use client";

import React, { useState, useLayoutEffect } from "react";
import { type BuiltinLanguage } from "shiki";
import clsx from "clsx";

import { CodeSpan } from "../code-span";
import { highlight } from "./shared";

import "./code-block.scss";

export interface CodeBlockProps {
    code: string;
    lang: BuiltinLanguage;
    className?: string;
    inline?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang, className, inline }) => {
    const [nodes, setNodes] = useState<React.ReactElement | null>(null);

    useLayoutEffect(() => {
        void highlight(code, lang).then(setNodes);
    }, []);

    if (inline) return <CodeSpan>{nodes}</CodeSpan>;

    return <pre className={clsx("r-code-block", className)}>{nodes}</pre>;
};
