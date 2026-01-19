/* eslint-disable @typescript-eslint/no-require-imports */
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const { default: preserveDirectives } = require("rollup-preserve-directives");

module.exports = {
    input: ["src/index.tsx"],
    output: [
        {
            dir: "lib",
            format: "es",
            sourcemap: true,
            preserveModules: true,
        },
    ],
    external: ["react", "react-dom", "next/navigation", "next/link", "robindoc/lib/client"],
    plugins: [commonjs(), typescript({ tsconfig: "./tsconfig.json" }), terser(), preserveDirectives()],
};
