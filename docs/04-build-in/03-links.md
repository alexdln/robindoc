# Links

Links are a standard markdown element used to navigate between pages or external resources. In Robindoc, all links inside markdown items are rendered through a unified link component, which gives you consistent styling, safe handling of external links, and correct integration with your app’s router.

By default, **markdown links** like `[Overview](/docs/overview)` or `[GitHub](https://github.com/…)` are rendered as standard HTML `<a>` elements. When you provide a `NavigationProvider` (or use a ready-made wrapper such as `@robindoc/next`), those links are rendered through your preferred link implementation (for example, `next/link`).

## Navigation

Robindoc distinguishes links based on the `href` value and adjusts behavior accordingly:

- **Internal links** (for example, `/docs/overview` or `/guides/getting-started`):
  - Are treated as part of your documentation site.
  - Use your router-aware link component when available (for example, Next.js `Link`).
  - Keep navigation inside the SPA when used with router link.
- **External links** (for example, `https://github.com/...`, `https://example.com`):
  - Are automatically opened in a new tab.
  - Get safe attributes like `rel="noopener noreferrer"`.
  - Are visually marked as external with a small icon so users clearly see they are leaving your docs.

You do **not** have to mark links as internal or external in markdown — Robindoc detects this based on the URL (absolute vs relative, scheme, etc.).

## Using Robindoc with Next.js (`@robindoc/next`)

When you use the `@robindoc/next` integration, Robindoc plugs directly into the Next.js router:

- `@robindoc/next` provides a `NavigationProvider` that wires Robindoc to:
  - `next/navigation`’s `usePathname` for active path detection.
  - Next.js `Link` for client-side navigation.
- After you wrap your app with this provider, **all links rendered from markdown automatically use `next/link` under the hood**.

```tsx
import { NavigationProvider } from "@robindoc/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <NavigationProvider>
          {children}
        </NavigationProvider>
      </body>
    </html>
  );
}
```

## Customization and styling

- Robindoc uses a shared link component for all in-content links, which is styled with the `r-content-link` CSS class.
- You can customize its appearance globally in your theme/styles (colors, underline, focus ring, hover state, external icon, etc.).
- If you build a custom integration (for example, another framework), you can provide your own navigation provider similar to `@robindoc/next` that supplies:
  - A hook for the current pathname.
  - A link component that matches your router.

## Recommendations

- **Prefer relative paths for internal docs** (for example, `/docs/intro`) so they take advantage of SPA navigation and stay inside your site.
- **Avoid hard-coding full absolute URLs** for internal pages (`https://your-site.com/docs/...`), or they will be treated as external and opened in a new tab.
- **Let Robindoc manage external behavior** — you usually do not need to add `target="_blank"` or `rel` in markdown; they are applied automatically when needed.

## Customization

The `ContentLink` component can be customized by overwriting tags. See [Tags](../03-customization/07-tags.md) for more details.