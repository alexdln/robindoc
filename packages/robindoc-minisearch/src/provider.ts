import { createStaticSearcher } from "./create-static-searcher";

/**
 * Alias for createStaticSearcher, exported as provider for convenience.
 * Creates a searcher function that loads and queries a static search index.
 *
 * @see {@link https://robindoc.com/docs/customization/search Search integration}
 */
export const createSearchProvider = createStaticSearcher;
