import { type ReactNode } from "react";
import { RobinProvider, Header, Footer } from "robindoc";
import { NavigationProvider } from "@robindoc/next";

import { searchProvider } from "./search-provider";

import "robindoc/lib/styles.css";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <NavigationProvider>
                    <RobinProvider>
                        <Header
                            logo={<>RobinDoc</>}
                            links={[{ href: "/docs", title: "Docs" }]}
                            git="https://github.com/alexdln/robindoc"
                            searcher={searchProvider}
                        />
                        {children}
                        <Footer copyright="© 2026 RobinDoc" />
                    </RobinProvider>
                </NavigationProvider>
            </body>
        </html>
    );
}
