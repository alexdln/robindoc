import React from "react";
import clsx from "clsx";

import "./td.scss";

interface TdProps {
    className?: string;
    align?: "left" | "center" | "right" | null;
}

const ALIGN_CLASSES = {
    left: "r-td_left",
    center: "r-td_center",
    right: "r-td_right",
};

export const Td: React.FC<React.PropsWithChildren<TdProps>> = ({ className, children, align }) => {
    return <td className={clsx("r-td", className, align && ALIGN_CLASSES[align])}>{children}</td>;
};
