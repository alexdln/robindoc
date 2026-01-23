# Tools

When initializing Robindoc, in addition to the core elements, you will also receive special utilities.

These utilities work based on the structure and documentation files. They are needed to fine-tune page generation. For more details on page configuration, refer to the [App Organization](../../01-getting-started/04-app-organization.md) page.

```ts filename="app/docs/robindoc.ts" switcher tab="TypeScript" clone="js|JavaScript|app/docs/robindoc.js"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getStaticParams, getMetadata, getPageData, revalidate } =
  initializeRobindoc({
    configuration: {
      sourceRoot: "../docs",
      basePath: "/docs",
      gitToken: "YOUR_TOKEN",
    },
    items: "auto",
  });
```

For more information on using the utilities, refer to their respective pages:

- [`getMetadata`](./get-metadata.md) - Generate metadata for pages
- [`getStaticParams`](./get-static-params.md) - Get all page paths for static generation
- [`getPageData`](./get-page-data.md) - Retrieve raw page content and title
- [`revalidate`](./revalidate.md) - Manage cache and trigger structure revalidation
