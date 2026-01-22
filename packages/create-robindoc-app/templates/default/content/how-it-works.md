# How This App Works

This page explains how your documentation site is structured and how each part works together.

## Overview

Your app uses Next.js with RobinDoc to automatically convert Markdown files into a fully functional documentation site. Here's how it all connects:

1. **Markdown files** in `content/` → **Documentation pages**
2. **File structure** → **Navigation sidebar**
3. **Next.js routing** → **Client Side navigation**
4. **Static generation** → **Fast page loads**

## Key Files

### `src/app/docs/robindoc.ts`

This file initializes RobinDoc and configures your documentation:

```tsx
export const { Page, Sidebar, getMetadata, getStaticParams } = initializeRobindoc({
    configuration: {
        sourceRoot: "./content",  // Where your Markdown files are
        basePath: "/docs",        // URL prefix for all docs pages
    },
    items: "auto",  // Automatically discover files
});
```

**What it does:**
- Scans `content/` for Markdown files
- Creates navigation structure automatically
- Exports components you'll use in your pages

### `src/app/layout.tsx`

The root layout wraps your entire app:

```tsx
<RobinProvider component="body">
    <Header logo={<>RobinDoc</>} />
    {children}
    <Footer copyright="© 2026 RobinDoc" />
</RobinProvider>
```

This provides the header and footer that appear on every page.

### `src/app/docs/layout.tsx`

The docs layout wraps only documentation pages:

```tsx
<DocsContainer>
    <Sidebar />
    {children}
    <KeylinkToNavigation />
</DocsContainer>
```

This adds the sidebar navigation to all docs pages.

### `src/app/docs/[[...segments]]/page.tsx`

This catch-all route handles all documentation URLs:

```tsx
export default async function Docs({ params }) {
    const { segments } = await params;
    const pathname = "/docs/" + (segments?.join("/") || "");
    return <Page pathname={pathname} />;
}
```

**How it works:**
- `/docs` → renders `content/README.md`
- `/docs/how-it-works` → renders `content/how-it-works.md`
- `/docs/your-path` → renders `content/your-path.md`

## Request Flow

When someone visits `/docs/how-it-works`:

1. Next.js routes to `[[...segments]]/page.tsx`
2. Wraps with sidebar (from `docs/layout.tsx`)
3. Wraps with header/footer (from root `layout.tsx`)
4. Extracts segments: `["how-it-works"]`
5. Builds pathname: `/docs/how-it-works`
6. `Page` component finds `content/how-it-works.md`
7. Converts Markdown to HTML
8. Returns the page to the browser

## File to URL Mapping

Your file structure directly maps to URLs:

```
content/
├── README.md              → /docs
├── how-it-works.md        → /docs/how-it-works
└── guides/
    ├── README.md          → /docs/guides
    └── advanced.md        → /docs/guides/advanced
```

## Static Site Generation

During `npm run build`:

1. `generateStaticParams()` finds all Markdown files
2. Next.js pre-renders HTML for each page
3. Pages are served instantly (no server processing needed)
4. Better performance and SEO

## Customization Tips

### Add Custom Components

You can use React components in your Markdown. First, pass them to the `Page` component in `page.tsx`:

```tsx
<Page 
    pathname={pathname}
    components={{
        Note: MyNoteComponent,
    }}
/>
```

Then use in Markdown:
```md
<Note type="info">
This is a custom component!
</Note>
```

### Customize Navigation

Edit `robindoc.ts` to customize the sidebar:

```tsx
items: [
    {
        title: "Introduction",
        type: "heading",
        href: "/",
    },
    "auto",  // Auto-generate the rest
]
```

### Change Theme

Override CSS variables in `globals.css`:

```css
:root {
  --rb-main-50: #fafafa;
  --rb-main-100: #f5f5f5;
  --rb-main-200: #e5e5e5;
  --rb-main-300: #d4d4d4;
  --rb-main-400: #a3a3a3;
  --rb-main-500: #737373;
  --rb-main-600: #525252;
  --rb-main-700: #404040;
  --rb-main-800: #262626;
  --rb-main-900: #171717;
  --rb-main-950: #0a0a0a;
}
```

## Next Steps

- Add more Markdown files to `content/`
- Customize the header and footer in `src/app/layout.tsx`
- Check out [customization options](https://robindoc.com/docs/customization) for more personalizations
- Explore [RobinDoc documentation](https://robindoc.com/docs) for advanced features
