import { Box, Image, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export default function LoadingPage() {
    const imgSrc = useColorModeValue(
        "/assets/images/loading-spinner.svg",
        "/assets/images/white-loading-spinner.svg"
    );
    return (
        <Stack
            h={"100vh"}
            w={"100vw"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Box>
                <Image
                    src={imgSrc}
                    w={"200px"}
                    h={"200px"}
                    alt="Carregando..."
                    margin={"0 auto"}
                />
            </Box>
        </Stack>
    );
}
