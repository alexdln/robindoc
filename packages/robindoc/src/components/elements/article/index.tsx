import React from "react";

import { type BaseProvider } from "@src/core/providers/base";
import { loadContent } from "@src/core/utils/load-content";
import { ContentsProvider } from "@src/components/stores/contents/provider";
import { Contents, type ContentsProps } from "@src/components/blocks/contents";
import { Breadcrumbs, type BreadcrumbsProps } from "@src/components/blocks/breadcrumbs";
import { Pagination, type PaginationProps } from "@src/components/blocks/pagination";
import { LastModified } from "@src/components/blocks/last-modified";
import { Document, type DocumentProps } from "./document";
import { parseMarkdown } from "./utils";

import "./article.scss";

type ArticleContentProps = Pick<DocumentProps, "pathname" | "components" | "config" | "pages" | "tags"> & {
    title: string;
    provider?: BaseProvider;
    translations?: {
        /** Last modified on */
        lastModifiedOn?: string;
    };
} & ({ content: string; uri?: undefined } | { uri: string; content?: undefined });

export type ArticleProps = Partial<PaginationProps> &
    Partial<BreadcrumbsProps> &
    Omit<ContentsProps, "headings"> &
    ArticleContentProps;

/**
 * Article component for rendering markdown content.
 * Handles parsing, rendering, and all page features (breadcrumbs, TOC, pagination).
 *
 * @see {@link https://robindoc.com/docs/customization/elements/page Page customization}
 * @see {@link https://robindoc.com/docs/customization/tags Tags customization}
 * @see {@link https://robindoc.com/docs/structure/data-source Data sources}
 */
export const Article: React.FC<ArticleProps> = async ({
    components,
    tags,
    content,
    uri,
    config = {},
    provider,
    hideContents,
    editUri: editUriProp,
    pathname,
    title,
    breadcrumbs,
    prev,
    next,
    pages = [],
    translations,
}) => {
    const { lastModifiedOn = "Last modified on", editOnService, onThisPage } = translations || {};
    const { data, provider: targetProvider } =
        content || !uri ? { data: content, provider: null } : await loadContent(uri, provider);

    if (!data) {
        throw new Error("Robindoc: Please provide content or valid uri");
    }

    const { headings, tokens } = parseMarkdown(data);
    const editUri = uri && targetProvider && (await targetProvider.getEditUri(uri));
    const lastModified = uri && targetProvider && (await targetProvider.getLastModifiedDate(uri));

    return (
        <ContentsProvider>
            {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs breadcrumbs={breadcrumbs} title={title} />}
            <Contents
                editUri={editUriProp === null ? null : editUriProp || editUri}
                hideContents={hideContents}
                headings={headings}
                translations={{ editOnService, onThisPage }}
            />
            <div className="r-article">
                <Document
                    headings={headings}
                    tokens={tokens}
                    pages={pages}
                    components={components}
                    config={config}
                    targetProvider={targetProvider}
                    pathname={pathname}
                    uri={uri}
                    tags={tags}
                />
                {lastModified && <LastModified date={lastModified}>{lastModifiedOn}</LastModified>}
            </div>
            {(prev || next) && <Pagination prev={prev} next={next} />}
        </ContentsProvider>
    );
};
