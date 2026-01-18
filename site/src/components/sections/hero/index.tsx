import { Heading } from "robindoc/lib/components/ui/heading";
import { Paragraph } from "robindoc/lib/components/ui/paragraph";

import { Action } from "@/components/ui/action";

import "./hero.scss";

export const Hero: React.FC = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <p className="hero-badge">React Server Components • Bundler-free</p>
                <Heading component="h1" className="hero-title">
                    Documentation that works with your workflow
                </Heading>
                <Paragraph className="hero-description">
                    Build production-ready documentation from your existing markdown files in your existing product with
                    your existing tooling.
                </Paragraph>
                <div className="hero-actions">
                    <Action href="/docs" variant="primary">
                        Get Started
                    </Action>
                    <Action href="/docs/getting-started/installation" variant="secondary">
                        View Docs
                    </Action>
                </div>
                <div className="hero-install">
                    <span className="hero-install-label">Install</span>
                    <code className="hero-install-code">
                        <span className="hero-install-prefix">npm</span> install robindoc
                    </code>
                </div>
            </div>
        </section>
    );
};
