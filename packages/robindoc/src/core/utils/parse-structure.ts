import { type DocItem } from "../types/structure";
import { type Pages, type Crumbs, type Configuration } from "../types/content";
import { type TreeItem } from "../../components/elements/sidebar/types";
import { getConfiguration } from "./get-configuration";
import { getMetadata } from "./get-metadata";
import { generatePseudoTitle, checkIsLinkExternal, mergePathname, normalizePathname } from "./path-tools";
import { loadContent } from "./load-content";
import { createPage, createTreeItem, shouldSpread } from "./structure-tools";

const parseJSONStructure = async (configuration: Configuration, parentPathname: string, crumbs: Crumbs) => {
    if (!configuration.provider) return null;

    const branchFiles = await configuration.provider.filesPromise;
    const structurePath = `${parentPathname}/structure.json`;

    if (!branchFiles.structures.includes(structurePath)) return null;

    const content = await loadContent(structurePath, configuration.provider);
    let structure: { [segment: string]: { title: string } };

    try {
        structure = JSON.parse(content.data);
    } catch {
        throw new Error(`Can't parse structure "${structurePath}"`);
    }

    const pages: Pages = {};
    const tree: TreeItem[] = [];

    for (const segment in structure) {
        const { title } = structure[segment];
        const clientPath = normalizePathname(segment === "index" ? parentPathname : `${parentPathname}/${segment}`);
        const pathnameNormalized = normalizePathname(mergePathname(configuration.basePath, clientPath));

        const pageData = await createPage(pathnameNormalized, clientPath, title, configuration, crumbs);
        if (pageData) {
            pages[pageData.pathname] = pageData.page;
        }

        let subTree: TreeItem[] | undefined;
        if (segment !== "index") {
            const subResult = await parseAutoStructure(
                configuration,
                pageData ? [...crumbs, pathnameNormalized] : crumbs,
                clientPath,
            );
            subTree = subResult.tree;
            Object.assign(pages, subResult.pages);
        }

        tree.push(createTreeItem(title, pathnameNormalized, "row", subTree));
    }

    return { pages, tree };
};

const parseAutoStructure = async (configuration: Configuration, crumbs: Crumbs, parentPathname: string) => {
    if (!configuration.provider) return { pages: {}, tree: [] };

    const jsonResult = await parseJSONStructure(configuration, parentPathname, crumbs);
    if (jsonResult) return jsonResult;

    const pages: Pages = {};
    const tree: TreeItem[] = [];
    const parentSegments = parentPathname.split("/");
    const nestingLevel = parentSegments.length;

    const branchFiles = await configuration.provider.filesPromise;

    for await (const { clientPath } of branchFiles.docs) {
        const segments = clientPath.split("/");
        const isDirectChild = segments.length === parentSegments.length + 1;
        const isUnderParent = clientPath.startsWith(parentPathname);

        if (!isDirectChild || !isUnderParent) {
            continue;
        }

        const pathnameNormalized = normalizePathname(mergePathname(configuration.basePath, clientPath));
        const metadata = await getMetadata({ provider: configuration.provider, uri: clientPath });
        const title = metadata.title || generatePseudoTitle(pathnameNormalized);

        const pageData = await createPage(pathnameNormalized, clientPath, title, configuration, crumbs);
        if (pageData) {
            pages[pageData.pathname] = pageData.page;
        }

        const subResult = await parseAutoStructure(
            configuration,
            pageData ? [...crumbs, pathnameNormalized] : crumbs,
            clientPath,
        );
        const itemType = nestingLevel <= 1 ? "heading" : "row";

        if (shouldSpread(nestingLevel, configuration.spreadedLevel)) {
            tree.push(createTreeItem(title, pathnameNormalized, itemType), ...subResult.tree);
        } else {
            tree.push(createTreeItem(title, pathnameNormalized, itemType, subResult.tree));
        }

        Object.assign(pages, subResult.pages);
    }

    return { pages, tree };
};

const parseStaticStructure = async (
    items: DocItem[],
    configuration: Configuration,
    crumbs: Crumbs,
    parentPathname: string,
) => {
    const pages: Pages = {};
    const tree: TreeItem[] = [];
    const nestingLevel = parentPathname.split("/").length;

    for await (const item of items) {
        if (typeof item === "string") {
            const result = await parseStructure(item, configuration, crumbs, parentPathname);
            Object.assign(pages, result.pages);
            tree.push(...result.tree);
            continue;
        }

        if (item.type === "separator") {
            tree.push({ type: "separator" });
            continue;
        }

        const itemConfiguration = getConfiguration(item.configuration || {}, configuration);
        const clientPath = item.href || "";
        const pathnameNormalized = normalizePathname(mergePathname(itemConfiguration.basePath, clientPath));

        let subCrumbs = crumbs;
        if (clientPath && !checkIsLinkExternal(pathnameNormalized)) {
            const pageData = await createPage(
                pathnameNormalized,
                clientPath,
                item.title || "",
                itemConfiguration,
                crumbs,
            );
            if (pageData) {
                pages[pageData.pathname] = pageData.page;
                subCrumbs = [...crumbs, pathnameNormalized];
            }
        }

        let subTree: TreeItem[] = [];
        if (item.items) {
            const result = await parseStructure(item.items, itemConfiguration, subCrumbs, item.href || "");
            subTree = result.tree;
            Object.assign(pages, result.pages);
        }

        if (item.hidden) continue;

        const title = item.title || generatePseudoTitle(pathnameNormalized);
        const href = item.href ? pathnameNormalized : undefined;

        if (shouldSpread(nestingLevel, configuration.spreadedLevel)) {
            tree.push(createTreeItem(title, href, item.type), ...subTree);
        } else {
            tree.push(createTreeItem(title, href, item.type, subTree));
        }
    }

    return { pages, tree };
};

export const parseStructure = async (
    items: DocItem[] | "auto",
    configuration: Configuration = {},
    crumbs: Crumbs = [],
    pathname: string = "",
) => {
    if (items === "auto") {
        return parseAutoStructure(configuration, crumbs, pathname);
    }

    return parseStaticStructure(items, configuration, crumbs, pathname);
};
