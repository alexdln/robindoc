import MiniSearch, { type AsPlainObject } from "minisearch";

import { type Searcher, type SearchItem, type SearchIndexItem } from "./types";

let cachedIndex: MiniSearch<SearchIndexItem> | null = null;

const MAX_RESULTS = 10;
const MAX_CHARS = 300;

const buildDescriptionSnippet = (content: string, terms: string[]): string => {
    if (!content || !terms.length) return content;

    const lowerContent = content.toLowerCase();
    const matches: Array<{ start: number; end: number }> = [];

    for (const term of terms) {
        const lowerTerm = term.toLowerCase();
        let start = lowerContent.indexOf(lowerTerm);
        while (start !== -1) {
            const end = start + lowerTerm.length;
            matches.push({ start, end });
            start = lowerContent.indexOf(lowerTerm, end);
        }
    }

    if (!matches.length) return content;

    matches.sort((a, b) => a.start - b.start);
    const ranges: Array<{ start: number; end: number }> = [];

    for (const match of matches) {
        if (ranges.reduce((acc, range) => acc + range.end - range.start, 0) > MAX_CHARS) break;
        const prevRange = ranges[ranges.length - 1];

        if (prevRange && prevRange.end + 84 > match.start) {
            prevRange.end = match.end;
            continue;
        }

        const snippetStart = Math.max(0, match.start - 40);
        const snippetEnd = Math.min(content.length, match.end + 40);

        if (snippetEnd - snippetStart < 10) {
            continue;
        }

        ranges.push({ start: snippetStart, end: snippetEnd });
    }

    return [
        ranges[0].start > 0 ? "..." : "",
        ranges.map((range) => content.slice(range.start, range.end)).join(" ... "),
        ranges[ranges.length - 1].end < content.length ? "..." : "",
    ].join("");
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
