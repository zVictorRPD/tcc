import { Box, Container, Hide, HStack, Stack, VStack } from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingPage from "../LoadingPage";

export default function AuthContainer({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { status, data } = useSession();
    useEffect(() => {
        if (status === "authenticated") {
            router.push("/ambiente-logado/dashboard");
        }
    }, [status]);

    if (status === "unauthenticated") {
        const imgStyle = {
            width: "100%",
            maxWidth: "600px",
        };

        return (
            <HStack height={"100vh"} align={"start"}>
                <VStack h={"100%"} w={"100%"}>
                    <Box
                        px={[".5rem", "1rem", "1.5rem"]}
                        py={[".5rem", "1rem", "1.5rem"]}
                        w={"100%"}
                    >
                        <a
                            onClick={() => router.push("/#")}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src="/assets/images/homepage/logo.png"
                                alt="Logo"
                            />
                        </a>
                    </Box>
                    <Stack
                        h={"100%"}
                        w={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Container maxW={"500px"} w={"100%"}>
                            {children}
                        </Container>
                    </Stack>
                </VStack>
                <Hide below="lg">
                    <Stack
                        h={"100%"}
                        w={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        bg={"gray.100"}
                        px={"2rem"}
                        pt={"100px"}
                    >
                        <Stack
                            maxW={"600px"}
                            maxH={"600px"}
                            w={"100%"}
                            h={"100%"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <img
                                style={imgStyle}
                                src="/assets/images/auth/login.svg"
                                alt="Login image"
                            />
                        </Stack>
                    </Stack>
                </Hide>
            </HStack>
        );
    }

    return <LoadingPage />;
}
