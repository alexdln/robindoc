# Configuration

`sourceRoot` - the root path for the documentation files. This can be either a relative path to a local directory or a git URL. Learn more about [Data Source](./03-data-source.md);

`basePath` - the path where the site will be available to users (for example, if the documentation is located at `robindoc.dev/docs`, `basePath` will be `/docs`);

`gitToken` - a token with access to the git project. Required if you are loading documentation from a remote git repository. Learn more about [Data Source](./03-data-source.md);

`fetcher` - a method that will load data from remote sources. Can be useful if you want to set up custom caching;

`provider` - a custom provider that handles all actions related to the data source. _Currently not recommended for use._

`spreadedLevel` - the nesting level up to which navigation elements are displayed as list items in the sidebar. By default it's `1`; if set to `0`, all elements will be nested in collapsible section dropdowns.

All configuration settings can be overridden further down the tree. Thus, they will be completely replaced for all sub-tree elements.
