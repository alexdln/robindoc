"use client";

import React from "react";

import { useNavigate } from "@src/components/stores/navigate/use-navigate";
import { ContentLink, type ContentLinkProps } from "@src/components/ui/content-link";

type NavContentLinkProps = ContentLinkProps;

export const NavContentLink: React.FC<NavContentLinkProps> = ({ onClick, ...props }) => {
    const { listeners } = useNavigate();

    const clickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        [...listeners].forEach((el) => el.listener());
        if (onClick) onClick(e);
    };

    return <ContentLink onClick={clickHandler} {...props} />;
};
