import "./article.scss";
import React from "react";

import { type Components } from "@src/core/types/content";
import { type BaseProvider } from "@src/core/providers/base";
import { loadContent } from "@src/core/utils/load-content";
import { ContentsProvider } from "@src/components/stores/contents/provider";
import { Contents, type ContentsProps } from "@src/components/blocks/contents";
import { Breadcrumbs, type BreadcrumbsProps } from "@src/components/blocks/breadcrumbs";
import { Pagination, type PaginationProps } from "@src/components/blocks/pagination";
import { parseMarkdown } from "./utils";
import { Document } from "./document";
import { LastModified } from "@src/components/blocks/last-modified";

export type ContentProps = {
    title: string;
    components?: Components;
    config?: {
        publicDirs?: string[];
    };
    provider?: BaseProvider;
    pathname: string;
    pages?: { clientPath: string; origPath: string }[];
    translations?: {
        /** Last modified on */
        lastModifiedOn?: string;
    };
} & ({ content: string; uri?: undefined } | { uri: string; content?: undefined });

export type ArticleProps = Partial<PaginationProps> &
    Partial<BreadcrumbsProps> &
    Omit<ContentsProps, "headings"> &
    ContentProps;

export const Article: React.FC<ArticleProps> = async ({
    components,
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
                />
                {lastModified && <LastModified date={lastModified}>{lastModifiedOn}</LastModified>}
            </div>
            {(prev || next) && <Pagination prev={prev} next={next} />}
        </ContentsProvider>
    );
};
