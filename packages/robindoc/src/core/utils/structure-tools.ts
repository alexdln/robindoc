import { type Configuration } from "../types/content";
import { type Crumbs } from "../types/content";
import { type TreeItem } from "../../components/elements/sidebar/types";
import { checkIsLinkExternal } from "./path-tools";

export const createPage = async (
    pathnameNormalized: string,
    clientPath: string,
    title: string,
    configuration: Configuration,
    crumbs: Crumbs,
) => {
    if (checkIsLinkExternal(pathnameNormalized)) return null;

    const origPath = await configuration.provider?.getPageSourcePathname(clientPath, pathnameNormalized);
    if (!origPath) return null;

    return {
        pathname: pathnameNormalized,
        page: { title, uri: clientPath, configuration, origPath, crumbs },
    };
};

export const createTreeItem = (
    title: string,
    href: string | undefined,
    type: "heading" | "row" | undefined,
    items?: TreeItem[],
) => {
    return items ? { title, href, type, items } : { title, href, type };
};

export const shouldSpread = (nestingLevel: number, spreadedLevel: number = 1) => {
    return nestingLevel < spreadedLevel;
};
