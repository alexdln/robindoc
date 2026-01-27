import { type Token, type Tokens, type TokensList } from "marked";
import { type BundledLanguage } from "shiki";
import React from "react";
import parse, {
    attributesToProps,
    domToReact,
    Text,
    type DOMNode,
    type HTMLReactParserOptions,
} from "html-react-parser";
import clsx from "clsx";

import { type BaseProvider } from "@src/core/providers/base";
import { type Components, type RobinProps } from "@src/core/types/content";

import { type PagesType } from "./types";
import {
    formatId,
    formatLinkHref,
    parseBlockqoute,
    parseCodeLang,
    parseMarkdown,
    validateComponentName,
    type AnchorData,
} from "./utils";
import { DEFAULT_TAGS } from "./tags";
import { TabsProps } from "@src/components/ui/tabs";

interface DocumentJSXProps extends Omit<DocumentProps, "tokens" | "headings"> {
    raw: string;
    pages?: PagesType;
    tags: typeof DEFAULT_TAGS;
}

const DocumentJSX: React.FC<DocumentJSXProps> = ({ raw, components, tags: Tags, ...baseProps }) => {
    const parseOptions: HTMLReactParserOptions = {
        replace(domNode) {
            if (domNode instanceof Text && domNode.data) {
                const { headings, tokens } = parseMarkdown(domNode.data);

                return (
                    <Document
                        headings={headings}
                        tokens={tokens}
                        components={components}
                        tags={Tags}
                        subtree
                        {...baseProps}
                    />
                );
            }

            if (!("name" in domNode)) return <></>;

            if (domNode.name === "a" && "attribs" in domNode) {
                const { href, external } = formatLinkHref(domNode.attribs.href, baseProps.pathname, baseProps.pages);

                if (href === "") return domToReact(domNode.children as DOMNode[], parseOptions);

                return (
                    <Tags.ContentLink {...attributesToProps(domNode.attribs)} href={href} external={external}>
                        {domToReact(domNode.children as DOMNode[], parseOptions)}
                    </Tags.ContentLink>
                );
            }

            if (!validateComponentName(domNode.name)) return domNode;

            if (!components || !(domNode.name in components)) {
                console.warn(`Unknown component: "${domNode.name}"`);
                return <></>;
            }

            const props = "attribs" in domNode ? attributesToProps(domNode.attribs) : {};
            const Component = components[domNode.name];
            const children = "children" in domNode ? domNode.children : null;

            return (
                <Component {...props}>{children ? domToReact(children as DOMNode[], parseOptions) : null}</Component>
            );
        },
        htmlparser2: {
            lowerCaseTags: false,
            lowerCaseAttributeNames: false,
        },
    };
    return parse(raw, parseOptions);
};

export type DocumentProps = {
    pathname: string;
    components?: Components;
    config?: {
        publicDirs?: string[];
    };
    uri?: string;
    targetProvider?: BaseProvider | null;
    tokens: TokensList;
    headings: AnchorData[];
    subtree?: boolean;
    pages?: PagesType;
    tags?: Partial<typeof DEFAULT_TAGS>;
};

