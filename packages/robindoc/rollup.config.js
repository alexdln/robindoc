/* eslint-disable @typescript-eslint/no-require-imports */
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const sass = require("rollup-plugin-sass");
const { default: preserveDirectives } = require("rollup-preserve-directives");

module.exports = {
    input: ["src/index.tsx"],
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
        "react",
        "react-dom",
        "next/link",
        "next/navigation",
        "html-react-parser",
        "gray-matter",
        "marked",
        "dot-prop",
        "github-slugger",
        "path",
        "shiki",
        "fs",
        "fs/promises",
        "glob",
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
    ],
};
