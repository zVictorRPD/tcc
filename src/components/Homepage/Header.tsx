import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { AiOutlineLogin } from "react-icons/ai";
import { Image } from "@chakra-ui/react";
import Link from "next/link";

export default function Header() {
    const router = useRouter();
    const styckTopStyle = {
        top: "0",
        zIndex: 999,
    };

    return (
        <Box
            px={["1rem", "1rem", "1.625rem"]}
            py={["1rem", "1.5rem", "2rem"]}
            position={"sticky"}
            style={styckTopStyle}
            bg={"white"}
            borderBottom={"2px"}
            borderColor={"gray.200"}
        >
            <HStack justifyContent={"space-between"} alignItems={"center"}>
                <Link
                    href={"/#"}
                    style={{ cursor: "pointer" }}
                >
                    <Image
                        src="/assets/images/homepage/logo.png"
                        height={"34px"}
                        alt="Logo"
                    />
                </Link>

                <Button
                    size={"md"}
                    variant="blue-800-outline"
                    rightIcon={<AiOutlineLogin />}
                    onClick={() => router.push("/auth/login")}
                >
                    Login
                </Button>
            </HStack>
        </Box>
    );
}
