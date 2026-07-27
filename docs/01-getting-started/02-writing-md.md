# Writing MD

In addition to standard Markdown-to-HTML conversion, Robindoc automatically handles the following:

- Styles code blocks;
- Configures links;
- Inserts images (_public images will use their direct URLs, while private images will be inserted via blob URLs_);
- Embeds HTML/JSX (_Robindoc supports markup in both MDX and MD files_).

## JSX Components

All custom components should be passed to the page manually via props. This means that components do not need to be imported inside Markdown files. This approach provides maximum flexibility for all of Robindoc's features.

<Note type='info'>
Note: All these components will be embedded as server components. If you need client-side logic, add `"use client"` at the beginning of the component file.
</Note>

```md filename="README.md"
# Example

<Note type='info'>
Note: All these components will be embedded as server components. If you need client-side logic, add `"use client"` at the beginning of the component file.
</Note>
```

```tsx filename="app/docs/page.tsx" switcher tab="TypeScript"
import { Note } from "./note";

const Page: React.FC = () => (
  <Page
    components={{
      Note,
    }}
  />
);

export default Page;
```

```jsx filename="app/docs/page.jsx" switcher tab="JavaScript"
import { Note } from "./note";

const Page = () => (
  <Page
    components={{
      Note,
    }}
  />
);

export default Page;
```

The content of your components (`children`) will be passed as ReactNode, parsed from Markdown.

## Robin Components

Another way to embed your components on a page is through Robin elements. Essentially, these are HTML comments formatted in a special syntax. Because of this, most Markdown-rendering tools will not display this part of the Markdown (including GitHub and npm).

Robin components can be used in several scenarios:

### Inserting a React Component

```md filename="README.md"
<!---robin ReadMore
buttonText="Read More"
-->

Lorem ipsum sit amet

<!---/robin-->
```

In this way, all content of the Robin component will be passed inside your ReadMore component, which, for example, will show all content when clicking the "Read More" button. At the same time, when viewing the Markdown document directly, users will see the content immediately.

### Show Content Only on the Site

If the component is provided and fully configured, it will be embedded as a component on the site but will not be shown in the original Markdown file.

In this example, a self-closing Robin component is used:

```md filename="README.md"
# Introduction

<!---robin Github/-->
```

### Show Content Only in Markdown

In some cases, you might want to hide content on the site. For example, so that users viewing the Markdown file on npm see a link to the site. To do this, simply wrap the desired content in an anonymous Robin component.

```md filename="README.md"
# Introduction

<!---robin-->

Read the documentation in a convenient interface at [robindoc.dev/docs](https://robindoc.dev/docs)

<!---/robin-->
```
