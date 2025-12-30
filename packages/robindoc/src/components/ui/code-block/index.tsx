import React, { cache } from "react";
import { createHighlighter, type BuiltinLanguage } from "shiki";
import clsx from "clsx";

import { githubDynamic } from "./theme";
import { CodeSpan } from "../code-span";

import "./code-block.scss";

export interface CodeBlockProps {
    code: string;
    lang: BuiltinLanguage;
    className?: string;
    inline?: boolean;
}

const initBaseHighlighter = async () => {
    const highlighter = await createHighlighter({ langs: [], themes: [] });
    await highlighter.loadTheme(githubDynamic);
    return highlighter;
};

const highlighterPromise = initBaseHighlighter();

const getHighlighter = cache(async (language: BuiltinLanguage) => {
    const highlighter = await highlighterPromise;
    const loadedLanguages = highlighter.getLoadedLanguages();

    if (!loadedLanguages.includes(language)) {
        await highlighter.loadLanguage(language);
    }

    return highlighter;
});

export const CodeBlock: React.FC<CodeBlockProps> = async ({ code, lang, className, inline }) => {
    const highlighter = await getHighlighter(lang);
    await highlighter.loadTheme(githubDynamic);

    const html = highlighter.codeToHtml(code, {
        lang,
        theme: "github-dynamic",
        structure: "inline",
    });

    if (inline) return <CodeSpan code={html} />;

    const Component = inline ? "code" : "pre";

    return (
        <Component
            className={clsx(inline ? "r-code-span" : "r-code-block", className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};
