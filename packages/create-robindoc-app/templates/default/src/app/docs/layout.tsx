import type { ReactNode } from "react";
import { DocsContainer, KeylinkToNavigation } from "robindoc";

import { Sidebar } from "./robindoc";

export default function DocsLayout({ children }: { children: ReactNode }) {
    return (
        <DocsContainer>
            <Sidebar />
            {children}
            <KeylinkToNavigation />
        </DocsContainer>
    );
}
