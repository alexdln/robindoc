# Headings

Headings are standard markdown elements that structure your documentation hierarchy. Robindoc automatically generates anchor links for headings, making them directly linkable and enabling smooth navigation within your documentation.

## Basic Usage

Headings follow standard markdown syntax with `#` symbols:

```md
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

## Anchor Links

Robindoc automatically generates anchor IDs for headings using [GitHub's slug algorithm](https://github.com/Flet/github-slugger). This ensures consistent, URL-friendly identifiers that match GitHub's behavior.

- **H2 and H3 headings** automatically receive anchor IDs and are included in the table of contents
- **H1 headings** receive a special `id="main-content"` attribute for semantic HTML structure
- All other headings (H4-H6) are rendered without automatic anchor IDs

```md
## Getting Started
### Installation
### Configuration
```

Result:

## Getting Started
### Installation
### Configuration

The above generates:
- `#getting-started` for the H2
- `#installation` and `#configuration` for the H3s

You can link to these headings directly:

```md
[Installation](#installation)
[Go to Getting Started](#getting-started)
```

## Implementation Details

- Anchor IDs are generated using `github-slugger`, ensuring compatibility with GitHub's heading link behavior
- Only H2 and H3 headings are tracked for navigation purposes (see [App Organization](../01-getting-started/04-app-organization.md))
- Heading tokens support nested markdown formatting (bold, italic, inline code, etc.)
- The `AnchorHeading` component wraps headings with IDs, while regular `Heading` is used for others

## Important Notes

- **Consistency**: Anchor IDs are generated from the heading text, so changing a heading's text will change its anchor ID
- **Uniqueness**: If you have duplicate heading text, GitHub's slugger will automatically append numbers (`-1`, `-2`, etc.)
- **Special Characters**: Non-alphanumeric characters are converted to hyphens in anchor IDs
