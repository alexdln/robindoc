import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import { lexer, type Tokens, type Token } from "marked";
import { dirname, join } from "path";

import { type BlockquoteType } from "@src/components/ui/blockquote";
import { parseTokenText } from "@src/core/utils/content-tools";

import { type PagesType } from "./types";

export type AnchorData = {
    title: string;
    id: string;
    nested: boolean;
    token: Token;
};

export const parseMarkdown = (content: string) => {
    const { content: matterContent } = matter(content);
    const tokens = lexer(matterContent.trim());

    const slugger = new GithubSlugger();
    const headings = tokens.reduce<AnchorData[]>((acc, token) => {
        if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
            const title = parseTokenText(token);
            acc.push({
                title,
                id: slugger.slug(title),
                token,
                nested: token.depth === 3,
            });
        }
        return acc;
    }, []);

    return { tokens, headings };
};

export const formatId = (raw: string) => {
    return raw.toLowerCase().replace(/\W/g, "_").replace(/_+/g, "_");
};

export const validateComponentName = (name: string) => {
    return /^[A-Z][a-zA-Z0-9]+$/.test(name);
};

export const parseCodeLang = (raw: string) => {
    let configuration: { [key: string]: string | boolean } = {};
    let lang: string = raw;

    const match = raw.match(/[a-z]+=("[^"]+"|'[^']+'|[^ ]+)|[a-z]+/g);
    if (Array.isArray(match)) {
        const [language, ...modifiers] = match as string[];
        lang = language;
        configuration = modifiers.reduce<{ [key: string]: string | boolean }>((acc, cur) => {
            const [key, ...value] = cur.split("=");
            if (value) {
                acc[key] = value.length === 0 ? true : value.join("=").replace(/(^["']|['"]$)/g, "");
            } else {
                acc[key] = true;
            }
            return acc;
        }, {});
    }
    return { lang, configuration };
};

export const isNewCodeToken = (
    token: Token | Token[],
    codeQueue: { [lang: string]: { element: React.ReactNode; tabName: string } },
) => {
    if (Array.isArray(token) || !Object.keys(codeQueue).length) return false;

    if (token.type === "code") {
        const { lang, configuration } = parseCodeLang(token.lang);
        const tabKey = typeof configuration.tab === "string" ? formatId(configuration.tab) : lang;
        if (codeQueue[tabKey] || !configuration.switcher) return true;
    }

    if (token.type !== "space" && token.type !== "code") return true;

    return false;
};

export const formatLinkHref = (href: string, currentPathname: string, pages?: PagesType) => {
    let finalHref: string = href;
    const external = /^(https?:\/\/|\/)/.test(href);

    if (pages && !external) {
        const currentPageData = pages.find((item) => item.clientPath === currentPathname);

        if (currentPageData) {
            const [, linkMain, linkAdditional] = href.match(/^([^?#]+)([?#].+)?/) || [href, href];
            const linkOrigPath = join(dirname(currentPageData.origPath), linkMain).replace(/\\/g, "/");
            const linkData = pages.find((item) => item.origPath === linkOrigPath);

            if (linkData) {
                finalHref = linkData.clientPath + (linkAdditional || "");
            } else {
                console.error(`Can not find link to internal file: "${href}"`);
                finalHref = "";
            }
        } else {
            throw new Error("Can not find requested page in parsed data");
        }
    }
    return { href: finalHref, external };
};

export const parseBlockqoute = (token: Tokens.Blockquote | Tokens.Generic) => {
    const typeMatch = token.raw.match(/^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\n/);
    if (typeMatch) {
        const [raw, type] = typeMatch;
        const newToken = { ...token, raw: token.raw.substring(raw.length) };
        if (newToken.tokens) {
            const firstToken = { ...newToken.tokens[0] } as Tokens.Paragraph;
            firstToken.raw = firstToken.raw.substring(type.length + 4);
            firstToken.text = firstToken.text.substring(type.length + 4);
            if (firstToken.tokens[0]) {
                const firstSubtoken = { ...firstToken.tokens[0] } as Tokens.Paragraph;
                firstSubtoken.raw = firstSubtoken.raw.substring(type.length + 4);
                firstSubtoken.text = firstSubtoken.text.substring(type.length + 4);
                firstToken.tokens[0] = firstSubtoken;
            }
            newToken.tokens[0] = firstToken;
        }

        return {
            token: newToken,
            type: type.toLowerCase() as BlockquoteType,
        };
    }

    return { token, type: null };
};
