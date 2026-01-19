import React from "react";
import clsx from "clsx";

import { ExternalMark } from "../external-mark";
import { useLink } from "@src/components/stores/navigation/hooks";

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
