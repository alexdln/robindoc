import React from "react";

import { Container } from "@src/components/ui/container";

import "./blog-container.scss";

/**
 * Container component for blog layout.
 * Provides proper styling and structure for blog pages.
 *
 * @see {@link https://robindoc.com/docs/customization/elements/containers Containers}
 */
export const BlogContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <Container component="main" className="r-blog-container">
            {children}
        </Container>
    );
};
