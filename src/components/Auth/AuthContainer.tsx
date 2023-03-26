import {
    Box,
    Container,
    Hide,
    HStack,
    IconButton,
    Image,
    Stack,
    useColorMode,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import React, { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoadingPage from "../LoadingPage";
import { FiMoon, FiSun } from "react-icons/fi";

export default function AuthContainer({ children }: { children: ReactNode }) {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const { status, data } = useSession();
    const bg = useColorModeValue("white", "gray.900");
    const bgLight = useColorModeValue("white", "gray.800");
    const logoSrc = useColorModeValue("/assets/images/homepage/logo.png","/assets/images/homepage/white_logo.png")
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
                <VStack 
                    h={"100%"} 
                    w={"100%"}
                    bg={bg}
                >
                    <Box
                        px={["1rem", "1rem", "1.625rem"]}
                        py={[".75rem", "1rem", "1.5rem", "1.938rem"]}
                        w={"100%"}
                        display={"flex"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <a
                            onClick={() => router.push("/#")}
                            style={{ cursor: "pointer" }}
                        >
                            <Image
                                src={logoSrc}
                                height={"34px"}
                                alt="Logo"
                            />
                        </a>
                        <Hide above="lg">
                            <IconButton
                                size="lg"
                                variant="ghost"
                                aria-label="open menu"
                                icon={colorMode == "light" ? <FiSun /> : <FiMoon />}
                                onClick={toggleColorMode}
                            /> 
                        </Hide>
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
                    <VStack
                        ms={'0px !important'}
                        h={"100%"}
                        w={"100%"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        bg={bgLight}
                        px={["1rem", "1rem", "1.625rem"]}
                        py={["1.188rem", "1.688rem", "1.938rem"]}
                    >
                        <Stack
                            height={'200px'}
                            w={"100%"}
                            alignItems={"end"}
                            justifyContent={"start"}
                        >
                            <IconButton
                                size="lg"
                                variant="ghost"
                                aria-label="open menu"
                                icon={colorMode == "light" ? <FiSun /> : <FiMoon />}
                                onClick={toggleColorMode}
                            />
                        </Stack>
                        <Stack
                            maxW={"600px"}
                            maxH={"600px"}
                            w={"100%"}
                            h={"100%"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Image
                                style={imgStyle}
                                src="/assets/images/auth/login.svg"
                                alt="Login image"
                            />
                        </Stack>
                    </VStack>
                </Hide>
            </HStack>
        );
    }

    return <LoadingPage />;
}
