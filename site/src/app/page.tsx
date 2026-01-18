import { PageContainer } from "robindoc";

import { Hero } from "../components/sections/hero";
import { KeyFeatures } from "../components/sections/key-features";
import { CodeExamples } from "../components/sections/code-examples";
import { Benefits } from "../components/sections/benefits";
import { TechnicalHighlights } from "../components/sections/technical-highlights";
import Showcases from "../components/sections/showcases";

import "./home.scss";

const Home = () => {
    return (
        <PageContainer>
            <Hero />
            <KeyFeatures />
            <CodeExamples />
            <Benefits />
            <TechnicalHighlights />
            <Showcases />
        </PageContainer>
    );
};

export default Home;
