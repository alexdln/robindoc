import React from "react";
import clsx from "clsx";

export interface DelProps {
    className?: string;
}

export const Del: React.FC<React.PropsWithChildren<DelProps>> = ({ className, children }) => {
    return <del className={clsx("r-del", className)}>{children}</del>;
};
