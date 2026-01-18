# Search

Robindoc supports three search approaches: client-side MiniSearch (recommended), API routes, and custom callbacks.

## MiniSearch (Recommended)

Client-side search using a pre-built index. Fast and works without server.

### Installation

```bash
npm install @robindoc/minisearch
```

### Setup

1. **Generate search index** during build:

```json filename="package.json"
{
  "scripts": {
    "prebuild": "robindoc-minisearch --template src/app/docs/robindoc.ts"
  }
}
```

The CLI reads `getStaticParams` and `getPageData` from your template file and generates `public/search-index.json` by default. Use `--output` to customize the path.

**Note:** The index parses markdown with `marked.lexer`, extracting title, headings, description, and plainText. Search fields are indexed with boost values: `title: 5`, `headings: 3`, `description: 2`.

2. **Create search provider:**

```tsx filename="app/search-provider.ts"
"use client";

import { createSearchProvider } from "@robindoc/minisearch/provider";

export const searchProvider = createSearchProvider("/search-index.json");
```

3. **Pass to Header:**

```tsx filename="app/layout.tsx"
import { Header, RobinProvider } from "robindoc";
import { searchProvider } from "./search-provider";

const Layout = ({ children }) => (
  <RobinProvider>
    <Header searcher={searchProvider} logo={<Logo />} />
    {children}
  </RobinProvider>
);
```

**Note:** It's recommended to generate the index at build time. You can also generate it dynamically in custom API route with custom revalidation or in dynamic mode using `generateSearchIndex` from `@robindoc/minisearch`.

## API Route

Server-side search via API endpoint. Pass the route path to `searcher`:

```tsx filename="app/layout.tsx"
<Header searcher="/api/search" logo={<Logo />} />
```

The API should return JSON array with `title`, `href`, and optional `description`:

```ts filename="app/api/search/route.ts"
import { matchSorter } from "match-sorter";
import { getStaticParams, getPageData } from "../docs/robindoc";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("s");
  
  if (!search) return new Response(JSON.stringify([]));

  const staticParams = await getStaticParams();
  const docs: { href: string; raw: string; title: string }[] = [];

  for await (const staticParam of staticParams) {
    const pathname = `/${staticParam.segments.join("/")}`;
    const pageData = await getPageData(pathname);
    if (pageData) docs.push({ href: pathname, raw: pageData.raw, title: pageData.title });
  }

  const results = matchSorter(docs, search, { keys: ["raw", "title"] })
    .slice(0, 5)
    .map((item) => ({ title: item.title, href: item.href }));

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
};
```

## Custom Callback

Client-side search with custom logic. Pass an async function:

```tsx filename="app/layout.tsx"
import { type Searcher } from "robindoc/lib/core/types/search";

const searcher: Searcher = async (search, abortController) => {
  // Your search logic
  return results;
};

<Header searcher={searcher} logo={<Logo />} />
```

The function receives `search: string` and `abortController: AbortController`, returns `Promise<SearchItem[]>` where `SearchItem = { title: string; href: string; description?: string }`.

**Note:** Handle `abortController.signal.aborted` to cancel in-flight requests when the query changes.
