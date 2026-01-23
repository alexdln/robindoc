# Theming

Robindoc uses CSS custom properties for theming. All colors are controlled through CSS variables, allowing customization without modifying component code.

## CSS Variables

Two variable families control the theme:

### `--r-main-*`

Neutral/base colors used for backgrounds, borders, and text:

- `--r-main-50` through `--r-main-950` (11 shades, 50 = lightest, 950 = darkest)

### `--r-primary-*`

Accent colors used for links, highlights, and active states:

- `--r-primary-50` through `--r-primary-950` (11 shades, 50 = lightest, 950 = darkest)

## Customization

Override colors by setting `--rb-main-*` and `--rb-primary-*` variables. These are used as fallbacks for the internal `--r-main-*` and `--r-primary-*` variables.

```css filename="globals.css"
:root {
  /* Override main colors */
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

  /* Override primary colors */
  --rb-primary-50: #f0f9ff;
  --rb-primary-100: #cffafe;
  --rb-primary-200: #a5f3fc;
  --rb-primary-300: #67e8f9;
  --rb-primary-400: #22d3ee;
  --rb-primary-500: #06b6d4;
  --rb-primary-600: #0891b2;
  --rb-primary-700: #0e7490;
  --rb-primary-800: #155e75;
  --rb-primary-900: #164e63;
  --rb-primary-950: #083344;
}
```

## Implementation Details

Variables use a fallback chain:

```css
--r-main-50: var(--rb-main-50, /* default value */);
--r-primary-600: var(--rb-primary-600, /* default value */);
```

1. Components reference `--r-main-*` and `--r-primary-*`
2. These fall back to `--rb-main-*` and `--rb-primary-*` if defined
3. If `--rb-*` variables are unset, default colors are used

## Color Formats

Any valid CSS color format is supported: hex, rgb, rgba, hsl, hsla, or CSS variables. For transparency effects, `color-mix(in oklab)` is used internally.

```css
:root {
  --rb-primary-500: #06b6d4;
  --rb-primary-500: rgb(6, 182, 212);
  --rb-primary-500: hsl(188, 94%, 43%);
  --rb-primary-500: var(--your-custom-color);
}
```

## Dark Mode

In dark mode, color shades are automatically inverted:
- `--r-main-50` uses `--rb-main-950`
- `--r-main-100` uses `--rb-main-900`
- `--r-main-950` uses `--rb-main-50`
- `--r-main-500` remains unchanged

The same inversion applies to `--r-primary-*` variables. Only define light mode colors; dark mode mapping is handled automatically.

If you need different colors for dark mode, set them at the inverted level within `.r-theme-dark`:

```css
.r-theme-dark {
  --rb-main-950: #your-dark-color;
}
```

For example, to customize `--r-main-50` in dark mode, set `--rb-main-950` to your desired color for the `.r-theme-dark` class.

## Checking Current Theme

To programmatically check the current theme preference, use the `getTheme()` helper function:

```jsx filename="example.jsx" switcher tab="JavaScript" clone="ts|TypeScript|example.tsx"
import { getTheme } from "robindoc/lib/core/helpers/theme";

const currentTheme = getTheme();
// Returns: "light" | "dark" | "system"
```

> [!NOTE]
> For more information about preferences and helper functions, see the [Preferences](./06-preferences.md) documentation.
