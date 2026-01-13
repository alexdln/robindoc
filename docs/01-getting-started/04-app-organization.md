# App Organization

Robindoc can be considered to consist of several parts:

- Documentation Structure ([more about documentation structure](../02-structure/README.md));
- Robindoc Initialization ([more about initialization](./03-initialization.md));
- Page Markup and Configuration ([more about customization](../03-customization/README.md));
- Documentation Markdown Files ([more about writing MD](./02-writing-md.md)).

## Organizing Documentation Files

One of the main advantages of Robindoc is that documentation files can reside in any source — whether they are files outside the current directory or a remote git repository (more about sources on the "[Data Source](../02-structure/03-data-source.md)" page).

Robindoc’s main approach is that you don’t adjust the location of markdown files for Robindoc; instead, Robindoc builds the site from your markdown files. In other words, you place files so that they can be read in GitHub, and Robindoc serves as a convenient interface.

However, when using the automatic mode for generating the structure, the documentation file structure should match the desired structure on the site. In manual mode, you can organize the documentation files as you wish, but it is still recommended to reflect the site’s structure.

## Application Setup and Configuration

You can initialize Robindoc on any subpath of your site, as long as you specify the [`basePath`](../02-structure/01-configuration.md) in the project initialization and pass the correct path in the Robindoc components.

After initialization, you will receive Sidebar, Page, getStaticParams, getMetadata, and getPageData. Read more on the [Initialization](./03-initialization.md) page.

Global elements - [`RobinProvider`](../03-customization/01-elements/robin-provider.md), [`Header`](../03-customization/01-elements/header.md), [`Footer`](../03-customization/01-elements/footer.md), [`Containers`](../03-customization/01-elements/containers.md) and [`Sidebar`](../03-customization/01-elements/sidebar.md) - should ideally be placed above all pages and reused across all.
Currently, Robindoc works only with the App Router. Once RSC is available for the Pages Router, Robindoc will automatically support it as well.

### Isolation

Robindoc is fully isolated and does not provide any global styles. It does not affect anything inside the documentation as well, including custom JSX components used within markdown files. This means the package can be safely used inside any other service with any libraries without conflicts or style leakage.

The `RobinProvider` component wraps the documentation in a special `div` with the required `r-root` class. This wrapper is necessary for proper scoping of Robindoc's styles. If for some reason you cannot use this wrapper, you can pass `component={Fragment}` to `RobinProvider` and manually add the `r-root` class to your root element that wraps all documentation parts.

### Global Styles

Robindoc does not change any global styles by default, including very basic global ones such as margin, padding, or box-sizing resets. It is recommended to add these minimal global styles to ensure consistent rendering across different browsers:

```css filename="app/globals.css"
html,
body {
  margin: 0;
  padding: 0;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}
```

Alternatively, you can import the default global styles provided by Robindoc:

```tsx filename="app/layout.tsx" switcher tab="TypeScript"
import "robindoc/lib/global.css";
```

```jsx filename="app/layout.jsx" switcher tab="JavaScript"
import "robindoc/lib/global.css";
```

## Page Setup

Next.js supports dynamic routes, so it is recommended to set up one [dynamic segment](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments) for all documentation pages.

```tsx filename="app/docs/[[...segments]]/page.tsx" switcher tab="v14 TSX"
import { Page, Sidebar, getMetadata, getStaticParams } from "../robindoc";

const Page: React.FC<{ params }: { params: { segments?: string[] } }> = async ({ params }) => {
  const pathname = "/docs/" + (params.segments?.join("/") || "");

  return <Page pathname={pathname} />;
};

export default Page;
```

```jsx filename="app/docs/[[...segments]]/page.js" switcher tab="v14 JSX"
import { Page, Sidebar, getMetadata, getStaticParams } from "../robindoc";

const Page = async ({ params }) => {
  const pathname = "/docs/" + (params.segments?.join("/") || "");

  return <Page pathname={pathname} />;
};

export default Page;
```

```tsx filename="app/docs/[[...segments]]/page.tsx" switcher tab="v15 TSX"
import { Page, Sidebar, getMetadata, getStaticParams } from "../robindoc";

const Page: React.FC<{ params }: { params: Promise<{ segments?: string[] }> }> = async ({ params }) => {
  const { segments } = await params;
  const pathname = "/docs/" + (segments?.join("/") || "");

  return <Page pathname={pathname} />;
};

export default Page;
```

