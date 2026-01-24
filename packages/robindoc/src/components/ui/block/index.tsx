import React from "react";
import clsx from "clsx";

import "./block.scss";

export interface BlockProps {
    className?: string;
}

export const Block: React.FC<React.PropsWithChildren<BlockProps>> = ({ className, children }) => {
    return <div className={clsx("r-block", className)}>{children}</div>;
};
