import React from "react";
import clsx from "clsx";

import "./table.scss";

export interface TableProps {
    className?: string;
}

export const Table: React.FC<React.PropsWithChildren<TableProps>> = ({ className, children }) => {
    return <table className={clsx("r-table", className)}>{children}</table>;
};
