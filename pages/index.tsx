import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Apresentation from "../src/components/Homepage/Apresentation";
import Footer from "../src/components/Homepage/Footer";
import Functionalities from "../src/components/Homepage/Functionalities/Index";
import Header from "../src/components/Homepage/Header";
import SignupShortcut from "../src/components/Homepage/SignupShortcut";
const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Página inicial</title>
            </Head>
            <Header />
            <Container maxW={"container.xl"}>
                <Apresentation />
                <Functionalities />
                <SignupShortcut />
                <Footer />
            </Container>
            {/* <VLibras forceOnload={true} /> */}
        </>
    );
};

export default Home;
