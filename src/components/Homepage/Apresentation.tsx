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
export default function Apresentation() {
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
                                color={"gray.800"}
                                as="h2"
                                size={["xl", "xl", "3xl"]}
                                mb={".5rem"}
                            >
                                <Text color={"green.400"}>Apresentação legal,</Text>
                                Muito legal mesmo
                            </Heading>
                            <Text fontSize={"lg"} mb={"2rem"}>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Voluptas soluta mollitia culpa
                                itaque? Aut suscipit consequatur odit placeat
                                corporis doloremque!
                            </Text>
                            <Box>
                                <Button
                                    size={"lg"}
                                    w={["100%", "100%", "auto"]}
                                    variant={"green-400"}
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
                        <img src="/assets/images/homepage/svgs/studying.svg" />
                    </GridItem>
                </Hide>
            </Grid>
        </Box>
    );
}
