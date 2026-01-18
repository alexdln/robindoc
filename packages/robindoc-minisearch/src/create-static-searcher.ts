import MiniSearch, { type AsPlainObject } from "minisearch";

import { type Searcher, type SearchItem, type SearchIndexItem } from "./types";

let cachedIndex: MiniSearch<SearchIndexItem> | null = null;

const loadSearchIndex = async (indexUrl: string): Promise<MiniSearch<SearchIndexItem>> => {
    if (cachedIndex) return cachedIndex;

    const response = await fetch(indexUrl);
    if (!response.ok) {
        throw new Error(`Failed to load search index: ${response.statusText}`);
    }

    const data: AsPlainObject = await response.json();
    const searchIndex = await MiniSearch.loadJSAsync(data, {
        fields: ["title", "content", "headings", "description"],
        storeFields: ["id", "title", "href", "headings", "description"],
        searchOptions: {
            boost: { title: 5, headings: 3, description: 2 },
            fuzzy: 0.2,
        },
    });

    cachedIndex = searchIndex;

    return searchIndex;
};

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

            return results.slice(0, 10).map((result) => ({
                title: result.title,
                href: result.href,
                description: result.description,
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
