import React from "react";

import { ThemeSwitcher } from "@src/components/blocks/theme-switcher";
import { Container } from "@src/components/ui/container";

import "./footer.scss";

export type FooterProps = {
    copyright: string;
    hidePoweredBy?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ copyright, hidePoweredBy }) => (
    <footer className="r-footer">
        <Container className="r-footer-container">
            <div className="r-footer-row">
                <div className="r-copyright">{copyright}</div>
                <ThemeSwitcher />
            </div>
            {!hidePoweredBy && (
                <div className="r-footer-row r-footer-additional">
                    <div className="r-powered">
                        Powered by{" "}
                        <a
                            href="https://robindoc.com"
                            className="r-powered-link"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ROBINDOC
                        </a>
                    </div>
                </div>
            )}
        </Container>
    </footer>
);
