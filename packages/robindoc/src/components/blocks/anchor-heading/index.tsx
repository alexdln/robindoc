"use client";

import React from "react";
import { useHeadingRegister } from "@src/components/stores/contents/use-heading-register";
import { Heading } from "@src/components/ui/heading";

import "./anchor-heading.scss";

interface AnchorHeadingProps extends React.PropsWithChildren {
    id: string;
    component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const AnchorHeading: React.FC<AnchorHeadingProps> = ({ component: Component, id, children }) => {
    const register = useHeadingRegister();

    return (
        <Heading component={Component} id={id} className="r-anchor-heading" ref={register}>
            {children}&nbsp;
            <a href={`#${id}`} className="r-anchor-heading-link" />
        </Heading>
    );
};
