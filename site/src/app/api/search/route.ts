import { matchSorter } from "match-sorter";

import { getStaticParams, getPageData } from "../../docs/robindoc";

const headers = new Headers();
headers.set("Content-Type", "application/json; charset=UTF-8");

export const GET = async (request: Request) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("s");

    if (!search) return new Response(JSON.stringify([]), { headers });

    const staticParams = await getStaticParams();
    const docs: { href: string; raw: string; title: string }[] = [];

    for await (const staticParam of staticParams) {
        const pathname = `/${staticParam.segments.join("/")}`;
        const { raw, title } = await getPageData(pathname);
        docs.push({ href: pathname, raw, title });
    }

    const searchResults = matchSorter(docs, search, { keys: ["raw", "title"] });

    return new Response(
        JSON.stringify(searchResults.slice(0, 5).map((item) => ({ title: item.title, href: item.href }))),
        { headers },
    );
};
