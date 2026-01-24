# Data Source

One of the main advantages of Robindoc is that data can be loaded not only from a neighboring directory but also from various sources. These can be different local directories, remote repositories, remote files, and their combinations for different documentation branches.

Currently, full support for the file system and GitHub is built-in. If you want another remote resource, you can create your own provider, but this is not recommended at the moment. Please, in such cases, create an issue in Robindoc.

By default, documentation is built from the current directory. To reconfigure Robindoc to another source, simply change the `sourceRoot` in the required branch of the structure ([learn more about structure configuration](./01-configuration.md)).

```ts filename="app/docs/robindoc.ts" switcher tab="TypeScript" clone="js|JavaScript|app/docs/robindoc.js"
export const { Page, Sidebar } = initializeRobindoc(async () => ({
  configuration: {
    sourceRoot: "../docs",
  },
  items: [
    {
      title: "Introduction",
      type: "heading",
      href: "/",
    },
  ],
}));
```

Just specify the path to the data source (relative path or Git repository URL) in your structure, and Robindoc will determine the source itself. The built-in solutions are fully configured to generate all necessary data - including [automatic structure generation](./02-items.md), [fetching all available pages](../03-customization/02-tools/README.md), and [page rendering](../03-customization/01-elements/page.md).

In the case of a remote Git repository, you can specify URLs for individual branches or commits. For both public and private projects. For private ones, you need to additionally provide a `gitToken`. It is also recommended to provide a `gitToken` for public projects, as GitHub has very low limits for anonymous requests.

You can generate a token at https://github.com/settings/tokens?type=beta. For private repositories it should have read-only access to `contents`.

```ts filename="app/docs/robindoc.ts" switcher tab="TypeScript" clone="js|JavaScript|app/docs/robindoc.js"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar } = initializeRobindoc({
  configuration: {
    sourceRoot: "https://github.com/username/project/tree/main/blog",
    basePath: "/blog",
    gitToken: "YOUR_TOKEN",
  },
  items: "auto",
});
```

Robindoc can assemble the structure from different sources, for example, one section from a local system and another from a remote Git repository.

```ts filename="app/docs/robindoc.ts" switcher tab="TypeScript" clone="js|JavaScript|app/docs/robindoc.js"
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar } = initializeRobindoc({
  configuration: {
    sourceRoot: ".",
    basePath: "/docs",
    gitToken: "YOUR_TOKEN",
  },
  items: [
    {
      configuration: {
        sourceRoot: "../docs",
      },
      title: "Introduction",
      href: "/",
      items: "auto",
    },
    {
      configuration: {
        sourceRoot: "https://github.com/username/project/tree/main/docs/how-to",
        basePath: "/docs/how-to",
      },
      title: "How To",
      href: "/",
      items: "auto",
    },
  ],
});
```
