export type SearchItem = { title: string; href: string; description?: string };

export type SearchResults = SearchItem[];

export type Searcher = (search: string, abortController: AbortController) => Promise<SearchItem[]>;

export type SearchIndexItem = {
    id: string;
    title: string;
    headings: string;
    description?: string;
    content: string;
    href: string;
};

export type GetStaticParamsFunction = () => Promise<Array<{ segments: string[] }>>;
export type GetPageDataFunction = (pathname: string) => Promise<{ title: string; raw: string } | null>;
