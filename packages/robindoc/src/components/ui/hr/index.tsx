import React from "react";
import clsx from "clsx";

export interface HrProps {
    className?: string;
}

export const Hr: React.FC<React.PropsWithChildren<HrProps>> = ({ className, children }) => {
    return <hr className={clsx("r-hr", className)}>{children}</hr>;
};
