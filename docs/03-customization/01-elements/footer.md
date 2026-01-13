# Footer

`Footer` is a universal footer. It can be used both for Robindoc documentation pages as well as the entire site.

```tsx filename="app/layout.tsx" switcher tab="TypeScript"
import { RobinProvider, Footer } from "robindoc";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <RobinProvider>
    {/* ... */}
    <Footer copyright="© 2026 All rights reserved" />
  </RobinProvider>
);

export default Layout;
```

```jsx filename="app/layout.jsx" switcher tab="JavaScript"
import { RobinProvider, Footer } from "robindoc";

const Layout = ({ children }) => (
  <RobinProvider>
    {/* ... */}
    <Footer copyright="© 2026 All rights reserved" />
  </RobinProvider>
);

export default Layout;
```

## Props

All customization in Robindoc happens through the structure and props of the components.

`hidePoweredBy` [`boolean`] - hides the "Powered By Robindoc" label. However, I would appreciate it if you keep this flag enabled. It helps the service grow and improve;

`copyright` [`string`] - the copyright text (usually in the form of "© 2026 All rights reserved");

`translations` [`{ [key: string]: string }`] - translations for the current component. The key is the term identifier, and the value is the corresponding translation. _For the latest list of terms, check the editor hints_.

## Usage

`Footer` is an independent component and doesn't rely on any specific page. It's assumed you can use it once across the entire project or section.

For more details on using `Footer`, refer to the section [App organization](../../01-getting-started/04-app-organization.md).
