import Image from "next/image";
import { Heading } from "robindoc/lib/components/ui/heading";
import { Paragraph } from "robindoc/lib/components/ui/paragraph";
import { ContentLink } from "robindoc/lib/components/ui/content-link";

import { VisibleWrapper } from "../../ui/visible-wrapper";
import { SourcesImg } from "./images/sources";
import { ToolsImg } from "./images/tools";
import views from "./images/views.png";

import "./features.scss";

export const Features: React.FC = () => {
    return (
        <div className="features">
            <div className="features-card features-card-1">
                <div>
                    <Heading component="h2" className="features-heading">
                        Unified documentation format
                    </Heading>
                    <Paragraph>
                        Any of your documentation files will work great in Robindoc. Any of Robindoc documentation files
                        will work great in any service
                    </Paragraph>
                </div>
                <Image src={views} alt="" className="features-img" loading="lazy" />
            </div>
            <div className="features-card features-card-2">
                <div>
                    <Heading component="h2" className="features-heading">
                        Built on Server Components
                    </Heading>
                    <Paragraph>
                        This gives flexibility and dynamics. But the most important thing is freedom of choice! Use any
                        bundler, any configuration, any tools in any next.js project!
                    </Paragraph>
                </div>
                <ToolsImg className="features-img" />
            </div>
            <div className="features-card features-card-3">
                <Heading component="h2" className="features-heading">
                    Fast and friendly
                </Heading>
                <Paragraph>
                    Optimized for metrics and accessibility. Minimum logic for the client, maximum speed on the server
                </Paragraph>
            </div>
            <VisibleWrapper className="features-card features-card-5 features-sources">
                <Heading component="h2" className="features-heading">
                    Load content from any sources
                </Heading>
                <SourcesImg className="features-img" />
            </VisibleWrapper>
            <div className="features-card features-card-4">
                <Heading component="h2" className="features-heading">
                    Easy to use
                </Heading>
                <Paragraph>
                    <ContentLink href="/docs/getting-started">Install</ContentLink>
                    {", "}
                    <ContentLink href="/docs/structure">Configure</ContentLink>
                    {", "}
                    Deploy!
                </Paragraph>
            </div>
        </div>
    );
};
