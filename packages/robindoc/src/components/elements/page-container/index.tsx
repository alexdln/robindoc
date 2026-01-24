import React from "react";

import { Container } from "@src/components/ui/container";

import "./page-container.scss";

/**
 * Generic page container component.
 * Provides basic page layout structure.
 *
 * @see {@link https://robindoc.com/docs/customization/elements/containers Containers}
 */
export const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Container component="main" className="r-page-container">
            {children}
        </Container>
    );
};
