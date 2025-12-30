import { type MetadataRoute } from "next";
import { getStaticParams } from "./robindoc";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const staticParams = await getStaticParams();
    staticParams.push({ segments: [] });

    return staticParams.map((staticParam) => ({
        url: `https://nextjs-dev.robindoc.com/${staticParam.segments.join("/")}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.7,
    }));
};

export default sitemap;
