import { type MetadataRoute } from "next";

import { getStaticParams } from "./docs/robindoc";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const staticParams = await getStaticParams();
    staticParams.push({ segments: [] });

    return staticParams.map(({ segments }) => ({
        url: `https://robindoc.com/${segments.join("/")}/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
    }));
};

export default sitemap;
