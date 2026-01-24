import React from "react";
import clsx from "clsx";

import "./heading.scss";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ component: Component, className, ...props }, ref) => {
        return <Component className={clsx(`r-h r-${Component}`, className)} {...props} ref={ref} />;
    },
);
