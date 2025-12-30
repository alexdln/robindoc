import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { Header, Footer, RobinProvider, KeylinkToContent } from "robindoc";

import { Logo } from "../components/ui/logo";

import "robindoc/lib/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://robindoc.com"),
    title: "Robindoc",
    description:
        "Robindoc is a framework for automatically creating documentation websites based on markdown files. Write the documentation however you want, Robindoc will build it on top. Fast, simple, easy",
    openGraph: {
        images: ["/preview.jpg"],
    },
};

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <html lang="en">
        <body className={inter.className}>
            <RobinProvider>
                <KeylinkToContent />
                <Header
                    links={[
                        { href: "/docs", title: "Docs" },
                        { href: "/showcase", title: "Showcase" },
                    ]}
                    logo={<Logo />}
                    git="https://github.com/alexdln/robindoc"
                    searcher="/api/search"
                />
                {children}
                <Footer copyright="© 2024 All rights reserved" />
            </RobinProvider>
            <Analytics />
        </body>
    </html>
);

export default RootLayout;
