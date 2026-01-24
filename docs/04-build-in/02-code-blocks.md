# Code Blocks

Code blocks are a standard markdown mechanism for adding multiline code. In Robindoc, this block is significantly extended with the following features:

* Automatic code highlighting;
* Ability to add a filename;
* Copy filename and block contents;
* Ability to add tabs;
* Tab duplicates.

## Automatic Code Highlighting

All code will be automatically beautifully formatted using [shiki](https://shiki.matsu.io/). Robindoc supports all languages and all styles. The theme is also modified for maximum convenience and accessibility of your documentation.

```txt
\```ts
const example = "Code Blocks Example";
console.log(example);
\```
```

```ts
const example = "Code Blocks Example";
console.log(example);
```

## Ability to Add Filename

To add a filename, simply add `filename="example.ts"`

```txt
\```ts filename="example.ts"
const example = "Code Blocks Example";
console.log(example);
\```
```

```ts filename="example.ts"
const example = "Code Blocks Example";
console.log(example);
```

## Copy Filename and Block Contents

To copy, you don't need to do anything additional - just click on the name to copy the filename and on the special icon on the right to copy the contents.

```ts filename="example.ts"
const example = "Code Blocks Example";
console.log(example);
```

## Ability to Add Tabs

Tabs are an important part of any documentation. In Robindoc, all tabs are synchronized, and their processing happens seamlessly for the user. You can add them by adding the `switcher` flag to sequential code blocks, as well as a tab name, for example `tab="JavaScript"`

```txt
\```js filename="example.js" switcher tab="JavaScript"
const example = "Code Blocks Example";
console.log(example);
\```

\```ts filename="example.ts" switcher tab="TypeScript"
const example: string = "Code Blocks Example";
console.log(example);
\```
```

```js filename="example.js" switcher tab="JavaScript"
const example = "Code Blocks Example";
console.log(example);
```

```ts filename="example.ts" switcher tab="TypeScript"
const example: string = "Code Blocks Example";
console.log(example);
```

## Tab Duplicates

In some cases, tabs completely repeat each other. To avoid creating block copies, you can add the `clone` setting, for example `clone="ts|TypeScript|example.ts"`

```txt
\```js filename="example.js" switcher tab="JavaScript" clone="ts|TypeScript|example.ts"
const example = "Code Blocks Example";
console.log(example);
\```
```

```js filename="example.js" switcher tab="JavaScript" clone="ts|TypeScript|example.ts"
const example = "Code Blocks Example";
console.log(example);
```

## Customization

Code block components (`CodeSpan`, `CodeBlock`, `CodeSection`, and `Tabs`) can be customized by overwriting tags. See [Tags](../03-customization/07-tags.md) for more details.