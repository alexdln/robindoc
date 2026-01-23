# Preferences

Robindoc automatically saves user preferences (such as theme selection and tab states) in `localStorage` and detects them before the app renders. This ensures a smooth user experience without any visual blinks or layout shifts when the page loads.

## How It Works

When a user interacts with Robindoc components (like selecting a theme or switching tabs), their preferences are saved to `localStorage`. On subsequent page loads, these preferences are detected and applied immediately, before React hydration occurs.

### Storage

Preferences are stored in `localStorage` with the following keys:

- **Theme**: `"r-theme"` - stores the user's theme preference (`"light"`, `"dark"`, or `"system"`)
- **Tabs**: `"r-tabs"` - stores tab selections in the format `"tabsKey1=tab1;tabsKey2=tab2"`

### Detection Before Rendering

Robindoc uses a `PreferencesDetector` component that runs both as an inline script (executed immediately) and as a React effect. This dual approach ensures preferences are applied:

1. **Before React hydration** - via an inline script that executes synchronously
2. **After React hydration** - via a `useEffect` hook as a fallback

This prevents any flash of incorrect content (FOIC) or flash of unstyled content (FOUC) when the page loads.

### Root Element Classes

User preferences are applied as CSS classes on the root element (`.r-root`). This allows styles to be applied immediately without waiting for JavaScript execution.

**Theme classes:**
- `.r-theme-light` - Light theme
- `.r-theme-dark` - Dark theme
- `.r-theme-system` - System theme (also adds `.r-theme-light` or `.r-theme-dark` based on system preference)

**Tab classes:**
- `.r-tabs-global__{tabsTypeId}` - Base class for a tab group
- `.r-tabs-global__{tabsTypeId}_{tabId}` - Specific tab selection for a tab group

For more information about the `.r-root` element, see the [App Organization](../01-getting-started/04-app-organization.md#isolation) documentation.

## Helper Functions

Robindoc provides helper functions to check user preferences programmatically. These helpers read from `localStorage` and return the current preference values.

### `getTheme()`

Returns the current theme preference from `localStorage`.

```jsx filename="example.jsx" switcher tab="JavaScript" clone="ts|TypeScript|example.tsx"
import { getTheme } from "robindoc/lib/core/helpers/theme";

const currentTheme = getTheme();
// Returns: "light" | "dark" | "system"
```

### `getTabs()`

Returns all tab preferences from `localStorage` as an array of strings in the format `"tabsKey=tabId"`.

```jsx filename="example.jsx" switcher tab="JavaScript" clone="ts|TypeScript|example.tsx"
import { getTabs } from "robindoc/lib/core/helpers/tabs";

const tabs = getTabs();
// Returns: ["tabsKey1=tab1", "tabsKey2=tab2", ...]
```

## Example Usage

You can use these helpers in your components to read user preferences:

```jsx filename="app/components/theme-indicator.jsx" switcher tab="JavaScript"
"use client";

import { useEffect, useState } from "react";
import { getTheme } from "robindoc/lib/core/helpers/theme";

export const ThemeIndicator = () => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return <div>Current theme: {theme}</div>;
};
```

```tsx filename="app/components/theme-indicator.tsx" switcher tab="TypeScript"
"use client";

import { useEffect, useState } from "react";
import { getTheme } from "robindoc/lib/core/helpers/theme";

export const ThemeIndicator: React.FC = () => {
  const [theme, setTheme] = useState<string>("system");

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  return <div>Current theme: {theme}</div>;
};
```

> [!NOTE]
> These helpers read from `localStorage`, which is only available in the browser. Make sure to use them in client components or within `useEffect` hooks to avoid server-side rendering errors.
