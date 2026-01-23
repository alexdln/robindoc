# Initialization

To use Robindoc with all its features, you need to initialize it. To do this, you should call the `initializeRobindoc` function, passing your structure configuration. For more about the structure and how to work with it, read the "[Structure](../02-structure/README.md)" section.

## Calling the Method

The method will return dynamic components [`Page`](../03-customization/01-elements/page.md) and [`Sidebar`](../03-customization/01-elements/sidebar.md), as well as the methods [`getStaticParams`](../03-customization/02-tools/get-static-params.md), [`getMetadata`](../03-customization/02-tools/get-metadata.md), [`getPageData`](../03-customization/02-tools/get-page-data.md), and [`revalidate`](../03-customization/02-tools/revalidate.md).

```tsx filename="app/docs/robindoc.ts" tab="TypeScript" switcher clone="jsx|JavaScript|app/docs/robindoc.js"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getStaticParams, getMetadata, getPageData } =
  initializeRobindoc({
    configuration: {
      sourceRoot: "../docs",
      basePath: "/docs",
      gitToken: "YOUR_TOKEN",
    },
    items: "auto",
  });
```

Now, use these elements in the necessary places. For more details, read the "[App Organization](./04-app-organization.md)" section.

## Options

The `initializeRobindoc` function accepts an optional second parameter with configuration options:

### `processError`

A function to handle errors in your preferred way. This allows you to use framework-specific error handling tools, custom error processors, or logging mechanisms.

The function receives two parameters:
- `status: number` - The HTTP status code (typically 404)
- `statusText: string` - A descriptive error message

### `matcher`

An array of regular expression patterns as strings to validate routes before processing. If a route doesn't match any of the patterns, the error handler is called immediately without parsing the documentation structure. This helps return errors much faster and improves performance.

### `cache`

Controls whether the parsed documentation structure should be cached in memory across requests. When enabled (default: `false`), Robindoc creates an in-memory cache of your documentation structure after the first load, significantly improving performance for subsequent requests.

> **Note**: In serverless environments, caching may be less critical since each function invocation might be a fresh process. However, if your platform reuses warm instances, caching still provides performance benefits.

For detailed information about caching, revalidation, and best practices, see the [Revalidation and Caching](../03-customization/02-tools/revalidate.md) guide.

**Recommended configuration for Next.js:**

```tsx filename="app/docs/robindoc.ts" tab="TypeScript" switcher clone="jsx|JavaScript|app/docs/robindoc.js"
import { notFound } from "next/navigation";
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getStaticParams, getMetadata, getPageData } =
  initializeRobindoc(
    {
      configuration: {
        sourceRoot: "../docs",
        basePath: "/docs",
        gitToken: "YOUR_TOKEN",
      },
      items: "auto",
    },
    {
      processError: notFound,
      matcher: ["/(?!.*\\..+).*"],
      cache: process.env.NODE_ENV === "production",
    },
  );
```

In this example:
- `processError: notFound` uses Next.js's `notFound()` function to handle 404 errors
- `matcher: ["/(?!.*\\..+).*"]` ensures only routes that don't contain file extensions (like `.ico`, `.md`, etc.) are processed, preventing static asset requests from being handled and processed by Robindoc
- `cache: process.env.NODE_ENV === "production"` enabled in-memory caching in production environment

## File Location

The location of the initialization file does not matter, as you will import the elements from this file later.

However, it is recommended to place these files near the pages of the section for which Robindoc is used. For example, if you are using Robindoc for a documentation section (`/docs`), it is recommended to place the initialization file at `/pages/docs/robindoc.ts`.

Initialization can be performed multiple times in different locations. If needed, you can create multiple structures within a single project — such as one configuration for documentation and a completely different one for a blog.

This way, you can combine multiple documentations from different sources into one site. For more on loading from different sources, read the "[Data Source](../02-structure/03-data-source.md)" page.
