import { type BuiltinLanguage } from "shiki";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki/bundle/web";

import { githubDynamic } from "./theme";

export async function highlight(code: string, lang: BuiltinLanguage) {
    const out = await codeToHast(code, {
        lang,
        theme: githubDynamic,
        structure: "inline",
    });

    return toJsxRuntime(out, {
        Fragment,
        jsx,
        jsxs,
    }) as React.ReactElement;
}
