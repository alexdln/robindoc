# Customization

Page layout consists of [special blocks](./01-elements/README.md). For additional customization, you may use [special utilities](./02-tools/README.md).

All styles are collected separately and are included once for the entire application from `robindoc/lib/styles.css`:

```tsx filename="app/docs/page.tsx" switcher tab="TypeScript"
import { RobinProvider, Header, Footer, DocsContainer } from "robindoc";
import { Page, Sidebar } from "./robindoc";
import "robindoc/lib/styles.css";

const DocumentationPage: React.FC = () => (
  <RobinProvider>
    <Header logo={<Logo />} />
    <DocsContainer>
      <Sidebar pathname="/docs" />
      <Page pathname="/docs" />
    </DocsContainer>
    <Footer copyright="© 2026 All rights reserved" />
  </RobinProvider>
);

export default DocumentationPage;
```

```jsx filename="app/docs/page.jsx" switcher tab="JavaScript"
import { RobinProvider, Header, Footer, DocsContainer } from "robindoc";
import { Page, Sidebar } from "./robindoc";
import "robindoc/lib/styles.css";

const DocumentationPage = () => (
  <RobinProvider>
    <Header logo={<Logo />} />
    <DocsContainer>
      <Sidebar pathname="/docs" />
      <Page pathname="/docs" />
    </DocsContainer>
    <Footer copyright="© 2026 All rights reserved" />
  </RobinProvider>
);

export default DocumentationPage;
```

> [!NOTE]
> Robindoc is fully isolated and does not provide any global styles and does not affect anything inside the documentation. For more details, see the [Isolation](../01-getting-started/04-app-organization.md#isolation) section.

Framework-based logic configuration - search API route, and the current page path - is up to you. For more details, read the [App Organization](../01-getting-started/04-app-organization.md) page.

Robindoc works entirely does not require any modifications to the bundler. The framework is fully built on the capabilities of RSC, allowing you to build documentation as a static site or generate pages dynamically.

As a result, Robindoc does not affect other pages of the service. Essentially, these are just regular components that build large blocks based on markdown files and instructions. Conversely, you can easily integrate Robindoc into any site that supports RSC.

Despite the bundler-free generation, Robindoc supports markup (both through jsx/html inside md/mdx files and through special Robin components). For more details, read the [Writing MD](../01-getting-started/02-writing-md.md) page.
