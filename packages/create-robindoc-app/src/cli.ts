#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync } from "fs";
import { cp, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import chalk from "chalk";
import inquirer from "inquirer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type PackageManager = "pnpm" | "yarn" | "npm";

const detectPackageManager = (): PackageManager => {
    const agent = process.env.npm_config_user_agent || "";
    if (agent.startsWith("pnpm")) return "pnpm";
    if (agent.startsWith("yarn")) return "yarn";
    return "npm";
};

const run = async () => {
    const argv = yargs(hideBin(process.argv))
        .scriptName("create-robindoc-app")
        .usage("$0 [directory]")
        .help()
        .parseSync();

    const targetDirArg = (argv._[0] as string | undefined) ?? undefined;

    let appName = targetDirArg;

    if (!appName) {
        const res = await inquirer.prompt<{ appName: string }>([
            {
                type: "input",
                name: "appName",
                message: "Project name:",
                default: "robindoc-app",
            },
        ]);

        if (!res.appName) {
            console.log(chalk.red("Aborted."));
            process.exit(1);
        }

        appName = res.appName.trim();
    }

    const root = resolve(appName);

    if (existsSync(root)) {
        console.error(chalk.red(`\nDirectory ${appName} already exists.`));
        process.exit(1);
    }

    await mkdir(root, { recursive: true });

    console.log(chalk.cyan(`\nCreating a new robindoc app in ${root}...\n`));

    const pkgManager = detectPackageManager();
    const templateRoot = resolve(__dirname, "..", "templates", "default");

    await cp(templateRoot, root, { recursive: true, force: true, errorOnExist: true });

    console.log(chalk.cyan("\nInstalling dependencies...\n"));

    const installCmd = pkgManager === "pnpm" ? "pnpm install" : pkgManager === "yarn" ? "yarn" : "npm install";

    try {
        execSync(installCmd, { stdio: "inherit", cwd: root });

        console.log(
            [
                `${chalk.green(`Success! Created ${appName} at ${root}`)}`,
                "To start the development server, please run:",
                `\tcd ${appName}`,
                `\t${pkgManager === "npm" ? "npm run" : pkgManager} dev`,
            ].join("\n"),
        );
    } catch {
        console.log(
            chalk.yellow(
                `\nFailed to automatically install dependencies. Please run '${installCmd}' inside ${appName} manually.\n`,
            ),
        );
    }
};

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
