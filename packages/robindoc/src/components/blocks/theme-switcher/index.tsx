"use client";

import React from "react";

import "./theme-switcher.scss";

export type ThemeSwitcherProps = {
    translations?: {
        /** Dark Theme */
        dark?: string;
        /** System Theme */
        system?: string;
        /** Light Theme */
        light?: string;
    };
};

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ translations }) => {
    const { dark = "Dark Theme", system = "System Theme", light = "Light Theme" } = translations || {};
    const changeTheme = (theme: string) => {
        const root = document.querySelector(".r-root");

        if (!root) return;

        localStorage.setItem("r-theme", theme);
        root.classList.remove("r-theme-light", "r-theme-dark", "r-theme-system");
        if (theme === "system") {
            root.classList.add(`r-theme-system`);
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                root.classList.add("r-theme-dark");
            } else {
                root.classList.add("r-theme-light");
            }
        } else {
            root.classList.add(`r-theme-${theme}`);
        }
    };

    return (
        <div className="r-theme-switcher">
            <button
                className="r-theme-switcher-btn r-theme-switcher-btn__dark r-no-js"
                type="button"
                onClick={() => changeTheme("dark")}
                title={dark}
            >
                <svg width="16" height="16" viewBox="0 0 20 20" className="r-theme-switcher-svg">
                    <path
                        d="M9.5 2C8.50544 2.99456 7.9467 4.34348 7.9467 5.75C7.9467 7.15652 8.50544 8.50544 9.5 9.5C10.4946 10.4946 11.8435 11.0533 13.25 11.0533C14.6565 11.0533 16.0054 10.4946 17 9.5C17 10.9834 16.5601 12.4334 15.736 13.6668C14.9119 14.9001 13.7406 15.8614 12.3701 16.4291C10.9997 16.9968 9.49168 17.1453 8.03683 16.8559C6.58197 16.5665 5.2456 15.8522 4.1967 14.8033C3.14781 13.7544 2.4335 12.418 2.14411 10.9632C1.85472 9.50832 2.00325 8.00032 2.57091 6.62987C3.13856 5.25943 4.09986 4.08809 5.33323 3.26398C6.5666 2.43987 8.01664 2 9.5 2Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <button
                className="r-theme-switcher-btn r-theme-switcher-btn__system r-no-js"
                type="button"
                onClick={() => changeTheme("system")}
                title={system}
            >
                <svg width="16" height="16" viewBox="0 0 20 20" className="r-theme-switcher-svg">
                    <path
                        d="M15.0003 6.66683V5.00016C15.0003 4.55814 14.8247 4.13421 14.5122 3.82165C14.1996 3.50909 13.7757 3.3335 13.3337 3.3335H3.33366C2.89163 3.3335 2.46771 3.50909 2.15515 3.82165C1.84259 4.13421 1.66699 4.55814 1.66699 5.00016V10.8335C1.66699 11.2755 1.84259 11.6994 2.15515 12.012C2.46771 12.3246 2.89163 12.5002 3.33366 12.5002H10.0003"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8.33301 15.8332V12.5332V15.1582"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M5.83301 15.8335H9.99967"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M16.6663 10H14.9997C14.0792 10 13.333 10.7462 13.333 11.6667V16.6667C13.333 17.5871 14.0792 18.3333 14.9997 18.3333H16.6663C17.5868 18.3333 18.333 17.5871 18.333 16.6667V11.6667C18.333 10.7462 17.5868 10 16.6663 10Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
            <button
                className="r-theme-switcher-btn r-theme-switcher-btn__light r-no-js"
                type="button"
                onClick={() => changeTheme("light")}
                title={light}
            >
                <svg width="16" height="16" viewBox="0 0 20 20" className="r-theme-switcher-svg">
                    <path
                        d="M10.0003 13.3332C11.8413 13.3332 13.3337 11.8408 13.3337 9.99984C13.3337 8.15889 11.8413 6.6665 10.0003 6.6665C8.15938 6.6665 6.66699 8.15889 6.66699 9.99984C6.66699 11.8408 8.15938 13.3332 10.0003 13.3332Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M10 1.6665V3.33317" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10 16.6665V18.3332" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                        d="M4.1084 4.1084L5.2834 5.2834"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14.7168 14.7168L15.8918 15.8918"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M1.66699 10H3.33366" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.667 10H18.3337" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                        d="M5.2834 14.7168L4.1084 15.8918"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M15.8918 4.1084L14.7168 5.2834"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>
        </div>
    );
};
