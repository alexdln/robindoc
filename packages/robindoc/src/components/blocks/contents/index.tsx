"use client";

import React, { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";
import { useHeadingIndex } from "@src/components/stores/contents/use-heading-index";
import { detectGitType } from "@src/core/utils/git-tools";

import "./contents.scss";

export interface ContentsProps extends React.PropsWithChildren {
    headings: { id: string; nested: boolean; title: string | React.ReactNode }[];
    hideContents?: boolean;
    editUri?: string | null;
    translations?: {
        /** On this page */
        onThisPage?: string;
        /** Edit on {service} */
        editOnService?: string;
    };
}

export const Contents: React.FC<ContentsProps> = ({ headings, hideContents, editUri, translations }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownContentRef = useRef<HTMLDivElement>(null);
    const { from, to } = useHeadingIndex();
    const { onThisPage = "On this page", editOnService = "Edit on {service}" } = translations || {};

    const recalculateOffset = useCallback(() => {
        if (dropdownContentRef.current && dropdownRef.current) {
            dropdownRef.current.style.setProperty("--drop-height", dropdownContentRef.current.offsetHeight + "px");
        }
    }, []);

    useEffect(recalculateOffset, []);

    return (
        <div className="r-contents">
            <div className="r-contents-sticky" ref={containerRef}>
                {headings.length > 0 && !hideContents && (
                    <>
                        <input
                            type="checkbox"
                            className="r-contents-control"
                            id="r-contents"
                            onClick={recalculateOffset}
                        />
                        <div className="r-contents-details">
                            <label className="r-contents-title" htmlFor="r-contents">
                                {onThisPage}
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="r-contents-chevron"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </label>
                            <div className="r-contents-list" ref={dropdownRef}>
                                <div className="r-contents-list-content" ref={dropdownContentRef}>
                                    {headings.map((heading, index) => (
                                        <a
                                            href={`#${heading.id}`}
                                            key={heading.id}
                                            className={clsx(
                                                "r-contents-link",
                                                heading.nested && "_nested",
                                                index <= from && "_passed",
                                                index <= to && "_visited",
                                                index >= from && index <= to && "_active",
                                            )}
                                            ref={(node) => {
                                                if (
                                                    node?.offsetTop &&
                                                    containerRef.current &&
                                                    containerRef.current.scrollHeight >
                                                        containerRef.current.clientHeight &&
                                                    from === index
                                                ) {
                                                    containerRef.current.scrollTo({
                                                        top: Math.max(
                                                            node.offsetTop - Math.ceil(window.innerHeight / 2),
                                                            0,
                                                        ),
                                                    });
                                                }
                                            }}
                                        >
                                            {heading.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {editUri?.match(/^https?:\/\//) && (
                    <div className="r-contents-actions">
                        <a href={editUri} target="_blank" rel="noopener noreferrer" className="r-contents-git">
                            {editOnService.replace("{service}", detectGitType(editUri).name)}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
