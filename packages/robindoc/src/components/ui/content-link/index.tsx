"use client";

import React from "react";
import clsx from "clsx";

import { useLink } from "@src/components/stores/navigation/hooks";
import { ExternalMark } from "@src/components/ui/external-mark";

import "./content-link.scss";

export interface ContentLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    external?: boolean;
    href: string;
}

export const ContentLink: React.FC<ContentLinkProps> = ({ className, external, children, ...props }) => {
    const additionalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
    const Link = useLink();

    return (
        <Link className={clsx("r-content-link", className)} {...additionalProps} {...props}>
            {children}
            {external && <ExternalMark />}
        </Link>
    );
};