export const Document: React.FC<DocumentProps> = ({
    pathname,
    components,
    tags: userTags = {},
    uri,
    targetProvider,
    tokens,
    headings,
    config = {},
    subtree,
    pages,
}) => {
    const { publicDirs } = config;
    const Tags = { ...DEFAULT_TAGS, ...userTags };

    let robin:
        | null
        | { props: RobinProps; childTokens: Token[]; componentName: string; type: "base" }
        | { type: "dummy" } = null;
    const insertedCodeKeys = new Set();
    const DocumentToken: React.FC<{ token: Token | Token[] }> = ({ token }) => {
        if (!token) return null;

        if (robin) {
            if (!Array.isArray(token) && token.type === "html" && token.raw.trim() === "<!---/robin-->") {
                if (robin.type === "dummy") {
                    robin = null;
                    return null;
                }

                const { componentName, childTokens, props } = robin;
                const RobinComponent = components![componentName];
                robin = null;
                return (
                    <RobinComponent {...props}>
                        <DocumentToken token={childTokens} />
                    </RobinComponent>
                );
            } else {
                if (robin.type === "dummy") return null;

                if (Array.isArray(token)) {
                    robin.childTokens.push(...token);
                } else {
                    robin.childTokens.push(token);
                }
                return null;
            }
        }

        if (Array.isArray(token)) {
            return token.reduce<{ list: React.ReactNode[]; codeQueue: Token[] }>(
                (acc, t, index) => {
                    if (t.type === "code" && parseCodeLang(t.lang).configuration.switcher) {
                        acc.codeQueue.push(t);
                        return acc;
                    }
                    if (acc.codeQueue.length > 0 && t.type !== "space") {
                        const collectedRaw = acc.codeQueue.map((t) => t.raw).join("");
                        acc.list.push(
                            <DocumentToken
                                token={{ type: "code-group", tabs: acc.codeQueue, raw: collectedRaw }}
                                key={collectedRaw + index}
                            />,
                        );
                        acc.codeQueue = [];
                    }
                    acc.list.push(<DocumentToken token={t} key={(t as Tokens.Text).raw + index} />);
                    return acc;
                },
                { list: [], codeQueue: [] },
            ).list;
        }

        switch (token.type) {
            case "heading":
                const Component = `h${token.depth}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
                const predefinedData = headings.find((heading) => heading.token === token);
                if (predefinedData?.id) {
                    return (
                        <Tags.AnchorHeading component={Component} id={predefinedData.id}>
                            {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                        </Tags.AnchorHeading>
                    );
                }

                return (
                    <Tags.Heading component={Component} id={token.depth === 1 ? "main-content" : undefined}>
                        {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                    </Tags.Heading>
                );
            case "table":
                return (
                    <Tags.Block>
                        <Tags.Table>
                            <Tags.Thead>
                                <Tags.Tr>
                                    {token.header.map((t: Tokens.TableCell, index: number) => (
                                        <Tags.Th key={t.text + index} align={t.align}>
                                            {t.tokens ? <DocumentToken token={t.tokens} /> : t.text}
                                        </Tags.Th>
                                    ))}
                                </Tags.Tr>
                            </Tags.Thead>
                            <Tags.Tbody>
                                {token.rows.map((row: Tokens.TableCell[], rowIndex: number) => (
                                    <Tags.Tr key={rowIndex}>
                                        {row.map((elem, elemIndex) => (
                                            <Tags.Td key={elem.text + elemIndex} align={elem.align}>
                                                {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.text}
                                            </Tags.Td>
                                        ))}
                                    </Tags.Tr>
                                ))}
                            </Tags.Tbody>
                        </Tags.Table>
                    </Tags.Block>
                );
            case "link":
                const { href, external } = formatLinkHref(token.href, pathname, pages);

                if (href === "") return token.tokens ? <DocumentToken token={token.tokens} /> : token.raw;

                return (
                    <Tags.ContentLink href={href} external={external}>
                        {token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}
                    </Tags.ContentLink>
                );
            case "hr":
                return <Tags.Hr />;
            case "image":
                return (
                    <Tags.Img
                        src={token.href}
                        publicDirs={publicDirs}
                        provider={targetProvider}
                        uri={uri}
                        alt={token.title || ""}
                    />
                );
            case "paragraph":
                if (subtree) return token.tokens ? <DocumentToken token={token.tokens} /> : token.raw;
                if (
                    token.tokens?.some((t) => t.type === "html") &&
                    token.tokens?.every((t) => t.type === "html" || t.type === "text" || t.raw === "\n")
                ) {
                    return <DocumentToken token={{ ...token, type: "html" }} />;
                }

                return (
                    <Tags.Paragraph>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Tags.Paragraph>
                );
            case "strong":
                return <Tags.Strong>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Tags.Strong>;
            case "del":
                return <Tags.Del>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Tags.Del>;
            case "em":
                return <Tags.Em>{token.tokens ? <DocumentToken token={token.tokens} /> : token.raw}</Tags.Em>;
            case "blockquote":
                const { token: blockquoteToken, type } = parseBlockqoute(token);

                return (
                    <Tags.Blockquote type={type}>
                        {blockquoteToken.tokens ? (
                            <DocumentToken token={blockquoteToken.tokens} />
                        ) : (
                            blockquoteToken.raw
                        )}
                    </Tags.Blockquote>
                );
            case "codespan":
                const inlineCode = token.raw.replace(/^`|`$/g, "");
                const hightlightMatch = inlineCode.match(/(.+){:([a-zA-Z]+)}$/);
                if (hightlightMatch) {
                    const [, raw, lang] = hightlightMatch;
                    return <Tags.CodeBlock code={raw} lang={lang as BundledLanguage} inline />;
                }

                return <Tags.CodeSpan>{inlineCode}</Tags.CodeSpan>;
            case "code-group":
                const tabsData = token.tabs.reduce((acc: TabsProps["tabsData"], t: Tokens.Code) => {
                    const { lang, configuration } = parseCodeLang(t.lang || "");
                    const tabKey = typeof configuration.tab === "string" ? formatId(configuration.tab) : lang;
                    acc[tabKey] = {
                        tabName: (configuration.tab || lang).toString(),
                        element: <DocumentToken token={t} key={t.raw} />,
                    };
                    if (typeof configuration.clone === "string") {
                        const copies = configuration.clone.split(",");

                        copies.forEach((copy) => {
                            const [copyLang, copyTab, filename] = copy.split("|");
                            const copyTabKey = typeof copyTab === "string" ? formatId(copyTab) : copyLang;
                            acc[copyTabKey] = {
                                tabName: (configuration.tab || lang).toString(),
                                element: (
                                    <DocumentToken
                                        token={{
                                            ...t,
                                            lang: `${copyLang} switcher tab="${copyTabKey}" filename="${filename}"`,
                                        }}
                                        key={t.raw}
                                    />
                                ),
                            };
                        });
                    }
                    return acc;
                }, []);
                const tabsKey = Object.keys(tabsData).sort().join("-");
                insertedCodeKeys.add(tabsKey);
                return (
                    <Tags.Tabs
                        type="code"
                        tabsData={tabsData}
                        insertStyles={!insertedCodeKeys.has(tabsKey) || "useState" in React}
                        blockKey={tabsKey}
                    />
                );
            case "code":
                const { lang, configuration } = parseCodeLang(token.lang);

                return (
                    <Tags.CodeSection code={token.text} {...configuration}>
                        <Tags.CodeBlock
                            className={clsx("r-code-section-block", !configuration.filename && "_space-right")}
                            code={token.text}
                            lang={lang as BundledLanguage}
                        />
                    </Tags.CodeSection>
                );
            case "escape":
                return token.text;
            case "list":
                const isTaskList = token.items.every((i: Tokens.ListItem) => i.task);
                if (isTaskList) {
                    const ListComponent = token.ordered ? Tags.TaskOrderedList : Tags.TaskUnorderedList;
                    return (
                        <ListComponent start={token.start}>
                            {token.items.map((elem: Tokens.ListItem, index: number) => (
                                <Tags.TaskListItem key={elem.raw + index} defaultChecked={elem.checked}>
                                    {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.raw}
                                </Tags.TaskListItem>
                            ))}
                        </ListComponent>
                    );
                }

                const ListComponent = token.ordered ? Tags.OrderedList : Tags.UnorderedList;
                return (
                    <ListComponent start={token.start}>
                        {token.items.map((elem: Tokens.ListItem, index: number) => (
                            <Tags.ListItem key={elem.raw + index}>
                                {elem.tokens ? <DocumentToken token={elem.tokens} /> : elem.raw}
                            </Tags.ListItem>
                        ))}
                    </ListComponent>
                );
            case "html":
                const text = token.raw.trim();

                if (text.startsWith("<!---robin") && text.endsWith("-->")) {
                    const selfClosed = text.endsWith("/-->");
                    const componentName = text.match(/<!---robin ([\w]+)/)?.[1];

                    if (!componentName) {
                        if (!selfClosed) robin = { type: "dummy" };
                        return null;
                    }

                    if (!validateComponentName(componentName)) {
                        console.warn(
                            `"${componentName}" is using incorrect casing. Use PascalCase for Robin components`,
                        );
                        if (!selfClosed) robin = { type: "dummy" };
                        return null;
                    }

                    if (!components || !(componentName in components)) {
                        console.warn(`Unknown component: "${componentName}"`);
                        if (!selfClosed) robin = { type: "dummy" };
                        return null;
                    }
                    const propRows = text.split(/\r?\n/).slice(1, -1);
                    const props = propRows.reduce<{ [key: string]: string | true }>((acc, cur) => {
                        const [_match, key, value] = cur.match(/^([\w]+)(?:="(.+)")?$/) || [];

                        if (!_match) {
                            console.warn(`Invalid component attribute: "${cur}"`);
                            return acc;
                        }

                        acc[key] = value ?? true;
                        return acc;
                    }, {});

                    if (selfClosed) {
                        const Component = components[componentName as keyof typeof components];
                        return <Component {...props} />;
                    }

                    robin = { props, componentName, childTokens: [], type: "base" };
                    return null;
                }

                return (
                    <DocumentJSX
                        raw={token.raw}
                        components={components}
                        config={config}
                        targetProvider={targetProvider}
                        pathname={pathname}
                        uri={uri}
                        pages={pages}
                        tags={Tags}
                    />
                );
            case "text":
                if ("tokens" in token) {
                    return <DocumentToken token={token.tokens || []} />;
                }
                return token.raw;
            case "space":
                return null;
            // Definitions should not be rendered, they are used only as comments or meta data
            case "def":
                return null;
            // br are inserted between elements. In our case, sufficient indentation is set everywhere, so we ignore them
            case "br":
                return null;
            // checkbox are rendered as part of the task list item, so we ignore them
            case "checkbox":
                return null;
            default:
                if (!token.type && "raw" in token) return token.raw;

                console.warn(`Unknown token ${token.type}`, token);
                return null;
        }
    };

    return <DocumentToken token={[...tokens, { type: "text", raw: "" }]} />;
};
