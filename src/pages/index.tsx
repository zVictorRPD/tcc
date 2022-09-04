import { Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Apresentation from "../components/Homepage/Apresentation";
import Footer from "../components/Homepage/Footer";
import Functionalities from "../components/Homepage/Functionalities/Index";
import Header from "../components/Homepage/Header";
import SignupShortcut from "../components/Homepage/SignupShortcut";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Página inicial</title>
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Header />
            <Container maxW={"container.xl"}>
                <Apresentation />
                <Functionalities />
                <SignupShortcut />
                <Footer />
            </Container>
        </>
    );
};

export default Home;
