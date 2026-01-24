import React from "react";
import clsx from "clsx";

export interface TrProps {
    className?: string;
}

export const Tr: React.FC<React.PropsWithChildren<TrProps>> = ({ className, children }) => {
    return <tr className={clsx("r-tr", className)}>{children}</tr>;
};
