import React from "react";
import clsx from "clsx";

export interface EmProps {
    className?: string;
}

export const Em: React.FC<React.PropsWithChildren<EmProps>> = ({ className, children }) => {
    return <em className={clsx("r-em", className)}>{children}</em>;
};
