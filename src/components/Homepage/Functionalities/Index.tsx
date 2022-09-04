import React from "react";
import { funcitonalites } from "./info";
import Card from "./Card";
import { Box, Grid, GridItem, Heading, Hide } from "@chakra-ui/react";

export default function Functionalities() {
    return (
        <Box py={["2.25rem","2.5rem","3.75rem"]} borderTop={"2px"} borderColor={"gray.200"}>
            <Box pb={"2.5rem"}>
                <Heading
                    textAlign={"center"}
                    color={"gray.800"}
                    as="h2"
                    size={["lg", "lg", "xl"]}
                >
                    Principais funcionalidades
                </Heading>
            </Box>
            <Grid
                templateColumns={[
                    "repeat(1, 1fr)",
                    "repeat(1, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                    "repeat(3, 1fr)",
                ]}
                gap={["1rem", "2rem"]}
            >
                {funcitonalites.map((functionality, index) => {
                    if (index > 2) {
                        return (
                            <Hide key={index} below="md">
                                <GridItem w={"100%"}>
                                    <Card functionality={functionality} />
                                </GridItem>
                            </Hide>
                        );
                    }
                    return (
                        <GridItem key={index} w={"100%"}>
                            <Card functionality={functionality} />
                        </GridItem>
                    );
                })}
            </Grid>
        </Box>
    );
}
