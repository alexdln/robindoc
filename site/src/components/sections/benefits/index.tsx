import { Heading } from "robindoc/lib/components/ui/heading";
import { Paragraph } from "robindoc/lib/components/ui/paragraph";
import { ContentLink } from "robindoc/lib/components/ui/content-link";

import "./benefits.scss";

const benefits = [
    {
        title: "Markdown-first approach",
        description:
            "Your documentation stays in standard markdown. View it on GitHub, npm, or any markdown reader. Robindoc adds the web interface without changing your files.",
        highlight: "100% compatible",
    },
    {
        title: "Adaptable to your workflow",
        description:
            "Unlike traditional static site generators, Robindoc processes markdown at page build time using React Server Components. Choose SSR, ISR, cacheComponents or whatever you need.",
        highlight: "Any strategy",
    },
    {
        title: "Works with existing projects",
        description:
            "Drop Robindoc into any RSC-friendly project. No bundler configuration, no webpack plugins, no special setup. It's just React components.",
        highlight: "Drop-in integration",
    },
    {
        title: "Flexible content sources",
        description:
            "Load documentation from local files, GitHub repositories, or remote URLs. Mix and match sources in a single documentation tree. Perfect for monorepos and multi-repo setups.",
        highlight: "Any source",
    },
];

export const Benefits: React.FC = () => (
    <section className="benefits">
        <div className="benefits-header">
            <Heading component="h2" className="benefits-title">
                Built for how you work
            </Heading>
            <Paragraph className="benefits-subtitle">
                Documentation that adapts to your workflow, not the other way around
            </Paragraph>
        </div>
        <div className="benefits-grid">
            {benefits.map((benefit) => (
                <div key={benefit.title} className="benefit-card">
                    <div className="benefit-badge">{benefit.highlight}</div>
                    <Heading component="h3" className="benefit-title">
                        {benefit.title}
                    </Heading>
                    <Paragraph className="benefit-description">{benefit.description}</Paragraph>
                </div>
            ))}
        </div>
        <Paragraph className="benefits-footer">
            Learn more about <ContentLink href="/docs/structure">documentation structure</ContentLink> and{" "}
            <ContentLink href="/docs/customization">customization options</ContentLink>.
        </Paragraph>
    </section>
);
