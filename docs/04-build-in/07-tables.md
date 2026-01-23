# Tables

Tables in Robindoc follow the standard GitHub Flavored Markdown (GFM) table syntax. They are automatically wrapped in a `Block` component for consistent spacing and can contain rich markdown content in cells.

## Basic Syntax

Tables use pipes (`|`) to separate columns and hyphens (`-`) for the header separator:

```md
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

Result:

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Alignment

You can align columns using colons in the separator row:

```md
| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| More left    | More center    | More right    |
```

Result:

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Left         | Center         | Right         |
| More left    | More center    | More right    |

- `:---` or `:----` = Left aligned
- `:---:` or `:----:` = Center aligned
- `---:` or `----:` = Right aligned

## Rich Content in Cells

Table cells support nested markdown elements:

```md
| Feature | Description |
|---------|-------------|
| **Bold** | Text with *emphasis* |
| `Code` | [Link](./03-links.md) |
| List | - Item 1<br>- Item 2 |
```

Result:

| Feature | Description |
|---------|-------------|
| **Bold** | Text with *emphasis* |
| `Code` | [Link](./03-links.md) |
| List | - Item 1<br>- Item 2 |

## Complex Tables

You can create tables with multiple rows and complex content:

```md
| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `onClick`, `disabled` | A clickable button component |
| `Input` | `value`, `placeholder` | Text input field |
| `Card` | `title`, `children` | Container component with title |
```

Result:

| Component | Props | Description |
|-----------|-------|-------------|
| `Button` | `onClick`, `disabled` | A clickable button component |
| `Input` | `value`, `placeholder` | Text input field |
| `Card` | `title`, `children` | Container component with title |

## Implementation Details

- Tables are wrapped in a `Block` component for consistent spacing and layout
- Table structure uses semantic HTML: `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
- Cell content is processed recursively, allowing nested markdown tokens