```jsx filename="app/docs/[[...segments]]/page.js" switcher tab="v15 JSX"
import { Page, Sidebar, getMetadata, getStaticParams } from "../robindoc";

const Page = async ({ params }) => {
  const { segments } = await params;
  const pathname = "/docs/" + (segments?.join("/") || "");

  return <Page pathname={pathname} />;
};

export default Page;
```

For more details about the props, refer to the [`Page`](../03-customization/01-elements/page.md) element page.

You should also set up metadata generation and static parameters generation (if you want to use SSG, which is highly recommended):

```tsx filename="app/docs/[[...segments]]/page.tsx" switcher tab="v14 TSX"
import { Page, Sidebar, getMetadata, getStaticParams } from "../robindoc";

// ...

export const generateMetadata = async ({
  params,
}: {
  params: { segments?: string[] };
}) => {
  const pathname = "/docs/" + (params.segments?.join("/") || "");
  const metadata = await getMetadata(pathname);

  return metadata;
};

export const generateStaticParams = async () => {
  const staticParams = await getStaticParams("/docs/");
  return staticParams;
};
```

```jsx filename="app/docs/[[...segments]]/page.js" switcher tab="v14 JSX"
import { Page, Sidebar, getMetadata, getStaticParams } from "../robindoc";

// ...

export const generateMetadata = async ({ params }) => {
  const pathname = "/docs/" + (params.segments?.join("/") || "");
  const metadata = await getMetadata(pathname);

  return metadata;
};

export const generateStaticParams = async () => {
  const staticParams = await getStaticParams("/docs/");
  return staticParams;
};
```

```tsx filename="app/docs/[[...segments]]/page.tsx" switcher tab="v15 TSX"
import { Page, Sidebar, getMetadata, getStaticParams } from "../robindoc";

// ...

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ segments?: string[] }>;
}) => {
  const { segments } = await params;
  const pathname = "/docs/" + (segments?.join("/") || "");
  const metadata = await getMetadata(pathname);

  return metadata;
};

export const generateStaticParams = async () => {
  const staticParams = await getStaticParams("/docs/");
  return staticParams;
};
```

```jsx filename="app/docs/[[...segments]]/page.js" switcher tab="v15 JSX"
import { Page, Sidebar, getMetadata, getStaticParams } from "../robindoc";

// ...

export const generateMetadata = async ({ params }) => {
  const { segments } = await params;
  const pathname = "/docs/" + (segments?.join("/") || "");
  const metadata = await getMetadata(pathname);

  return metadata;
};

export const generateStaticParams = async () => {
  const staticParams = await getStaticParams("/docs/");
  return staticParams;
};
```

## Robindoc Setup

It is recommended to place the Robindoc initialization near this route.

```ts filename="app/docs/robindoc.ts" switcher tab="TypeScript" clone="js|JavaScript|app/docs/robindoc.js"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getStaticParams, getMetadata, getPageData } =
  initializeRobindoc({
    configuration: {
      sourceRoot: "../docs",
      basePath: "/docs",
      gitToken: "YOUR_TOKEN",
      fetcher: (url, init) =>
        fetch(url, { ...init, cache: "force-cache", next: { tags: ["docs"] } }),
    },
    items: "auto",
  });
```

> [!IMPORTANT]
> When deploying to Vercel, the final image will contain only files inside the next.js project

## Layout Setup

The Next.js Layout should be placed one level up so that it remains static for all pages.

```tsx filename="app/docs/layout.tsx" switcher tab="TypeScript"
import { RobinProvider, Header, Footer, DocsContainer } from "robindoc";
import { Sidebar } from "./robindoc";
import Logo from "./logo";

import "robindoc/lib/styles.css";
import "robindoc/lib/global.css";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <RobinProvider>
    <Header logo={<Logo />} />
    <DocsContainer>
      <Sidebar />
      {children}
    </DocsContainer>
    <Footer copyright="© 2024 All rights reserved" />
  </RobinProvider>
);

export default Layout;
```

