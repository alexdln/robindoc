import React from "react";
import clsx from "clsx";

import "./list-item.scss";

export interface ListItemProps {
    className?: string;
}

export const ListItem: React.FC<React.PropsWithChildren<ListItemProps>> = ({ className, children }) => {
    return <li className={clsx("r-li", className)}>{children}</li>;
};
