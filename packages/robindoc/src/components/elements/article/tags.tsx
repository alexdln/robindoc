import { AnchorHeading } from "@src/components/blocks/anchor-heading";
import { CodeSection } from "@src/components/blocks/code-section";
import { NavContentLink } from "@src/components/blocks/nav-content-link";
import { Block } from "@src/components/ui/block";
import { Blockquote } from "@src/components/ui/blockquote";
import { CodeBlock } from "@src/components/ui/code-block/index.server";
import { CodeSpan } from "@src/components/ui/code-span";
import { Del } from "@src/components/ui/del";
import { Em } from "@src/components/ui/em";
import { Heading } from "@src/components/ui/heading";
import { Hr } from "@src/components/ui/hr";
import { Img } from "@src/components/ui/img";
import { ListItem, OrderedList, UnorderedList } from "@src/components/ui/list";
import { Paragraph } from "@src/components/ui/paragraph";
import { Strong } from "@src/components/ui/strong";
import { Table, Tbody, Td, Th, Thead, Tr } from "@src/components/ui/table";
import { Tabs } from "@src/components/ui/tabs";
import { TaskListItem, TaskOrderedList, TaskUnorderedList } from "@src/components/ui/task-list";

export const DEFAULT_TAGS = {
    Heading,
    AnchorHeading,
    ContentLink: NavContentLink,
    Block,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    CodeBlock,
    CodeSpan,
    Del,
    Em,
    Hr,
    Img,
    ListItem,
    OrderedList,
    UnorderedList,
    Paragraph,
    Strong,
    TaskListItem,
    TaskOrderedList,
    TaskUnorderedList,
    Tabs,
    CodeSection,
    Blockquote,
};
