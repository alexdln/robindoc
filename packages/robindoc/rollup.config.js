/* eslint-disable @typescript-eslint/no-require-imports */
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const sass = require("rollup-plugin-sass");
const { default: preserveDirectives } = require("rollup-preserve-directives");
const copy = require("rollup-plugin-copy");

module.exports = {
    input: [
        "src/index.tsx",
        "src/client.tsx",
        "src/components/ui/code-block/index.client.tsx",
        "src/components/ui/code-block/index.isomorphic.tsx",
    ],
    output: [
        {
            dir: "lib",
            format: "es",
            sourcemap: true,
            preserveModules: true,
            assetFileNames: "[name][extname]",
        },
    ],
    external: [
        "hast-util-to-jsx-runtime",
        "react",
        "react/jsx-runtime",
        "react-dom",
        "html-react-parser",
        "gray-matter",
        "marked",
        "dot-prop",
        "github-slugger",
        "path",
        "shiki",
        "shiki/bundle/web",
        "fs",
        "fs/promises",
        "tinyglobby",
        "clsx",
    ],
    plugins: [
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        sass({
            output: "lib/styles.css",
            exclude: ["node_modules/"],
        }),
        terser(),
        preserveDirectives(),
        copy({
            targets: [{ src: "src/assets/global.css", dest: "lib" }],
        }),
    ],
};
