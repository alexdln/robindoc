import React from "react";
import clsx from "clsx";

import { ListItem } from "../../list";

import "./task-list-item.scss";

export interface TaskListItemProps {
    className?: string;
    defaultChecked?: boolean;
}

export const TaskListItem: React.FC<React.PropsWithChildren<TaskListItemProps>> = ({
    className,
    defaultChecked,
    children,
}) => {
    return (
        <ListItem className={clsx("r-task-li", className)}>
            <label className="r-task-label">
                <input type="checkbox" defaultChecked={defaultChecked} className="r-task-checkbox" />
                <span className="r-task-label-text">{children}</span>
            </label>
        </ListItem>
    );
};
