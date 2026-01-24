import React from "react";
import clsx from "clsx";

import { UnorderedList } from "../../list";

import "./task-unordered-list.scss";

export interface TaskUnorderedListProps {
    className?: string;
}

export const TaskUnorderedList: React.FC<React.PropsWithChildren<TaskUnorderedListProps>> = ({
    className,
    children,
}) => {
    return <UnorderedList className={clsx("r-task-ul", className)}>{children}</UnorderedList>;
};
