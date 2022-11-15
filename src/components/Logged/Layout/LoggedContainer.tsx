import React, { ReactNode } from "react";
import { SidebarContent } from "./Sidebar";
import { TopBar } from "./Topbar";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
} from "@chakra-ui/react";

export default function LoggedContainer({
    pageName,
    children
}: {
    pageName: string;
    children: ReactNode;
}) {
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
                topBarProps={{ onOpen, pageName }}
            />
            <Box ml={{ base: 0, md: 60 }} minH={'calc(100vh - 80px)'}>
                {children}
            </Box>
        </Box>
    );
}
