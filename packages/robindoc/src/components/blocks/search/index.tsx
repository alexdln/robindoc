"use client";

import "./search.scss";

import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import { useSystemType } from "@src/core/hooks/use-system-type";
import { KbdContainer, KbdKey } from "@src/components/ui/kbd";
import { createBaseSearcher } from "@src/core/utils/create-base-searcher";
import { useDebouncer } from "@src/core/hooks/use-debouncer";
import { Searcher, SearchResults } from "@src/core/types/search";
import { Backdrop } from "@src/components/ui/backdrop";
import { NavLink } from "@src/components/blocks/nav-link";

export interface SearchProps {
    searcher: Searcher | string;
    translations?: {
        /** Search... */
        search?: string;
        /** Type something... */
        typeSomething?: string;
        /** Nothing found */
        nothingFound?: string;
    };
}

export const Search: React.FC<SearchProps> = ({ searcher, translations = {} }) => {
    const { search = "Search...", typeSomething = "Type something...", nothingFound = "Nothing found" } = translations;
    const titleRef = useRef<HTMLSpanElement>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    const firstItem = useRef<HTMLAnchorElement | null>(null);
    const [results, setResults] = useState<SearchResults | null>(null);
    const system = useSystemType();

    const targetSearcher = useMemo(
        () => (typeof searcher === "string" ? createBaseSearcher(searcher) : searcher),
        [searcher],
    );

    const { handler } = useDebouncer(async (abortController, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        inputHandler(value);
        let newResults = null;
        if (value) {
            newResults = await targetSearcher(value, abortController);
        }
        setResults(newResults);
    });

    const openHandler = () => {
        const root = document.querySelector(".r-root");
        if (root) {
            root.classList.add("r-root_lock");
        }
        inputRef.current?.focus();
        dialogRef.current?.showModal();
    };
    const closeHandler = () => {
        const root = document.querySelector(".r-root");
        if (root) {
            root.classList.remove("r-root_lock");
        }
        dialogRef.current?.close();
    };

    useEffect(() => {
        const keyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                openHandler();
            }
        };
        window.addEventListener("keydown", keyDown);

        return () => {
            window.removeEventListener("keydown", keyDown);
        };
    }, []);

    const inputHandler = (text: string) => {
        if (titleRef.current) {
            titleRef.current.innerText = text || search;
        }
    };

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (firstItem.current) {
            firstItem.current.focus();
        }
    };

    return (
        <>
            <button type="button" className="r-search-btn r-no-js" onClick={openHandler}>
                <span className="r-search-title" ref={titleRef}>
                    {search}
                </span>
                {system && (
                    <KbdContainer className="r-search-kbd">
                        <KbdKey>{system === "apple" ? "⌘" : "CTRL"}</KbdKey>
                        <KbdKey>K</KbdKey>
                    </KbdContainer>
                )}
            </button>
            <dialog
                onClose={closeHandler}
                className={clsx("r-search-dialog", Boolean(results?.length) && "_active")}
                ref={dialogRef}
            >
                <Backdrop open onClose={closeHandler} />
                <div className="r-search-popup _visible">
                    <form className="r-search-popup-header" onSubmit={submitHandler} autoComplete="off">
                        <input
                            type="text"
                            name="search"
                            placeholder={typeSomething}
                            className="r-search-input"
                            onChange={handler}
                            ref={inputRef}
                        />
                        <KbdContainer className="r-search-kbd r-search-popup-kbd" onClick={closeHandler}>
                            <KbdKey>ESC</KbdKey>
                        </KbdContainer>
                    </form>
                    {results && (
                        <ul className="r-search-results">
                            {results.length > 0 ? (
                                results.map((item, index) => (
                                    <li key={item.href}>
                                        <NavLink
                                            href={item.href}
                                            onClick={closeHandler}
                                            className="r-search-item"
                                            ref={index === 0 ? firstItem : undefined}
                                        >
                                            <p className="r-search-item-title">{item.title}</p>
                                            {item.description && (
                                                <p className="r-search-item-desc">{item.description}</p>
                                            )}
                                        </NavLink>
                                    </li>
                                ))
                            ) : (
                                <p>{nothingFound}</p>
                            )}
                        </ul>
                    )}
                </div>
            </dialog>
        </>
    );
};
