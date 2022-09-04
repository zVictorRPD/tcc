import React from "react";
import {
    Box,
    Button,
    Grid,
    GridItem,
    Heading,
    Hide,
    HStack,
    Input,
    Stack,
    Text,
} from "@chakra-ui/react";

import { AiOutlineLogin } from "react-icons/ai";
export default function SignupShortcut() {
    const bgImage = {
        backgroundImage: "url(/assets/images/homepage/svgs/bg-yellow.svg)",
        backgroundRepeat: "no-repeat",
    };
    return (
        <Box borderTop={"2px"} borderColor={"gray.200"}>
            <Grid
                py={["2.25rem", "2.5rem", "3.75rem"]}
                templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                ]}
                gap={["1rem", "2rem"]}
                style={bgImage}
                bgSize={["contain", "contain", "auto"]}
                bgPosition={["center left", "center left", "center right"]}
            >
                <Hide below="md">
                    <GridItem>
                        <img src="/assets/images/homepage/svgs/mail.svg" />
                    </GridItem>
                </Hide>
                <GridItem>
                    <Stack h={"100%"} justifyContent={"center"}>
                        <Box>
                            <Heading
                                color={"gray.800"}
                                as="h2"
                                size={["lg", "lg", "xl"]}
                                mb={".5rem"}
                            >
                                Achou a ideia interessante?
                            </Heading>
                            <Text fontSize={"lg"} mb={"2rem"}>
                                O cadastro é simples e curto, insira seu email e
                                comece já
                            </Text>
                            <HStack
                                flexWrap={["wrap", "wrap", "nowrap"]}
                                justifyContent={["center", "center", "flex-start"]}
                            >
                                <Input
                                    w={["100%", "100%", "60%"]}
                                    bg={"white"}
                                    placeholder="examplemail@example.com"
                                    size="md"
                                    mr={["0", "0", ".5em"]}
                                    mb={["1rem", "1rem", "0"]}
                                />
                                <Button
                                    size={"md"}
                                    rightIcon={<AiOutlineLogin />}
                                    variant={"yellow-400"}
                                >
                                    Criar conta
                                </Button>
                            </HStack>
                        </Box>
                    </Stack>
                </GridItem>
            </Grid>
        </Box>
    );
}
