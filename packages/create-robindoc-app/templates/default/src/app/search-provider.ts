"use client";

import { createSearchProvider } from "@robindoc/minisearch/provider";

export const searchProvider = createSearchProvider("/search-index.json");
