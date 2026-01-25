# HTML

Robindoc supports raw HTML in markdown, allowing you to embed custom components, HTML elements, and JSX directly in your documentation. HTML is processed through a specialized parser that integrates with Robindoc's component system and navigation.

## Basic HTML

You can use standard HTML elements directly in markdown:

```md
<div class="custom-wrapper">
  <p>This is custom HTML content.</p>
</div>
```

Result:

<div class="custom-wrapper">
  <p>This is custom HTML content.</p>
</div>

## Custom Components

Robindoc allows you to use custom React components through HTML syntax. Components must be registered in the `components` prop of the [`Page`](../03-customization/01-elements/page.md) component. See [Writing MD](../01-getting-started/02-writing-md.md) for more details.

```md
<CustomComponent prop="value">
  Child content
</CustomComponent>
```

### Component Validation

- **Naming**: Component names must use PascalCase (e.g., `MyComponent`, not `myComponent` or `my-component`)
- **Registration**: Components must be registered in the `components` object passed to Robindoc
- **Warnings**: Unknown or incorrectly named components trigger console warnings and are not rendered

```md
<!-- Correct -->
<MyComponent />

<!-- Incorrect - will show warning -->
<myComponent />
<my-component />
```

## Robin Components

For better integration with Robindoc's parsing system, use the [Robin component syntax](../01-getting-started/02-writing-md.md#robin-components) instead of raw HTML:

```md
<!---robin MyComponent prop="value" /-->
```

This syntax provides:
- Better error handling
- Support for nested markdown content
- Automatic prop parsing
- Self-closing and block component support

## HTML in Paragraphs

When a paragraph contains only HTML tokens (and whitespace), Robindoc automatically treats it as raw HTML:

```md
<CustomButton onClick={handleClick}>Click me</CustomButton>
```

This allows seamless mixing of markdown and HTML without explicit block syntax.

## Links in HTML

HTML `<a>` tags are automatically processed through Robindoc's link system:

- Internal links use your router (e.g., Next.js `Link` when using `@robindoc/next`)
- External links automatically get `target="_blank"` and `rel="noopener noreferrer"`
- Link processing respects the same rules as [markdown links](./03-links.md)

```md
<a href="./03-links.md">Internal Link</a>
<br>
<a href="https://example.com">External Link</a>
```

Result:

<a href="./03-links.md">Internal Link</a>
<br>
<a href="https://example.com">External Link</a>

## Important Notes

- **Security**: Be cautious with user-generated HTML content; Robindoc doesn't sanitize HTML by default
- **Case Sensitivity**: Component names are case-sensitive and must match registered components exactly
- **Attributes**: HTML attributes are converted to React props
- **Nested Parsing**: HTML content can contain markdown, which is recursively parsed
- **Text Nodes**: Text nodes within HTML are parsed as markdown, enabling mixed content
- **Component Registration**: Always register custom components before using them in markdown
