import { writeFile, mkdir } from "fs/promises";
import { dirname } from "path";
import MiniSearch from "minisearch";

import { type GetPageDataFunction, type GetStaticParamsFunction, type SearchIndexItem } from "./types";

export const generateSearchIndex = async (
    getStaticParams: GetStaticParamsFunction,
    getPageData: GetPageDataFunction,
    outputPath: string,
): Promise<void> => {
    const searchItems: SearchIndexItem[] = [];

    const staticParams = await getStaticParams();

    for (const staticParam of staticParams) {
        const pathname = `/${staticParam.segments.join("/")}`;
        try {
            const pageData = await getPageData(pathname);

            if (!pageData) continue;

            const description = pageData.raw.substring(0, 200).trim();

            searchItems.push({
                id: pathname,
                title: pageData.title,
                href: pathname,
                content: pageData.raw,
                description: description.length < pageData.raw.length ? `${description}...` : description,
            });
        } catch (error) {
            console.warn(`Failed to index page ${pathname}:`, error);
        }
    }

    const searchIndex = new MiniSearch<SearchIndexItem>({
        fields: ["title", "content", "description"],
        storeFields: ["id", "title", "href", "description"],
        searchOptions: {
            boost: { title: 2, description: 1.5 },
            fuzzy: 0.2,
        },
    });

    await Promise.all([searchIndex.addAllAsync(searchItems), mkdir(dirname(outputPath), { recursive: true })]);
    await writeFile(outputPath, JSON.stringify(searchIndex.toJSON()), "utf-8");
};
