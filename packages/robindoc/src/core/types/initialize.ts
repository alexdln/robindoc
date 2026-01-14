import { type Structure } from "./structure";

export type StructureTemplate = Structure | (() => Structure | Promise<Structure>);

export type Options = {
    processError?: (status: number, statusText: string) => void | null | never;
    matcher?: string[];
};
