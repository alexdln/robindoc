import React from "react";

import { type CodeBlockProps } from "@src/components/ui/code-block/index.server";
import { CopyButton, type CopyButtonProps } from "@src/components/ui/copy-button";
import { CopyText, type CopyTextProps } from "../../ui/copy-text";

import "./code-section.scss";

export interface CodeSectionProps extends Pick<CodeBlockProps, "code"> {
    filename?: string;
    translations?: CopyButtonProps["translations"] & CopyTextProps["translations"];
    children?: React.ReactNode;
}

export const CodeSection: React.FC<CodeSectionProps> = ({ filename, code, children }) => (
    <div className="r-code-section">
        {filename ? (
            <div className="r-code-section-header">
                <CopyText className="r-code-section-filename" text={filename} />
                <CopyButton raw={code} />
            </div>
        ) : (
            <CopyButton raw={code} className="r-code-section-copy" />
        )}
        {children}
    </div>
);
