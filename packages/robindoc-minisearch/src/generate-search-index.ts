import { writeFile, mkdir } from "fs/promises";
import { lexer, type Token } from "marked";
import { dirname } from "path";
import MiniSearch from "minisearch";
import matter from "gray-matter";

import { type GetPageDataFunction, type GetStaticParamsFunction, type SearchIndexItem } from "./types";

const parseTokenText = (token: Token): string => {
    if (!token) return "";

    if ("tokens" in token) {
        return token.tokens?.map((el: Token) => parseTokenText(el)).join("") || "";
    }

    if ("text" in token) {
        return token.text;
    }

    if ("raw" in token) {
        return token.raw;
    }

    return "";
};

const parseMarkdownContent = (rawContent: string) => {
    const { content: matterContent, data: matterData } = matter(rawContent);
    const tokens = lexer(matterContent.trim());

    let title = matterData.title || "";
    let description = matterData.description || "";
    const plainTextParts: string[] = [];

    const headings: string[] = [];
    tokens.forEach((token: Token) => {
        if (token.type === "heading") {
            const headingText = parseTokenText(token);
            if (headingText) {
                if (!title) title = headingText;
                headings.push(headingText);
                plainTextParts.push(headingText);
            }
            return;
        }
        if (token.type === "paragraph") {
            const paragraphText = parseTokenText(token);
            if (paragraphText) {
                if (!description) description = paragraphText;
                plainTextParts.push(paragraphText);
            }
            return;
        }
        if (["list", "blockquote", "table"].includes(token.type)) {
            plainTextParts.push(parseTokenText(token));
            return;
        }
    });

    return {
        title,
        description,
        headings: headings.join(" ").trim(),
        plainText: plainTextParts.join(" ").trim(),
    };
};

/**
 * Generates a static search index from all documentation pages.
 * Processes markdown content and creates a MiniSearch index file.
 *
 * @example
 * ```ts
 * import { generateSearchIndex } from "@robindoc/minisearch";
 * import { getStaticParams, getPageData } from "./robindoc";
 *
 * await generateSearchIndex(
 *   getStaticParams,
 *   getPageData,
 *   "./public/search-index.json"
 * );
 * ```
 *
 * @see {@link https://robindoc.com/docs/customization/search Search integration}
 */
export const generateSearchIndex = async (
    getStaticParams: GetStaticParamsFunction,
    getPageData: GetPageDataFunction,
    outputPath: string,
): Promise<void> => {
    const searchItems: SearchIndexItem[] = [];

    const staticParams = await getStaticParams();

    for (const staticParam of staticParams) {
        const pathname = `/${staticParam.segments.join("/")}`;
        try {
            const pageData = await getPageData(pathname);

            if (!pageData) continue;

            const parsed = parseMarkdownContent(pageData.raw);
            const title = pageData.title || parsed.title;
            const description = parsed.description || parsed.plainText.substring(0, 200).trim();

            searchItems.push({
                id: pathname,
                title,
                href: pathname,
                headings: parsed.headings,
                content: parsed.plainText,
                description,
            });
        } catch (error) {
            console.warn(`Failed to index page ${pathname}:`, error);
        }
    }

    const searchIndex = new MiniSearch<SearchIndexItem>({
        fields: ["title", "content", "headings", "description"],
        storeFields: ["id", "title", "href", "headings", "description", "content"],
        searchOptions: {
            boost: { title: 5, headings: 3, description: 2 },
            fuzzy: 0.2,
        },
    });

    await Promise.all([searchIndex.addAllAsync(searchItems), mkdir(dirname(outputPath), { recursive: true })]);
    await writeFile(outputPath, JSON.stringify(searchIndex.toJSON()), "utf-8");
};
