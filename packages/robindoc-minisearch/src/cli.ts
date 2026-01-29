#!/usr/bin/env node

import { resolve, join } from "path";
import { existsSync } from "fs";
import { config as dotenvConfig } from "dotenv";
import { generateSearchIndex } from "./generate-search-index";
import { pathToFileURL } from "node:url";

dotenvConfig({
    path: [resolve(process.cwd(), ".env"), resolve(process.cwd(), ".env.local")],
    override: true,
    quiet: true,
});

const args = process.argv.slice(2);
const templateIndex = args.indexOf("--template");
const outputIndex = args.indexOf("--output");

if (templateIndex === -1 || !args[templateIndex + 1]) {
    console.error("Error: --template option is required");
    console.error("Usage: npx robindoc-minisearch --template <path> [--output <path>]");
    process.exit(1);
}

const templatePath = resolve(process.cwd(), args[templateIndex + 1]);
const templatePathUrl = pathToFileURL(templatePath).toString();
const outputPath =
    outputIndex !== -1 && args[outputIndex + 1]
        ? resolve(process.cwd(), args[outputIndex + 1])
        : join(process.cwd(), "public", "search-index.json");

if (!existsSync(templatePath)) {
    console.error(`Error: Template file not found: ${templatePath}`);
    process.exit(1);
}

const run = async () => {
    try {
        if (templatePath.endsWith(".ts") || templatePath.endsWith(".tsx")) {
            // @ts-expect-error - optional peer dependency
            const tsx = await import("tsx");

            if (tsx.register) {
                tsx.register();
            }
        }

        const templateModule = await import(templatePathUrl);
        const moduleDefault = "default" in templateModule ? templateModule.default : templateModule;
        const { getStaticParams, getPageData } = moduleDefault;

        if (!getStaticParams || !getPageData) {
            throw new Error(
                "Template file must export 'getStaticParams' and 'getPageData' from initializeRobindoc.\n" +
                    "Example: export const { getStaticParams, getPageData } = initializeRobindoc(...);",
            );
        }

        await generateSearchIndex(getStaticParams, getPageData, outputPath);

        console.log(`Search index generated successfully at ${outputPath}`);
        process.exit(0);
    } catch (error) {
        console.error("Failed to generate search index:", error);
        if (error instanceof Error) {
            console.error(error.message);
            if (error.stack) {
                console.error(error.stack);
            }
        }
        process.exit(1);
    }
};

run();
