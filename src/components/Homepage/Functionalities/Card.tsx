import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { IFunctionalities } from "../../../interfaces/homepage/funcitonalites.interface";

export default function Card(props: { functionality: IFunctionalities }) {
    return (
        <Box h={'100%'} boxShadow="base" p="1rem" rounded="2xl" bg="white">
            <Box mb={'1rem'} h={'4rem'} w={'4rem'} bg={"gray.100"} rounded={'50%'}>
                <Stack h={"100%"} w={"100%"} justifyContent={"center"} alignItems={"center"}>
                    {props.functionality.icon}
                </Stack>
            </Box>

            <Text mb={'.5rem'} color={"gray.800"} fontSize={"md"} fontWeight={"semibold"}>
                {props.functionality.title}
            </Text>
            <Text color={"gray.800"} fontSize={"md"}>
                {props.functionality.description}
            </Text>
        </Box>
    );
}
