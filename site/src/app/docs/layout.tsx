import type { Metadata } from "next";
import { DocsContainer, KeylinkToNavigation } from "robindoc";

import { Sidebar } from "./robindoc";

export const metadata: Metadata = {
    title: {
        template: "%s | Robindoc",
        default: "Robindoc Documentation",
    },
    description: "Robindoc Documentation",
};

const DocsLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <DocsContainer>
        <Sidebar />
        {children}
        <KeylinkToNavigation />
    </DocsContainer>
);

export default DocsLayout;
