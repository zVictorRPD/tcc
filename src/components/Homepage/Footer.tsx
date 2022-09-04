import { Box, Hide, HStack, Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
    return (
        <Box py={"0.875rem"} borderTop={"2px"} borderColor={"gray.200"}>
            <HStack
                justifyContent={"center"}
                flexDirection={["column", "column", "row"]}
            >
                <Text fontSize={"md"} textAlign={"center"} color={"gray.800"}>
                    {new Date().getFullYear()} © Victor de Oliveira Martins Azevedo
                    <Hide below="md"> - </Hide>
                </Text>
                <Text fontSize={"md"} textAlign={"center"} color={"gray.800"}>
                    Todos os direitos reservados.
                </Text>
            </HStack>
        </Box>
    );
}
