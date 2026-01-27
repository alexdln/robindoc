import React from "react";
import clsx from "clsx";

import "./code-span.scss";

export type CodeSpanProps = React.HTMLAttributes<HTMLElement>;

export const CodeSpan: React.FC<CodeSpanProps> = ({ className, children, ...props }) => {
    return (
        <code className={clsx("r-code-span", className)} {...props}>
            {children}
        </code>
    );
};
