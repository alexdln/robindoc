import { PageContainer } from "robindoc";

import { Features } from "../components/sections/features";
import { Intro } from "../components/sections/intro";

import "./home.scss";

const Home = () => {
    return (
        <PageContainer>
            <Intro />
            <Features />
        </PageContainer>
    );
};

export default Home;
