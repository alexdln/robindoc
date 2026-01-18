import { Heading } from "robindoc/lib/components/ui/heading";
import { Paragraph } from "robindoc/lib/components/ui/paragraph";

import "./code-examples.scss";

export const CodeExamples: React.FC = () => (
    <section className="code-examples">
        <div className="code-examples-header">
            <Heading component="h2" className="code-examples-title">
                Get started in minutes
            </Heading>
            <Paragraph className="code-examples-subtitle">
                Initialize Robindoc, point it to your markdown files, and you're done
            </Paragraph>
        </div>
        <div className="code-examples-content">
            <div className="code-example">
                <p className="code-example-header">1. Initialize</p>
                <pre className="code-example-block">
                    <code>
                        <span className="code-line">
                            <span className="code-keyword">import</span>
                            {" { initializeRobindoc } "}
                            <span className="code-keyword">from</span> <span className="code-string">"robindoc"</span>;
                        </span>
                        <span className="code-line"></span>
                        <span className="code-line">
                            <span className="code-keyword">export const</span>
                            {"{ Page, Sidebar } = "}
                            <span className="code-function">initializeRobindoc</span>
                            {"({"}
                        </span>
                        <span className="code-line">
                            {"  "}
                            <span className="code-property">configuration</span>
                            {": {"}
                        </span>
                        <span className="code-line">
                            {"    "}
                            <span className="code-property">sourceRoot</span>
                            {": "}
                            <span className="code-string">"../docs"</span>,
                        </span>
                        <span className="code-line">
                            {"    "}
                            <span className="code-property">basePath</span>
                            {": "}
                            <span className="code-string">"/docs"</span>,
                        </span>
                        <span className="code-line">{"  }"},</span>
                        <span className="code-line">
                            {"  "}
                            <span className="code-property">items</span>
                            {": "}
                            <span className="code-string">"auto"</span>,
                        </span>
                        <span className="code-line">{"});"}</span>
                    </code>
                </pre>
            </div>
            <div className="code-example">
                <p className="code-example-header">2. Render</p>
                <pre className="code-example-block">
                    <code>
                        <span className="code-line">
                            <span className="code-keyword">import</span>
                            {" { RobinProvider, Header, DocsContainer } "}
                            <span className="code-keyword">from</span> <span className="code-string">"robindoc"</span>;
                        </span>
                        <span className="code-line">
                            <span className="code-keyword">import</span>
                            {" { Page, Sidebar } "}
                            <span className="code-keyword">from</span> <span className="code-string">"./robindoc"</span>
                            ;
                        </span>
                        <span className="code-line"></span>
                        <span className="code-line">
                            <span className="code-keyword">const</span> <span className="code-function">DocsPage</span>
                            {" = () => ("}
                        </span>
                        <span className="code-line">
                            {"  "}
                            <span className="code-tag">&lt;RobinProvider&gt;</span>
                        </span>
                        <span className="code-line">
                            {"    "}
                            <span className="code-tag">&lt;Header</span> <span className="code-attr">logo</span>=
                            <span className="code-string">{"{<Logo />}"}</span> <span className="code-tag">/&gt;</span>
                        </span>
                        <span className="code-line">
                            {"    "}
                            <span className="code-tag">&lt;DocsContainer&gt;</span>
                        </span>
                        <span className="code-line">
                            {"      "}
                            <span className="code-tag">&lt;Sidebar</span> <span className="code-attr">pathname</span>=
                            <span className="code-string">"/docs"</span> <span className="code-tag">/&gt;</span>
                        </span>
                        <span className="code-line">
                            {"      "}
                            <span className="code-tag">&lt;Page</span> <span className="code-attr">pathname</span>=
                            <span className="code-string">"/docs"</span> <span className="code-tag">/&gt;</span>
                        </span>
                        <span className="code-line">
                            {"    "}
                            <span className="code-tag">&lt;/DocsContainer&gt;</span>
                        </span>
                        <span className="code-line">
                            {"  "}
                            <span className="code-tag">&lt;/RobinProvider&gt;</span>
                        </span>
                        <span className="code-line">{");"}</span>
                    </code>
                </pre>
            </div>
        </div>
    </section>
);
