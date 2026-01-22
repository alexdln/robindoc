import { notFound } from "next/navigation";
import { initializeRobindoc } from "robindoc";

export const { Page, Sidebar, getStaticParams, getMetadata, getPageData, getPageInstruction } = initializeRobindoc(
    {
        configuration: {
            // sourceRoot: "../docs",
            sourceRoot: "../examples/robindoc-app/content",
            basePath: "/docs",
            gitToken: process.env.GIT_TOKEN,
            fetcher: (url, init) => fetch(url, { ...init, cache: "force-cache", next: { tags: ["docs"] } }),
            // spreadedLevel: 0,
        },
        // items: [
        //     {
        //         title: "Introduction",
        //         type: "heading",
        //         href: "/",
        //         configuration: {
        //             sourceRoot: "../README.md",
        //         },
        //     },
        //     {
        //         type: "separator",
        //     },
        //     "auto",
        // ],
        items: "auto",
    },
    {
        processError: notFound,
        matcher: ["/(?!.*\\..+).*"],
    },
);
