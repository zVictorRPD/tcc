import React from "react";
import {
    Box,
    Button,
    Grid,
    GridItem,
    Heading,
    Hide,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";

import { AiOutlineLogin } from "react-icons/ai";
import { useRouter } from "next/router";
export default function Apresentation() {
    const router = useRouter();
    const bgImage = {
        backgroundImage: "url(/assets/images/homepage/svgs/bg-purple.svg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center left",
    };
    return (
        <Box
            py={["2.25rem", "2.5rem", "3.75rem"]}
        >
            <Grid
                templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                ]}
                gap={["1rem", "2rem"]}
                style={bgImage}
                bgSize={["contain", "contain", "auto"]}
            >
                <GridItem>
                    <Stack h={"100%"} justifyContent={"center"}>
                        <Box>
                            <Heading
                                // color={"gray.800"}
                                as="h2"
                                size={["xl", "xl", "3xl"]}
                                mb={".5rem"}
                            >
                                <Text color={"green.400"}>Facilita Rural,</Text>
                                Feito para você
                            </Heading>
                            <Text fontSize={"lg"} mb={"2rem"}>
                                O objetivo do sistema é, de forma ágil, fácil e objetiva, facilitar a vida acadêmica do estudante,
                                trazendo para o mesmo informações de relevância e
                                ferramentas para projetar a sua trajetória na universidade da forma que o
                                convém.
                            </Text>
                            <Box>
                                <Button
                                    size={"lg"}
                                    w={["100%", "100%", "auto"]}
                                    variant={"green-400"}
                                    onClick={() => router.push("/auth/signup")}
                                    rightIcon={<AiOutlineLogin />}
                                >
                                    Comece já
                                </Button>
                            </Box>
                        </Box>
                    </Stack>
                </GridItem>
                <Hide below="md">
                    <GridItem>
                        <Image src="/assets/images/homepage/svgs/studying.svg" alt="Aluno estudando" />
                    </GridItem>
                </Hide>
            </Grid>
        </Box>
    );
}
