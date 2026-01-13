# Containers

`Containers` are blocks responsible for styling the page's content, serving as the layout for the documentation elements.

## PageContainer

A special container designed for custom pages

```tsx filename="app/page.tsx" switcher tab="TypeScript" clone="jsx|JavaScript|app/page.jsx"
import { PageContainer } from "robindoc";

const HomePage = () => <PageContainer>{/* ... */}</PageContainer>;

export default HomePage;
```

## DocsContainer

A special container designed for a documentation. Assumes the use of `[Sidebar](./sidebar.md)`, `[Page](./page.md)` on the page

```tsx filename="app/docs/layout.tsx" switcher tab="TypeScript"
import { DocsContainer } from "robindoc";

const DocsLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <DocsContainer>{children}</DocsContainer>;
);

export default DocsLayout;
```

```jsx filename="app/docs/layout.jsx" switcher tab="JavaScript"
import { DocsContainer } from "robindoc";

const DocsLayout = ({ children }) => (
  <DocsContainer>{children}</DocsContainer>;
);

export default DocsLayout;
```

## BlogContainer

A special container designed for a blog. It differs in that it does not involve the use of `[Sidebar](./sidebar.md)` on the page

```tsx filename="app/blog/layout.tsx" switcher tab="TypeScript"
import { BlogContainer } from "robindoc";

const BlogLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <BlogContainer>{children}</BlogContainer>;
);

export default BlogLayout;
```

```jsx filename="app/blog/layout.jsx" switcher tab="JavaScript"
import { BlogContainer } from "robindoc";

const BlogLayout = ({ children }) => (
  <BlogContainer>{children}</BlogContainer>;
);

export default BlogLayout;
```

## Usage

`Containers` are independent components and don't rely on any specific page. It's assumed you can use it once across the entire project or section.

For more details on using `Containers`, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
