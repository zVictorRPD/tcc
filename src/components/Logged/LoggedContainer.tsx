import React, { ReactNode, useEffect, useState } from "react";
import { SidebarContent } from "./Sidebar";
import { TopBar } from "./Topbar";
import { useSession } from "next-auth/react";
import { api } from "../../services/api";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from "@chakra-ui/react";
import { Session } from "next-auth";

// const { status, data } = useSession();

export default function LoggedContainer({
    children,
    sessionData,
}: {
    children: ReactNode;
    sessionData: Session | null;
}) {
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");

    async function getUserImage() {
        const response = await api.post("/user/getUserAvatar", {
            id: sessionData?.id,
        });
        if (response.data.code === 200) {
            setUserAvatar(response.data.data.avatar);
        }
        return false;
    }
    useEffect(() => {
        console.log(sessionData);

        if (
            sessionData?.id !== undefined &&
            sessionData?.user?.name !== undefined &&
            sessionData?.user?.name
        ) {
            setUserName(sessionData?.user?.name);
            getUserImage();
        }
    }, [sessionData]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <TopBar
                topBarProps={{ onOpen, userAvatar }}
                name={userName}
            />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}
