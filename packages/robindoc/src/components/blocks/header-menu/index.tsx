"use client";

import React, { useEffect, useState } from "react";

import { useNavigate } from "@src/components/contexts/navigate/use-navigate";

import "./header-menu.scss";

export type HeaderMenuProps = React.PropsWithChildren<{
    translations?: {
        /** Menu */
        menu?: string;
    };
}>;

export const HeaderMenu: React.FC<HeaderMenuProps> = ({ children, translations }) => {
    const { menu = "Menu" } = translations || {};
    const { addListener, removeListener } = useNavigate();
    const [opened, setOpened] = useState(false);

    const openHandler = () => {
        const root = document.querySelector(".r-root");
        if (root) {
            root.classList.add("r-root-tablet-lock");
        }
        setOpened(true);
        addListener("closeHeaderMenu", closeHandler);
    };

    const closeHandler = () => {
        const root = document.querySelector(".r-root");
        if (root) {
            root.classList.remove("r-root-tablet-lock");
        }
        setOpened(false);
        removeListener("closeHeaderMenu");
    };

    const toggleHandler = () => {
        if (opened) {
            closeHandler();
        } else {
            openHandler();
        }
    };

    useEffect(
        () => () => {
            closeHandler();
        },
        [],
    );

    return (
        <div className="r-header-menu">
            <input
                onChange={toggleHandler}
                checked={opened}
                id="header-burger"
                type="checkbox"
                className="r-header-input"
                hidden
            />
            <label className="r-header-burger" htmlFor="header-burger" aria-label={menu} role="button" tabIndex={0}>
                <span className="r-burger-line _top" />
                <span className="r-burger-line _bottom" />
            </label>
            <div className="r-header-responsive">{children}</div>
        </div>
    );
};
