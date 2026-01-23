import React from "react";

import { type TreeItem } from "@src/components/elements/sidebar/types";
import { Article as ArticleBase, type ArticleProps as ArticlePropsBase } from "@src/components/elements/article";
import { Sidebar as SidebarBase, type SidebarProps as SidebarPropsBase } from "@src/components/elements/sidebar";

import { type StructureTemplate, type Options } from "../types/initialize";
import { type Pages } from "../types/content";
import { parseStructure } from "./parse-structure";
import { getConfiguration } from "./get-configuration";
import { getMetadata as getMetadataBase } from "./get-metadata";
import { normalizePathname, removeTrailingSlash } from "./path-tools";
import { loadContent } from "./load-content";

type PageProps = Omit<Partial<ArticlePropsBase>, "uri" | "content" | "provider" | "pathname" | "pages"> & {
    pathname: string;
};

type SidebarProps = Omit<SidebarPropsBase, "tree">;

type StructureParsedData = Promise<{ pages: Pages; tree: TreeItem[] }> | { pages: Pages; tree: TreeItem[] };

const loadStructure = async (structureTemplate: StructureTemplate) => {
    let structure;
    if (typeof structureTemplate === "function") {
        structure = await structureTemplate();
    } else {
        structure = structureTemplate;
    }

    const configuration = getConfiguration(structure.configuration || {});

    return parseStructure(structure.items || [], configuration);
};

