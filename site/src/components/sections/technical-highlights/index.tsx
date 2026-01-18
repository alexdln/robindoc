import { Heading } from "robindoc/lib/components/ui/heading";
import { Paragraph } from "robindoc/lib/components/ui/paragraph";

import "./technical-highlights.scss";

const highlights = [
    {
        category: "Architecture",
        features: [
            "React Server Components (RSC)",
            "No-js mode compatible",
            "Server-side rendering by default",
            "Minimal client-side JavaScript",
            "No hydration overhead",
        ],
    },
    {
        category: "Content",
        features: [
            "JSX/HTML in markdown files",
            "Robin components for conditional rendering",
            "Shiki syntax highlighting",
            "Tabbed code examples",
            "Automatic structure generation",
        ],
    },
    {
        category: "Performance",
        features: [
            "Optimized for Core Web Vitals",
            "Static site generation support",
            "Dynamic page generation",
            "Efficient markdown parsing",
            "Client-side search",
        ],
    },
    {
        category: "Developer Experience",
        features: [
            "TypeScript support",
            "Easy to integrate",
            "CSS variables theming",
            "Complete style isolation",
            "Zero configuration",
        ],
    },
];

export const TechnicalHighlights: React.FC = () => (
    <section className="technical-highlights">
        <div className="technical-highlights-header">
            <Heading component="h2" className="technical-highlights-title">
                Technical excellence
            </Heading>
            <Paragraph className="technical-highlights-subtitle">
                Built with modern web standards and best practices
            </Paragraph>
        </div>
        <div className="technical-highlights-grid">
            {highlights.map((highlight) => (
                <div key={highlight.category} className="technical-highlight-card">
                    <Heading component="h3" className="technical-highlight-category">
                        {highlight.category}
                    </Heading>
                    <ul className="technical-highlight-list">
                        {highlight.features.map((feature) => (
                            <li key={feature} className="technical-highlight-item">
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </section>
);
