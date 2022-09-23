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
import { getUserImage } from "../../functions/userImage";

// const { status, data } = useSession();

export default function LoggedContainer({
    children
}: {
    children: ReactNode;
}) {
    const { status, data } = useSession();
    const [userAvatar, setUserAvatar] = useState("");
    const [userName, setUserName] = useState("");

    const getAvatar = async (id:string) => {
        setUserAvatar(await getUserImage(id));
    }
    
    useEffect(() => {
        if (
            data?.id !== undefined &&
            data?.id &&
            data?.user?.name &&
            data?.user?.name !== undefined
        ) {
            setUserName(data?.user?.name);
            getAvatar(data?.id.toString());
        }
    }, [data]);

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
            <Box ml={{ base: 0, md: 60 }} p="4" h={'calc(100vh - 80px)'}>
                {children}
            </Box>
        </Box>
    );
}
