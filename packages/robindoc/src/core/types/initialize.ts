import { type Structure } from "./structure";

/**
 * Structure template for documentation initialization.
 * Can be a static structure object or an async function that returns one.
 *
 * @see {@link https://robindoc.com/docs/structure/structure Structure documentation}
 */
export type StructureTemplate = Structure | (() => Structure | Promise<Structure>);

/**
 * Initialization options for Robindoc.
 */
export type Options = {
    /** Custom error handler. Receives HTTP status code and message, returns React node or null. */
    processError?: (status: number, statusText: string) => void | null | never;
    /** Array of regex patterns to validate pathnames. Only matching paths will be processed. */
    matcher?: string[];
    /** Enable caching of structure data. Defaults to false (revalidates on each request). */
    cache?: boolean;
};