```jsx filename="app/docs/layout.jsx" switcher tab="JavaScript"
import { RobinProvider, Header, Footer, DocsContainer } from "robindoc";
import { Sidebar } from "./robindoc";
import Logo from "./logo";

import "robindoc/lib/styles.css";
import "robindoc/lib/global.css";

const Layout = ({ children }) => (
  <RobinProvider>
    <Header logo={<Logo />} />
    <DocsContainer>
      <Sidebar />
      {children}
    </DocsContainer>
    <Footer copyright="© 2024 All rights reserved" />
  </RobinProvider>
);

export default Layout;
```

For more details on configuring elements, refer to the [`RobinProvider`](../03-customization/01-elements/robin-provider.md), [`Header`](../03-customization/01-elements/header.md), [`Sidebar`](../03-customization/01-elements/sidebar.md), [`Footer`](../03-customization/01-elements/footer.md), and [`Containers`](../03-customization/01-elements/containers.md) block pages.

## Search Setup

If you want to enable search, you can create your own API route and pass the path to it in your Header.

```ts filename="app/api/search/route.ts" switcher tab="TypeScript"
export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("s");

  const headers = new Headers();
  headers.set("Content-Type", "application/json; charset=UTF-8");

  if (!search) return new Response(JSON.stringify([]), { headers });

  const searchResults = await advancedSearcher(search);

  return new Response(JSON.stringify(searchResults), { headers });
};
```

```js filename="app/api/search/route.js" switcher tab="JavaScript"
export const GET = async (request) => {
  const url = new URL(request.url);
  const search = url.searchParams.get("s");

  const headers = new Headers();
  headers.set("Content-Type", "application/json; charset=UTF-8");

  if (!search) return new Response(JSON.stringify([]), { headers });

  const searchResults = await advancedSearcher(search);

  return new Response(JSON.stringify(searchResults), { headers });
};
```

```tsx switcher filename="app/docs/layout.tsx" tab="TypeScript"
const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <RobinProvider>
    <Header logo={<Logo />} searcher="/api/search" />
    {/* ... */}
  </RobinProvider>
);

export default Layout;
```

```js switcher filename="app/docs/layout.jsx" tab="JavaScript"
const Layout = ({ children }) => (
  <RobinProvider>
    <Header logo={<Logo />} searcher="/api/search" />
    {/* ... */}
  </RobinProvider>
);

export default Layout;
```

### Vercel

Since the image in Vercel does not include indirect files - for working with documentation on the server - local documentation files need to be passed explicitly via `outputFileTracingIncludes` config.

```ts filename="next.config.ts" switcher tab="v14 TSX"
/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/search": ["./docs/**/*", "./blog/**/*", "./README.md"],
    },
  },
};
```

```js filename="next.config.js" switcher tab="v14 JSX"
/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/search": ["./docs/**/*", "./blog/**/*", "./README.md"],
    },
  },
};
```

```ts filename="next.config.js" switcher tab="v15 TSX"
import type { NextConfig } from "next";

const nextConfig = {
  outputFileTracingIncludes: {
    "/api/search": ["./docs/**/*", "./blog/**/*", "./README.md"],
  },
};
```

```js filename="next.config.js" switcher tab="v15 JSX"
/** @type {import("next").NextConfig} */
const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/search": ["./docs/**/*", "./blog/**/*", "./README.md"],
  },
};
```

For more details on search configuration, refer to the [Search](../03-customization/04-search.md) page.

## Sitemap Setup

To generate a sitemap in next.js, you can use a [special sitemap file](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) in combination with [getStaticParams](../03-customization/02-tools/get-static-params.md) tool:

```ts filename="app/sitemap.ts" switcher tab="TypeScript"
import { type MetadataRoute } from "next";
import { getStaticParams } from "./docs/robindoc";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticParams = await getStaticParams();

  return staticParams.map(({ segments }) => ({
    url: `https://robindoc.com${segments.join("/")}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));
};

export default sitemap;
```

```js filename="app/sitemap.js" switcher tab="JavaScript"
import { type MetadataRoute } from "next";
import { getStaticParams } from "./docs/robindoc";

const sitemap = async () => {
  const staticParams = await getStaticParams();

  return staticParams.map(({ segments }) => ({
    url: `https://robindoc.com/${segments.join('/')}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }));
};

export default sitemap;
```
