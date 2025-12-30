import React from "react";

import "./package-links.scss";

export const PackageLinks = () => {
    return (
        <div className="package-links">
            <a
                href="https://npmjs.com/package/robindoc"
                className="package-links-link package-links-link-npm"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="package-links-link-inner">NPM</span>
            </a>
            <a
                href="https://github.com/alexdln/robindoc"
                className="package-links-link package-links-link-github"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="package-links-link-inner">GitHub</span>
            </a>
        </div>
    );
};
