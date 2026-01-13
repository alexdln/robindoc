import Link from "next/link";
import { Heading } from "robindoc/lib/components/ui/heading";
import { Paragraph } from "robindoc/lib/components/ui/paragraph";
import { Strong } from "robindoc/lib/components/ui/strong";
import { Em } from "robindoc/lib/components/ui/em";

import "./intro.scss";

export const Intro: React.FC = () => {
    return (
        <div className="intro">
            <div className="intro-content">
                <Heading component="h1" className="intro-title">
                    Interface for your documentation on the fly
                </Heading>
                <Paragraph>
                    Write the documentation however you want, <Strong className="intro-bold">Robindoc</Strong> will
                    build it on top
                    <br />
                    <Em className="intro-italic">Fast, simple, easy</Em>
                </Paragraph>
                <div className="intro-actions">
                    <span className="intro-get-started">
                        <Link href="/docs" className="intro-get-started-link">
                            Get Started
                        </Link>
                    </span>
                    <span className="intro-cmd">
                        <span className="intro-cmd-tool">npm</span>
                        {" install robindoc"}
                    </span>
                </div>
            </div>
            <pre className="intro-code">
                <code>
                    <span className="row">#Interface for your documentation on the fly</span>
                    <span className="row">&nbsp;</span>
                    <span className="row">
                        Write the documentation however you want, **Robindoc** will build it on top
                    </span>
                    <span className="row">&nbsp;</span>
                    <span className="row">_Fast, simple, easy_</span>
                    <span className="row">&nbsp;</span>
                    <span className="row">{"<Row>"}</span>
                    <span className="row">{"    <GetStarted />"}</span>
                    <span className="row">{"    ```bash"}</span>
                    <span className="row">{"    npm install robindoc"}</span>
                    <span className="row">{"    ```"}</span>
                    <span className="row">{"</Row>"}</span>
                </code>
            </pre>
        </div>
    );
};
