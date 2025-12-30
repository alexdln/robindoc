import React from "react";

import { NavLink } from "../nav-link";

import "./pagination.scss";

export type PaginationProps = {
    prev?: { title: string; pathname: string };
    next?: { title: string; pathname: string };
    translations?: {
        /** Previous */
        previous?: string;
        /** Next */
        next?: string;
    };
};

export const Pagination: React.FC<PaginationProps> = async ({ prev, next, translations }) => {
    const { previous = "Previous", next: nextTranslation = "Next" } = translations || {};

    return (
        <div className="r-pagination">
            {prev ? (
                <NavLink href={prev.pathname} className="r-pagination-item _prev">
                    <span className="r-pagination-icon _prev">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="r-pagination-svg"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </span>
                    <span className="r-pagination-text">
                        <span>{previous}</span>
                        <br />
                        <span className="r-pagination-title">{prev.title}</span>
                    </span>
                </NavLink>
            ) : (
                <span />
            )}
            {next ? (
                <NavLink href={next.pathname} className="r-pagination-item _next">
                    <span className="r-pagination-icon _next">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="r-pagination-svg"
                        >
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </span>
                    <span className="r-pagination-text">
                        <span>{nextTranslation}</span>
                        <br />
                        <span className="r-pagination-title">{next.title}</span>
                    </span>
                </NavLink>
            ) : (
                <span />
            )}
        </div>
    );
};