export const initializeRobindoc = (structureTemplate: StructureTemplate, options: Options = {}) => {
    let structureParsedPromise: StructureParsedData = loadStructure(structureTemplate).then((data) => {
        structureParsedPromise = data;
        return data;
    });
    const matchingRules = options.matcher?.map((rule) => new RegExp(`^${rule.replace(/^\^|\$$/g, "")}$`));

    const Page: React.FC<PageProps> = async ({ pathname, ...props }) => {
        const pathnameNormalized = normalizePathname(pathname);
        if (matchingRules && !matchingRules.every((rule) => rule.test(pathname))) {
            const errorMessage = `Pathname "${pathnameNormalized}" doesn't pass matcher rules check`;
            if (options.processError) return options.processError(404, errorMessage) || null;
            throw new Error(errorMessage);
        }

        if (!options.cache) await revalidate(true);

        const { pages } = await structureParsedPromise;
        const pageInstruction = pages[pathnameNormalized];

        if (!pageInstruction) {
            const errorMessage = `Can not find data for "${pathnameNormalized}". Please check structure`;
            if (options.processError) return options.processError(404, errorMessage) || null;
            throw new Error(errorMessage);
        }

        const paths = Object.keys(pages);
        const targetPageIndex = paths.indexOf(pathnameNormalized);
        const prevPagePathname = paths[targetPageIndex - 1];
        const nextPagePathname = targetPageIndex < paths.length - 1 && paths[targetPageIndex + 1];
        const prev = prevPagePathname && { pathname: prevPagePathname, title: pages[prevPagePathname].title };
        const next = nextPagePathname && { pathname: nextPagePathname, title: pages[nextPagePathname].title };

        const breadcrumbs = pageInstruction.crumbs.map((crumb) => ({ title: pages[crumb].title, pathname: crumb }));
        const clientPages = Object.entries(pages).reduce<{ clientPath: string; origPath: string }[]>(
            (acc, [clientPath, { origPath }]) => {
                if (origPath) acc.push({ clientPath, origPath });
                return acc;
            },
            [],
        );

        return (
            <ArticleBase
                pathname={pathnameNormalized}
                provider={pageInstruction.configuration.provider}
                uri={pageInstruction.uri}
                title={pageInstruction.title}
                breadcrumbs={breadcrumbs}
                prev={prev || undefined}
                next={next || undefined}
                pages={clientPages}
                {...props}
            />
        );
    };

    const Sidebar: React.FC<SidebarProps> = async (props) => {
        if (!options.cache) await revalidate(true);

        const { tree } = await structureParsedPromise;

        return <SidebarBase tree={tree} {...props} />;
    };

    const getStaticParams = async <T extends string = "segments">(
        prefix: string = "",
        segmentsParamKey: T = "segments" as T,
    ) => {
        if (!options.cache) await revalidate(true);

        const { pages } = await structureParsedPromise;
        const pagesArr = Object.keys(pages);
        const prefixWithoutTrailingSlash = removeTrailingSlash(prefix);

        return pagesArr.reduce<Record<T, string[]>[]>((acc, cur) => {
            if (!cur.startsWith(prefixWithoutTrailingSlash)) return acc;

            acc.push({
                [segmentsParamKey]: cur.substring(prefixWithoutTrailingSlash.length + 1).split("/"),
            } as Record<T, string[]>);

            return acc;
        }, []);
    };

    const getMetadata = async (pathname: string) => {
        const pathnameNormalized = normalizePathname(pathname);
        if (matchingRules && !matchingRules.every((rule) => rule.test(pathname))) {
            const errorMessage = `Pathname "${pathnameNormalized}" doesn't pass matcher rules check`;
            if (options.processError) return options.processError(404, errorMessage) || null;
            throw new Error(errorMessage);
        }

        if (!options.cache) await revalidate(true);

        const { pages } = await structureParsedPromise;
        const pageInstruction = pages[pathnameNormalized];

        if (!pageInstruction) {
            const errorMessage = `Can not find data for "${pathnameNormalized}". Please check structure`;
            if (options.processError) return options.processError(404, errorMessage) || null;
            throw new Error(errorMessage);
        }

        const metadata = await getMetadataBase({
            uri: pageInstruction.uri,
            provider: pageInstruction.configuration.provider,
        });
        return metadata;
    };

    const getPageData = async (pathname: string) => {
        const pathnameNormalized = normalizePathname(pathname);
        if (matchingRules && !matchingRules.every((rule) => rule.test(pathname))) {
            const errorMessage = `Pathname "${pathnameNormalized}" doesn't pass matcher rules check`;
            if (options.processError) return options.processError(404, errorMessage) || null;
            throw new Error(errorMessage);
        }

        if (!options.cache) await revalidate(true);

        const { pages } = await structureParsedPromise;
        const pageInstruction = pages[pathnameNormalized];

        if (!pageInstruction) {
            const errorMessage = `Can not find data for "${pathnameNormalized}". Please check structure`;
            if (options.processError) return options.processError(404, errorMessage) || null;
            throw new Error(errorMessage);
        }

        const title = pageInstruction.title;
        const { data } = await loadContent(pageInstruction.uri, pageInstruction.configuration.provider);

        return { title, raw: data };
    };

    const getPageInstruction = async (pathname: string) => {
        const pathnameNormalized = normalizePathname(pathname);
        if (matchingRules && !matchingRules.every((rule) => rule.test(pathname))) {
            const errorMessage = `Pathname "${pathnameNormalized}" doesn't pass matcher rules check`;
            if (options.processError) return options.processError(404, errorMessage) || null;
            throw new Error(errorMessage);
        }

        if (!options.cache) await revalidate(true);

        const { pages } = await structureParsedPromise;
        const pageInstruction = pages[pathnameNormalized];

        if (!pageInstruction) {
            const errorMessage = `Can not find data for "${pathnameNormalized}". Please check structure`;
            if (options.processError) return options.processError(404, errorMessage) || null;
            throw new Error(errorMessage);
        }

        return pageInstruction;
    };

    const revalidate = async (background?: boolean) => {
        if ("then" in structureParsedPromise) return structureParsedPromise;

        if (background) {
            const newData = await loadStructure(structureTemplate);
            structureParsedPromise = newData;
        } else {
            structureParsedPromise = loadStructure(structureTemplate).then((data) => {
                structureParsedPromise = data;
                return data;
            });
        }
        return structureParsedPromise;
    };

    return { Page, Sidebar, getStaticParams, getMetadata, getPageData, getPageInstruction, revalidate };
};
