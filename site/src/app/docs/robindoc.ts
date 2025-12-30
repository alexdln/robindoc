import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getStaticParams, getMetadata, getPageData, getPageInstruction } = initializeRobindoc({
    configuration: {
        sourceRoot: "../docs",
        basePath: "/docs",
        gitToken: process.env.GIT_TOKEN,
        fetcher: (url, init) => fetch(url, { ...init, cache: "force-cache", next: { tags: ["docs"] } }),
    },
    items: [
        {
            title: "Introduction",
            type: "heading",
            href: "/",
            configuration: {
                sourceRoot: "../README.md",
            },
        },
        {
            type: "separator",
        },
        "auto",
    ],
});
