import { Heading } from "robindoc/lib/components/ui/heading";
import { Paragraph } from "robindoc/lib/components/ui/paragraph";

import "./key-features.scss";

const features = [
    {
        title: "Zero Configuration",
        description: "Works with existing markdown files. No bundler setup, no build-time processing required.",
    },
    {
        title: "React Server Components",
        description: "Built entirely on RSC architecture. Static-side rendering with minimal client JavaScript.",
    },
    {
        title: "Multiple Data Sources",
        description: "Load from local directories, GitHub repos, or remote files. Mix sources in a single tree.",
    },
    {
        title: "Full Isolation",
        description: "No global styles, no conflicts. Safely integrate into any RSC-friendly project or existing site.",
    },
    {
        title: "Automatic Structure",
        description: "Auto-generate documentation structure or define it manually. Full control when you need it.",
    },
    {
        title: "Production Ready",
        description: "Optimized for Core Web Vitals, accessibility, and SEO. Built for scale and performance.",
    },
];

export const KeyFeatures: React.FC = () => (
    <section className="key-features">
        <div className="key-features-header">
            <Heading component="h2" className="key-features-title">
                Everything you need, nothing you don't
            </Heading>
            <Paragraph className="key-features-subtitle">
                A documentation framework designed for modern React applications
            </Paragraph>
        </div>
        <div className="key-features-grid">
            {features.map((feature) => (
                <div key={feature.title} className="key-feature-card">
                    <Heading component="h3" className="key-feature-title">
                        {feature.title}
                    </Heading>
                    <Paragraph className="key-feature-description">{feature.description}</Paragraph>
                </div>
            ))}
        </div>
    </section>
);
