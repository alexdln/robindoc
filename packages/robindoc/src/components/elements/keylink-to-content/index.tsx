import React from "react";

import { Keylink } from "@src/components/ui/keylink";

import "./keylink-to-content.scss";

export type KeylinkToContentProps = {
    translations?: {
        /** Skip to main content */
        skipToMainContent?: string;
    };
};

/**
 * Keyboard-accessible skip link to main content.
 * Provides quick navigation for keyboard and screen reader users.
 *
 * @see {@link https://robindoc.com/docs/customization/elements/keylinks Keylinks}
 */
export const KeylinkToContent: React.FC<KeylinkToContentProps> = ({ translations }) => {
    const { skipToMainContent = "Skip to main content" } = translations || {};

    return (
        <Keylink className="keylink-to-content" toId="main-content">
            {skipToMainContent}
        </Keylink>
    );
};
