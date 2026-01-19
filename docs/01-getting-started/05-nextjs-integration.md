# Next.js Integration

The `@robindoc/next` package provides Next.js-specific navigation integration for Robindoc components.

## Installation

```bash switcher tab="npm"
npm i @robindoc/next
```

```bash switcher tab="pnpm"
pnpm add @robindoc/next
```

```bash switcher tab="yarn"
yarn add @robindoc/next
```

```bash switcher tab="bun"
bun add @robindoc/next
```

## NavigationProvider

`NavigationProvider` bridges Next.js navigation (`usePathname`, `Link`) with Robindoc's navigation context, enabling client-side routing in Robindoc components.

### Implementation

Wrap Robindoc components with `NavigationProvider` inside `RobinProvider`:

```tsx filename="app/docs/layout.tsx" switcher tab="TypeScript" clone="jsx|JavaScript|app/docs/layout.jsx"
import { RobinProvider, Header, Footer, DocsContainer, KeylinkToContent, KeylinkToNavigation } from "robindoc";
import { NavigationProvider } from "@robindoc/next";
import { Sidebar } from "./robindoc";

import "robindoc/lib/styles.css";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <RobinProvider>
    <NavigationProvider>
      <KeylinkToContent />
      <Header logo={<Logo />} git="https://github.com/your-org/your-repo" />
      <DocsContainer>
        <Sidebar />
        {children}
        <KeylinkToNavigation />
      </DocsContainer>
      <Footer copyright="© 2026 All rights reserved" />
    </NavigationProvider>
  </RobinProvider>
);

export default Layout;
```

### Requirements

- Next.js ≥ 14.0.0
- React ≥ 18.3.0
- Robindoc ≥ 3.0.0

`NavigationProvider` is a client component (`"use client"`). Use in client-compatible layouts or extract to a separate client component if your layout is server-side.

### Behavior

Without `NavigationProvider`, navigation features degrade: links trigger full page reloads and pathname-dependent features may fail. Required for proper Next.js integration.
