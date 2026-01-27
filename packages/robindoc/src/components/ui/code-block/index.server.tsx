import React, { cache, use } from "react";
import { createHighlighter, type BuiltinLanguage } from "shiki";
import clsx from "clsx";

import { CodeSpan } from "../code-span";
import { githubDynamic } from "./theme";

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
    highlighter.loadTheme(githubDynamic);
    const loadedLanguages = highlighter.getLoadedLanguages();

    if (!loadedLanguages.includes(language)) {
        await highlighter.loadLanguage(language);
    }

    return highlighter;
});

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang, className, inline }) => {
    const highlighter = use(getHighlighter(lang));

    const html = highlighter.codeToHtml(code, {
        lang,
        theme: "github-dynamic",
        structure: "inline",
    });

    if (inline) return <CodeSpan dangerouslySetInnerHTML={{ __html: html }} />;

    return <pre className={clsx("r-code-block", className)} dangerouslySetInnerHTML={{ __html: html }} />;
};
