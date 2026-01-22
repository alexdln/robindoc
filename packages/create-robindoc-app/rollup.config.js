import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
    input: "src/cli.ts",
    output: {
        file: "lib/cli.js",
        format: "esm",
        sourcemap: true,
    },
    plugins: [
        commonjs(),
        typescript({
            tsconfig: "./tsconfig.json",
        }),
        terser(),
    ],
    external: ["fs", "fs/promises", "path", "url", "yargs", "yargs/helpers", "inquirer", "chalk", "child_process"],
};
