import { Box, Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";
import { AiOutlineLogin } from "react-icons/ai";
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
                <a onClick={() => router.push("/#")} style={{cursor:"pointer"}}>
                    <img src="/assets/images/homepage/logo.png" alt="Logo" />
                </a>

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
