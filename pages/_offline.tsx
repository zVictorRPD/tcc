import { Box, Container, Flex, Heading, Image } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../src/components/Homepage/Header";
const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Offline</title>
            </Head>
            <Container maxW={"container.xl"}>
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    h={'100vh'}
                >
                    <Box
                        w={'100%'}
                        maxW="500px"
                    >
                        <Image
                            src="/assets/images/homepage/svgs/offline.svg"
                            alt="offline"
                        />
                        <Heading
                            fontSize={{
                                base: "md",
                                md: "xl",
                            }}
                            textAlign={"center"}
                        >
                            Ops! <br /> Parece que você não está conectado à internet, tente novamente mais tarde
                        </Heading>
                    </Box>

                </Flex>

            </Container>
        </>
    );
};

export default Home;
