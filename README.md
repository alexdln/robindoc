[robin.title]: # "Introduction"
[robin.description]: # "Robindoc is a framework for automatically creating documentation websites based on markdown files, built on React.js Server Components"

# Robindoc

<!---robin-->

Read the documentation in a convenient interface at [robindoc.com/docs](https://robindoc.com/docs)

<!---/robin-->

<!---robin PackageLinks /-->

Robindoc is a framework for automatically creating documentation websites based on markdown files, built on React.js Server Components.

```tsx filename="app/docs/page.tsx" switcher tab="TypeScript" clone="jsx|JavaScript|app/docs/page.jsx"
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
```

The main goal of Robindoc is to create a system where you can fully reuse the existing markdown documentation within your projects.

No additional configuration is needed, while preserving the accessibility and clarity of the original documentation.

## Advantages

- Works on React.js Server Components (RSC). More details in the section "[App Organization](./docs/01-getting-started/04-app-organization.md)";
- Full support for next.js v14 and next.js v15. More details in the section "[App Organization](./docs/01-getting-started/04-app-organization.md)";
- Zero configuration of the project, bundler, or markdown documents. More details in the section "[Customization](./docs/03-customization/README.md)";
- Supports loading content from various sources, including GitHub. More details in the section "[Data Source](./docs/02-structure/03-data-source.md)";
- Supports fully automatic documentation generation, as well as custom generation. More details in the section "[Structure](./docs/02-structure/README.md)";
- Supports JSX/HTML and special Robin components for all sources. More details in the section "[Writing MD](./docs/01-getting-started/02-writing-md.md)";
- Fully isolated - does not provide any global styles and does not affect anything extra inside the documentation. Can be safely used inside any other service with any libraries. More details in the section "[Isolation](./docs/01-getting-started/04-app-organization.md#isolation)";
- Optimized for metrics and accessibility.

## Additional

Please consider giving a star if you like it, it shows that the package is useful and helps me continue work on this and other packages.

Feel free to create issues with requests, ideas, difficulties, etc. All of them will definitely be considered and thought over.

## License

[MIT](https://github.com/alexdln/robindoc/blob/main/LICENSE)
