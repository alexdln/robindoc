import React from "react";
import clsx from "clsx";

import "./th.scss";

export interface ThProps {
    className?: string;
    align?: "left" | "center" | "right" | null;
}

const ALIGN_CLASSES = {
    left: "r-th_left",
    center: "r-th_center",
    right: "r-th_right",
};

export const Th: React.FC<React.PropsWithChildren<ThProps>> = ({ className, children, align }) => {
    return <th className={clsx("r-th", className, align && ALIGN_CLASSES[align])}>{children}</th>;
};
