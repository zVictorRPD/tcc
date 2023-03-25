import {
    Box,
    Button,
    HStack,
    IconButton,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { AiOutlineLogin } from "react-icons/ai";
import { Image } from "@chakra-ui/react";
import Link from "next/link";
import { FiMoon, FiSun } from "react-icons/fi";

export default function Header() {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const styckTopStyle = {
        top: "0",
        zIndex: 999,
    };

    return (
        <Box
            px={["1rem", "1rem", "1.625rem"]}
            py={[".75rem", "1.25rem", "1.5rem"]}
            position={"sticky"}
            style={styckTopStyle}
            bg={useColorModeValue("white", "gray.900")}
            borderBottom={"2px"}
            borderColor={"gray.200"}
        >
            <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Link href={"/#"} style={{ cursor: "pointer" }}>
                    <Image
                        src={useColorModeValue(
                            "/assets/images/homepage/logo.png",
                            "/assets/images/homepage/white_logo.png"
                        )}
                        height={"34px"}
                        alt="Logo"
                    />
                </Link>

                <HStack>
                    <IconButton
                        size="lg"
                        variant="ghost"
                        aria-label="open menu"
                        icon={colorMode == "light" ? <FiSun /> : <FiMoon />}
                        onClick={toggleColorMode}
                    />
                    <Button
                        size={"md"}
                        variant="blue-800-outline"
                        rightIcon={<AiOutlineLogin />}
                        onClick={() => router.push("/auth/login")}
                    >
                        Login
                    </Button>
                </HStack>
            </HStack>
        </Box>
    );
}
