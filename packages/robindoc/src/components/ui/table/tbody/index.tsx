import React from "react";
import clsx from "clsx";

export interface TbodyProps {
    className?: string;
}

export const Tbody: React.FC<React.PropsWithChildren<TbodyProps>> = ({ className, children }) => {
    return <tbody className={clsx("r-tbody", className)}>{children}</tbody>;
};
