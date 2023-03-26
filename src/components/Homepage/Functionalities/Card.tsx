import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { IFunctionalities } from "../../../interfaces/homepage/funcitonalites.interface";

export default function Card(props: { functionality: IFunctionalities }) {
    return (
        <Box
            h={"100%"}
            boxShadow="base"
            p="1rem"
            rounded="2xl"
            bg={useColorModeValue("white", "gray.900")}
        >
            <Box
                mb={"1rem"}
                h={"4rem"}
                w={"4rem"}
                bg={useColorModeValue("gray.100", "gray.700")}
                rounded={"50%"}
            >
                <Stack
                    h={"100%"}
                    w={"100%"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    {useColorModeValue(props.functionality.icon, props.functionality.dark_icon)}
                </Stack>
            </Box>

            <Text
                mb={".5rem"}
                fontSize={"md"}
                fontWeight={"semibold"}
            >
                {props.functionality.title}
            </Text>
            <Text fontSize={"md"}>
                {props.functionality.description}
            </Text>
        </Box>
    );
}
