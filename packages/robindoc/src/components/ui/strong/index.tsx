import React from "react";
import clsx from "clsx";

export interface StrongProps {
    className?: string;
}

export const Strong: React.FC<React.PropsWithChildren<StrongProps>> = ({ className, children }) => {
    return <strong className={clsx("r-strong", className)}>{children}</strong>;
};
