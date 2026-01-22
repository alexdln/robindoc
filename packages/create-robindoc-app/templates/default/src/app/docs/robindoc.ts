import { notFound } from "next/navigation";
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getPageData, getMetadata, getStaticParams, getPageInstruction } = initializeRobindoc(
    {
        configuration: {
            sourceRoot: "./content",
            basePath: "/docs",
        },
        items: "auto",
    },
    {
        processError: notFound,
        matcher: ["/(?!.*\\..+).*"],
    },
);
