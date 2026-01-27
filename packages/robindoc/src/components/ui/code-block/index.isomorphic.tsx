import React, { lazy, Suspense } from "react";

import { type BuiltinLanguage } from "shiki";

import { CodeBlock as CodeBlockServer } from "./index.server";

import "./code-block.scss";

export interface CodeBlockProps {
    code: string;
    lang: BuiltinLanguage;
    className?: string;
    inline?: boolean;
}
const CodeBlockClient = lazy(() => import("./index.client").then((module) => ({ default: module.CodeBlock })));

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang, className, inline }) => {
    if ("useState" in React) {
        return (
            <Suspense fallback={<pre>{code}</pre>}>
                <CodeBlockClient code={code} lang={lang} className={className} inline={inline} />
            </Suspense>
        );
    }

    return <CodeBlockServer code={code} lang={lang} className={className} inline={inline} />;
};
