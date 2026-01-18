/* eslint-disable @typescript-eslint/no-require-imports */
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const { default: preserveDirectives } = require("rollup-preserve-directives");

module.exports = {
    input: ["src/index.ts", "src/cli.ts", "src/provider.ts"],
    output: [
        {
            dir: "lib",
            format: "es",
            sourcemap: true,
            preserveModules: true,
        },
    ],
    external: ["minisearch", "fs", "fs/promises", "path", "node:url", "gray-matter", "marked", "tsx"],
    plugins: [commonjs(), typescript({ tsconfig: "./tsconfig.json" }), terser(), preserveDirectives()],
};
