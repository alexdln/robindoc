"use client";

import { useState, useMemo } from "react";
import { Document } from "robindoc/lib/components/elements/article/document";
import { parseMarkdown } from "robindoc/lib/components/elements/article/utils";
import { CodeBlock } from "robindoc/lib/components/ui/code-block/index.client";

import "./markdown-renderer.scss";

const DEFAULT_MARKDOWN = `# Installation

## Quick Start

The fastest way to get started with Robindoc is using \`create-robindoc-app\`:

\`\`\`bash switcher tab="npx"
npx create-robindoc-app
\`\`\`

\`\`\`bash switcher tab="pnpm"
pnpm create robindoc-app
\`\`\`

\`\`\`bash switcher tab="yarn"
yarn create robindoc-app
\`\`\`

\`\`\`bash switcher tab="bun"
bun create robindoc-app
\`\`\`

This will bootstrap a minimal Next.js app with Robindoc already configured.

> [!NOTE]
> Since the framework is focused specifically on markdown the user can quickly view the original files, and then use the full documentation site. And in both cases he will receive all the necessary information.
`;

export const MarkdownRenderer = () => {
    const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);

    const parsed = useMemo(() => {
        return parseMarkdown(markdown);
    }, [markdown]);

    return (
        <div className="viewer">
            <input type="radio" name="tab" value="editor" className="viewer-tab-input" id="tab-editor" />
            <label htmlFor="tab-editor" className="viewer-tab viewer-tab-editor">
                Editor
            </label>
            <textarea
                className="viewer-panel viewer-panel-editor"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Write your markdown here..."
                spellCheck={false}
                name="editor"
            />
            <input type="radio" name="tab" value="preview" className="viewer-tab-input" id="tab-preview" />
            <label htmlFor="tab-preview" className="viewer-tab viewer-tab-preview">
                Preview
            </label>
            <div className="viewer-panel viewer-panel-preview">
                <Document tags={{ CodeBlock }} headings={parsed.headings} pathname="/" tokens={parsed.tokens} />
            </div>
        </div>
    );
};
