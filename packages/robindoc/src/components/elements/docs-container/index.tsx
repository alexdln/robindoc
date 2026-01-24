import React from "react";

import { Container } from "@src/components/ui/container";

import "./docs-container.scss";

/**
 * Container component for documentation layout.
 * Provides proper styling and structure for docs pages.
 *
 * @see {@link https://robindoc.com/docs/customization/elements/containers Containers}
 */
export const DocsContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Container component="main" className="r-docs-container">
            {children}
        </Container>
    );
};
