# Tags

Tags are React components responsible for rendering markdown elements. By default, Robindoc uses built-in components for all markdown elements, but you can overwrite any tag to customize the rendering behavior.

## Usage

Tags are passed to the `Page` component via the `tags` prop. You can overwrite individual tags while keeping the default implementation for others.

```tsx filename="app/docs/page.tsx" switcher tab="TypeScript"
import { Page } from "./robindoc";

const CustomParagraph = ({ children, ...props }) => (
  <p {...props} className="custom-paragraph">
    {children}
  </p>
);

const DocsPage = () => (
  <Page
    pathname="/docs"
    tags={{
      Paragraph: CustomParagraph,
    }}
  />
);

export default DocsPage;
```

```jsx filename="app/docs/page.jsx" switcher tab="JavaScript"
import { Page } from "./robindoc";

const CustomParagraph = ({ children, ...props }) => (
  <p {...props} className="custom-paragraph">
    {children}
  </p>
);

const DocsPage = () => (
  <Page
    pathname="/docs"
    tags={{
      Paragraph: CustomParagraph,
    }}
  />
);

export default DocsPage;
```

## Available Tags

All tags accept standard React props, including `className` and `children` where applicable. The following tags can be overwritten:

### Text Elements

- **`Paragraph`** - Renders paragraph elements (`<p>`)
- **`Strong`** - Renders bold text (`<strong>`)
- **`Em`** - Renders italic text (`<em>`)
- **`Del`** - Renders strikethrough text (`<del>`)
- **`CodeSpan`** - Renders inline code (`<code>`)

### Headings

- **`Heading`** - Renders standard headings without anchor links
- **`AnchorHeading`** - Renders headings with anchor links and automatic table of contents registration

### Lists

- **`OrderedList`** - Renders ordered lists (`<ol>`)
- **`UnorderedList`** - Renders unordered lists (`<ul>`)
- **`ListItem`** - Renders list items (`<li>`)
- **`TaskOrderedList`** - Renders ordered task lists
- **`TaskUnorderedList`** - Renders unordered task lists
- **`TaskListItem`** - Renders task list items with checkboxes

### Code Blocks

- **`CodeSpan`** - Renders inline code without syntax highlighting
- **`CodeBlock`** - Renders code blocks with syntax highlighting (used for inline code with language specification)
- **`CodeSection`** - Renders full code blocks with syntax highlighting, optional filename, and copy functionality

### Tables

- **`Table`** - Renders table containers (`<table>`)
- **`Thead`** - Renders table headers (`<thead>`)
- **`Tbody`** - Renders table bodies (`<tbody>`)
- **`Tr`** - Renders table rows (`<tr>`)
- **`Th`** - Renders table header cells (`<th>`)
- **`Td`** - Renders table data cells (`<td>`)

### Other Elements

- **`Blockquote`** - Renders blockquotes with optional type (note, tip, important, warning, caution)
- **`Hr`** - Renders horizontal rules (`<hr>`)
- **`Img`** - Renders images with provider support
- **`ContentLink`** - Renders internal and external links
- **`Block`** - Renders block containers for grouping elements
- **`Tabs`** - Renders tab switchers for code blocks

## Examples

### Custom Paragraph Styling

Add custom attributes or styling to paragraphs:

```tsx filename="app/docs/page.tsx" switcher tab="TypeScript"
import { Page } from "./robindoc";

const DocsPage = () => (
  <Page
    pathname="/docs"
    tags={{
      Paragraph: (props) => <p {...props} data-test="paragraph" />,
    }}
  />
);

export default DocsPage;
```

```jsx filename="app/docs/page.jsx" switcher tab="JavaScript"
import { Page } from "./robindoc";

const DocsPage = () => (
  <Page
    pathname="/docs"
    tags={{
      Paragraph: (props) => <p {...props} data-test="paragraph" />,
    }}
  />
);

export default DocsPage;
```

### Custom Heading Component

Replace the default heading implementation:

```tsx filename="app/docs/page.tsx" switcher tab="TypeScript"
import { Page } from "./robindoc";

const CustomHeading = ({ component: Component, children, ...props }) => (
  <Component {...props} className="custom-heading">
    <span className="heading-prefix">→</span>
    {children}
  </Component>
);

const DocsPage = () => (
  <Page
    pathname="/docs"
    tags={{
      Heading: CustomHeading,
      AnchorHeading: CustomHeading,
    }}
  />
);

export default DocsPage;
```

```jsx filename="app/docs/page.jsx" switcher tab="JavaScript"
import { Page } from "./robindoc";

const CustomHeading = ({ component: Component, children, ...props }) => (
  <Component {...props} className="custom-heading">
    <span className="heading-prefix">→</span>
    {children}
  </Component>
);

const DocsPage = () => (
  <Page
    pathname="/docs"
    tags={{
      Heading: CustomHeading,
      AnchorHeading: CustomHeading,
    }}
  />
);

export default DocsPage;
```

## Implementation Details

Tags are merged with default implementations using object spread syntax. When you provide a custom tag, it completely replaces the default component for that specific tag. Other tags continue to use their default implementations.

```tsx
const Tags = { ...DEFAULT_TAGS, ...userTags };
```

This means you can overwrite as many or as few tags as needed. The custom component receives the same props as the default implementation, ensuring compatibility with Robindoc's internal rendering logic.

> [!NOTE]
> When overwriting tags, ensure your custom components accept the same props as the default implementations. Refer to the source code or TypeScript definitions for exact prop interfaces.

> [!TIP]
> You can import default tag components from `robindoc` to use as a base for your custom implementations, allowing you to extend rather than completely replace functionality.
