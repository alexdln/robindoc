# Lists

Robindoc supports three types of lists: ordered lists, unordered lists, and task lists (checkboxes). All list types support nested markdown content and can be customized through theming.

## Unordered Lists

Use hyphens, asterisks, or plus signs for unordered lists:

```md
- First item
- Second item
- Third item
  - Nested item
  - Another nested item
- Fourth item
```

Result:

- First item
- Second item
- Third item
  - Nested item
  - Another nested item
- Fourth item

Or:

```md
* First item
* Second item
* Third item
```

Result:

* First item
* Second item
* Third item

## Ordered Lists

Use numbers followed by periods for ordered lists:

```md
1. First item
2. Second item
3. Third item
   1. Nested item
   2. Another nested item
4. Fourth item
```

Result:

1. First item
2. Second item
3. Third item
   1. Nested item
   2. Another nested item
4. Fourth item

### Custom Start Numbers

Ordered lists support custom starting numbers:

```md
5. Fifth item
6. Sixth item
7. Seventh item
```

Result:

5. Fifth item
6. Sixth item
7. Seventh item

The `start` attribute is automatically detected and applied to the `<ol>` element.

## Task Lists

Task lists (also called checkbox lists) are rendered as interactive checkboxes. Use `- [ ]` for unchecked items and `- [x]` for checked items:

```md
- [ ] Uncompleted task
- [x] Completed task
- [ ] Another uncompleted task
```

Result:

- [ ] Uncompleted task
- [x] Completed task
- [ ] Another uncompleted task

### Task List Behavior

- Task lists are rendered with native HTML checkboxes
- The `defaultChecked` prop is set based on the markdown syntax (`[x]` = checked, `[ ]` = unchecked)
- Checkbox state is **not persisted** by default (client-side only)
- To persist state, implement custom logic using the `defaultChecked` prop

## Nested Content

All list types support rich nested content:

```md
- List item with **bold text**
- List item with [a link](./03-links.md)
- List item with `inline code`
- List item with:
  - Nested list
  - More nested items
```

Result:

- List item with **bold text**
- List item with [a link](./03-links.md)
- List item with `inline code`
- List item with:
  - Nested list
  - More nested items

## Important Notes

- **Task List Detection**: A list is considered a task list only if **all** items have checkboxes. Mixed lists (some with checkboxes, some without) are rendered as regular lists
- **Ordered List Start**: The `start` attribute is automatically extracted from the first list item's number
- **Styling**: Lists can be customized through [theming](../03-customization/05-theming.md) using CSS classes like `r-list`, `r-list-item`, `r-task-list`, etc.
- **Component Customization**: All list components (`OrderedList`, `UnorderedList`, `ListItem`, `TaskOrderedList`, `TaskUnorderedList`, `TaskListItem`) can be customized by overwriting tags. See [Tags](../03-customization/07-tags.md) for more details
