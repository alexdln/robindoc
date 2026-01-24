import React from "react";
import clsx from "clsx";

import "./paragraph.scss";

export interface ParagraphProps {
    className?: string;
}

export const Paragraph: React.FC<React.PropsWithChildren<ParagraphProps>> = ({ className, children }) => {
    return <p className={clsx("r-p", className)}>{children}</p>;
};
