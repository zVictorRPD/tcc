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

import ContactModal from "./Modals/ContactModal";

export default function LoggedContainer({
    pageName,
    children,
}: {
    pageName: string;
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: contactModalIsOpen,
        onOpen: contactModalOnOpen,
        onClose: contactModalOnClose,
    } = useDisclosure();

    const getMinWidth = () => {
        if (pageName === "dashboard" || pageName === "grade-horaria") {
            return "calc(100vw - 257px)";
        } else {
            return "calc(100vw - 240px)";
        }
    };
    return (
        <>
            <Box
                minH="calc(100vh)"
                bg={useColorModeValue("gray.100", "gray.700")}
            >
                <SidebarContent
                    onClose={() => onClose}
                    modalOnOpen={contactModalOnOpen}
                    display={{ base: "none", md: "block" }}
                    zIndex={2}
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
                        <SidebarContent
                            onClose={onClose}
                            modalOnOpen={contactModalOnOpen}
                        />
                    </DrawerContent>
                </Drawer>
                {/* mobilenav */}
                <TopBar topBarProps={{ onOpen, pageName }} />
                <Box
                    ml={{ base: 0, md: 60 }}
                    pt={"80px"}
                    minH={"calc(100vh - 80px)"}
                    bg={useColorModeValue("gray.100", "gray.700")}
                    width={"min-content"}
                    minW={{
                        base: "calc(100vw)",
                        md: getMinWidth(),
                    }}
                >
                    <Box
                        p={{
                            base: ".5rem",
                            md: "1rem",
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
            <ContactModal isOpen={contactModalIsOpen} onClose={contactModalOnClose} />
        </>
    );
}
