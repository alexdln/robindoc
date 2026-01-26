import MiniSearch, { type AsPlainObject } from "minisearch";

import { type Searcher, type SearchItem, type SearchIndexItem } from "./types";

let cachedIndex: MiniSearch<SearchIndexItem> | null = null;

const MAX_RESULTS = 10;
const MAX_CHARS = 300;
const CONTEXT_SIZE = 40;
const MERGE_GAP = 84;

type Range = { start: number; end: number };

const isWordChar = (char: string | undefined): boolean => {
    if (char === undefined) return false;
    const code = char.charCodeAt(0);
    return code > 32 && code !== 160;
};

const findWordStart = (text: string, pos: number): number => {
    while (pos > 0 && isWordChar(text[pos - 1])) pos--;
    return pos;
};

const findWordEnd = (text: string, pos: number): number => {
    while (pos < text.length && isWordChar(text[pos])) pos++;
    return pos;
};

const expandRange = (text: string, range: Range, targetLen: number): Range => {
    let { start, end } = range;
    start = findWordStart(text, start);
    end = findWordEnd(text, end);

    const needed = targetLen - (end - start);
    if (needed <= 0) return { start, end };

    const leftRoom = start;
    const rightRoom = text.length - end;
    const total = leftRoom + rightRoom;

    if (total === 0) return { start, end };

    const leftShare = Math.min(leftRoom, Math.round((leftRoom / total) * needed));
    const rightShare = Math.min(rightRoom, needed - leftShare);

    start = findWordStart(text, start - leftShare);
    end = findWordEnd(text, end + rightShare);

    return { start, end };
};

const findMatches = (content: string, terms: string[]): Range[] => {
    const lowerContent = content.toLowerCase();
    const matches: Range[] = [];

    for (const term of terms) {
        const lowerTerm = term.toLowerCase();
        let pos = 0;
        while (pos < lowerContent.length) {
            const start = lowerContent.indexOf(lowerTerm, pos);

            if (start === -1) break;

            const end = start + lowerTerm.length;
            matches.push({ start, end });
            pos = end;
        }
    }

    return matches.sort((a, b) => a.start - b.start);
};

const mergeToSnippets = (matches: Range[], contentLen: number): Range[] => {
    const ranges: Range[] = [];
    let totalLen = 0;

    for (const match of matches) {
        if (totalLen > MAX_CHARS) break;

        const snippetStart = Math.max(0, match.start - CONTEXT_SIZE);
        const snippetEnd = Math.min(contentLen, match.end + CONTEXT_SIZE);
        const last = ranges[ranges.length - 1];

        if (last && last.end + MERGE_GAP > match.start) {
            totalLen += snippetEnd - last.end;
            last.end = snippetEnd;
        } else {
            totalLen += snippetEnd - snippetStart;
            ranges.push({ start: snippetStart, end: snippetEnd });
        }
    }

    return ranges;
};

const buildDescriptionSnippet = (content: string, terms: string[]): string => {
    if (!content || !terms.length) return content;

    const matches = findMatches(content, terms);
    if (!matches.length) return content;

    const ranges = mergeToSnippets(matches, content.length);
    if (!ranges.length) return content;

    const targetLen = Math.floor(MAX_CHARS / ranges.length);
    const expanded = ranges.map((range) => expandRange(content, range, targetLen));

    const parts: string[] = [];
    if (expanded[0].start > 0) parts.push("...");
    parts.push(expanded.map((range) => content.slice(range.start, range.end)).join(" ... "));
    if (expanded[expanded.length - 1].end < content.length) parts.push("...");

    return parts.join("");
};

const loadSearchIndex = async (indexUrl: string): Promise<MiniSearch<SearchIndexItem>> => {
    if (cachedIndex) return cachedIndex;

    const response = await fetch(indexUrl);
    if (!response.ok) {
        throw new Error(`Failed to load search index: ${response.statusText}`);
    }

    const data: AsPlainObject = await response.json();
    const searchIndex = await MiniSearch.loadJSAsync(data, {
        fields: ["title", "content", "headings", "description"],
        storeFields: ["id", "title", "href", "headings", "description", "content"],
        searchOptions: {
            boost: { title: 5, headings: 3, description: 2 },
            fuzzy: 0.2,
        },
    });

    cachedIndex = searchIndex;

    return searchIndex;
};

/**
 * Creates a searcher function that loads and queries a static search index.
 *
 * @example
 * ```ts
 * import { createStaticSearcher } from "@robindoc/minisearch";
 *
 * const searcher = createStaticSearcher("/search-index.json");
 *
 * // Use with Header component
 * <Header searcher={searcher} />
 * ```
 *
 * @see {@link https://robindoc.com/docs/customization/search Search integration}
 */
export const createStaticSearcher = (indexUrl: string): Searcher => {
    return async (search: string, abortController: AbortController): Promise<SearchItem[]> => {
        if (!search.trim()) return [];

        try {
            const searchIndex = await loadSearchIndex(indexUrl);

            if (abortController.signal.aborted) return [];

            const results = searchIndex.search(search, {
                fuzzy: 0.2,
                prefix: true,
                boost: { title: 5, headings: 3, description: 2 },
            });

            if (abortController.signal.aborted) return [];

            return results.slice(0, MAX_RESULTS).map((result) => ({
                title: result.title,
                href: result.href,
                description: buildDescriptionSnippet(result.content, result.terms),
            }));
        } catch (error) {
            if (error instanceof Error && error.name === "AbortError") {
                return [];
            }
            console.error("Search error:", error);
            return [];
        }
    };
};
