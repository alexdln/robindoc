/**
 * Search result item returned by searcher functions.
 */
export type SearchItem = { title: string; href: string; description?: string };

/**
 * Array of search results.
 */
export type SearchResults = SearchItem[];

/**
 * Search function signature for Robindoc search integration.
 * Must be cancellable via AbortController.
 */
export type Searcher = (search: string, abortController: AbortController) => Promise<SearchItem[]>;

/**
 * Internal search index item structure.
 * Used when generating and loading search indices.
 */
export type SearchIndexItem = {
    id: string;
    title: string;
    headings: string;
    description?: string;
    content: string;
    href: string;
};

/**
 * Function type for retrieving static page parameters.
 */
export type GetStaticParamsFunction = () => Promise<Array<{ segments: string[] }>>;

/**
 * Function type for retrieving page data.
 * Returns page title and raw markdown content.
 */
export type GetPageDataFunction = (pathname: string) => Promise<{ title: string; raw: string } | null>;
