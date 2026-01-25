import React from "react";
import clsx from "clsx";

export interface TheadProps {
    className?: string;
}

export const Thead: React.FC<React.PropsWithChildren<TheadProps>> = ({ className, children }) => {
    return <thead className={clsx("r-thead", className)}>{children}</thead>;
};
