import React from "react";
import Link, { type LinkProps } from "next/link";
import clsx from "clsx";

import { ExternalMark } from "../external-mark";

import "./content-link.scss";

export interface ContentLinkProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">, React.PropsWithChildren<LinkProps> {
    external?: boolean;
}

export const ContentLink: React.FC<ContentLinkProps> = ({ className, external, children, ...props }) => {
    const additionalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

    return (
        <Link className={clsx("r-content-link", className)} {...additionalProps} {...props}>
            {children}
            {external && <ExternalMark />}
        </Link>
    );
};
