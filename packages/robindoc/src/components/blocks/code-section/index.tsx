import React from "react";
import { CodeBlock, type CodeBlockProps } from "@src/components/ui/code-block";
import { CopyButton, type CopyButtonProps } from "@src/components/ui/copy-button";
import { CopyText, type CopyTextProps } from "../../ui/copy-text";

import "./code-section.scss";

export interface CodeSectionProps extends CodeBlockProps {
    filename?: string;
    translations?: CopyButtonProps["translations"] & CopyTextProps["translations"];
}

export const CodeSection: React.FC<CodeSectionProps> = ({ filename, code, ...props }) => (
    <div className="r-code-section">
        {filename ? (
            <div className="r-code-section-header">
                <CopyText className="r-code-section-filename" text={filename} />
                <CopyButton raw={code} />
            </div>
        ) : (
            <CopyButton raw={code} className="r-code-section-copy" />
        )}
        <CodeBlock className="r-code-section-block" code={code} {...props} />
    </div>
);
