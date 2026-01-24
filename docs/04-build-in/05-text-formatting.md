# Text Formatting

Robindoc supports standard markdown text formatting elements for emphasis, deletion, and paragraph structure. These elements are rendered through dedicated UI components that ensure consistent styling and accessibility across your documentation.

## Paragraphs

Paragraphs are the basic text container in markdown. Simply separate text blocks with blank lines:

```md
This is the first paragraph.

This is the second paragraph with some content.
```

Result:

This is the first paragraph.

This is the second paragraph with some content.

Paragraphs automatically wrap text content and handle nested markdown elements like inline code, links, and emphasis.

### HTML in Paragraphs

When a paragraph contains only HTML tokens (and whitespace), Robindoc treats it as raw HTML and renders it through the JSX parser. This allows you to embed custom components or HTML directly in your markdown:

```md
<CustomComponent prop="value" />
```

> [!NOTE]
> For custom components, you can also use the [Robin component syntax](../01-getting-started/02-writing-md.md#robin-components).

## Strong (Bold)

Use double asterisks or double underscores for bold text:

```md
This is **bold text**.
This is also __bold text__.
```

Result:

This is **bold text**.
This is also __bold text__.

## Emphasis (Italic)

Use single asterisks or single underscores for italic text:

```md
This is *italic text*.
This is also _italic text_.
```

Result:

This is *italic text*.
This is also _italic text_.

## Deleted Text (Strikethrough)

Use double tildes for strikethrough text:

```md
This is ~~deleted text~~.
```

Result:

This is ~~deleted text~~.

## Combined Formatting

You can combine formatting elements:

```md
This is ***bold and italic***.
This is **bold with _nested italic_**.
This is ~~deleted **bold** text~~.
```

Result:

This is ***bold and italic***.
This is **bold with _nested italic_**.
This is ~~deleted **bold** text~~.

## Implementation Details

- All text formatting elements support nested markdown tokens (links, inline code, etc.)
- The `Strong`, `Em`, and `Del` components are semantic HTML elements (`<strong>`, `<em>`, `<del>`) for accessibility
- Paragraphs use the `Paragraph` component with consistent spacing and typography
- Text tokens are recursively processed, allowing complex nested structures
- All text formatting components (`Paragraph`, `Strong`, `Em`, `Del`, `CodeSpan`) can be customized by overwriting tags. See [Tags](../03-customization/07-tags.md) for more details
