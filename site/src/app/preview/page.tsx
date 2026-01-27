import { type Metadata } from "next/types";

import { MarkdownRenderer } from "@/components/sections/markdown-renderer";

const PreviewPage = () => {
    return <MarkdownRenderer />;
};

export const metadata: Metadata = {
    title: "Robindoc - Markdown Preview",
    description: "Preview for Markdown files.",
};

export default PreviewPage;
