import matter from "gray-matter";
import { lexer, Tokens } from "marked";
import { setProperty } from "dot-prop";

import { type BaseProvider } from "../providers/base";
import { loadContent } from "./load-content";
import { parseTokenText } from "./content-tools";

type GetMetadataOptions =
    | { uri: string; provider?: BaseProvider; content?: undefined }
    | { uri?: undefined; provider?: undefined; content: string };

export const getMetadata = async (opts: GetMetadataOptions) => {
    const { uri, provider, content } = opts;
    const { data } = uri ? await loadContent(uri, provider) : { data: content };

    if (!data) {
        throw new Error("Robindoc: Please provide content or valid URI");
    }

    const { content: matterContent, data: matterData } = matter(data);
    const tree = lexer(matterContent);

    const robinData = Object.entries(tree.links).reduce<Record<string, string>>((acc, cur) => {
        const [key, value] = cur;
        const content = value.title;
        const metaKey = key.startsWith("robin.") && key.substring(6);

        if (content && metaKey) {
            setProperty(acc, metaKey, content);
        }

        return acc;
    }, matterData);

    if (!robinData.title) {
        const pageHeading = tree.find((el) => el.type === "heading" && el.depth === 1) as Tokens.Heading | undefined;
        if (pageHeading?.text) {
            robinData.title = parseTokenText(pageHeading);
        }
    }

    if (!robinData.description) {
        const firstParagraph = tree.find((el) => el.type === "paragraph") as Tokens.Heading | undefined;
        if (firstParagraph?.text) {
            robinData.description = parseTokenText(firstParagraph);
        }
    }

    return robinData;
};
