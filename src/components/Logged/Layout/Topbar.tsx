import React, { useEffect, useState } from "react";
import {
    IconButton,
    Avatar,
    Box,
    Flex,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    FlexProps,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton,
    PopoverArrow,
    PopoverBody,
    Stack,
    useColorMode,
    Divider,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown, FiSun, FiMoon } from "react-icons/fi";
import Head from "next/head";
import { FaInbox } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { getUserData } from "../../../functions/userData";
import { pageNameObject } from "../../../functions/pageName";
import {
    getNotifications,
    sawNotifications,
} from "../../../functions/notifications";
import styles from "./style.module.scss";

interface TopBarProps extends FlexProps {
    topBarProps: {
        onOpen: () => void;
        pageName: string;
    };
}

export const TopBar = ({ topBarProps, ...rest }: TopBarProps) => {
    const { onOpen, pageName } = topBarProps;
    const { colorMode, toggleColorMode } = useColorMode();
    const [notifications, setNotifications] = useState<INotifications[]>([]);
    const [newNotifications, setNewNotifications] = useState(0);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const router = useRouter();
    const getData = async () => {
        const { name, avatar } = await getUserData();
        setName(name);
        setAvatar(avatar);
    };

    useEffect(() => {
        getData();
        const notificationsObject = getNotifications();
        setNotifications(notificationsObject.notifications);
        setNewNotifications(notificationsObject.newNotifications);
    }, []);

    return (
        <>
            <Head>
                <title>{pageNameObject[pageName]}</title>
            </Head>
            <Flex
                position="fixed"
                width={{
                    base: "calc(100vw)",
                    md: "calc(100vw - 240px)",
                }}
                zIndex={2}
                ml={{ base: 0, md: 60 }}
                px={{ base: 2, md: 4 }}
                height="20"
                alignItems="center"
                bg={useColorModeValue("white", "gray.900")}
                borderBottomWidth="1px"
                borderBottomColor={useColorModeValue("gray.200", "gray.700")}
                justifyContent={"space-between"}
                {...rest}
            >
                {/* Mobile */}
                <Box w={"auto"} display={{ base: "flex", md: "none" }}>
                    <IconButton
                        onClick={onOpen}
                        variant="outline"
                        aria-label="open menu"
                        icon={<FiMenu />}
                    />
                </Box>

                <Box display={{ base: "flex", md: "none" }}>
                    <Text
                        fontSize={{
                            base: "lg",
                            sm: "xl",
                        }}
                    >
                        {pageNameObject[pageName]}
                    </Text>
                </Box>

                {/* Desktop */}
                <Box ml={"1rem"} display={{ base: "none", md: "block" }}>
                    <Text fontSize={"3xl"}>{pageNameObject[pageName]}</Text>
                </Box>
                <HStack spacing={{ base: "0", md: "4" }}>
                    <IconButton
                        size={{
                            base: "sm",
                            md: "lg",
                        }}
                        px={"0px !important"}
                        variant="ghost"
                        aria-label="open menu"
                        icon={colorMode == "light" ? <FiSun /> : <FiMoon />}
                        onClick={toggleColorMode}
                    />
                    <Popover
                        placement="bottom-start"
                        onClose={() => {
                            notifications.length > 0 &&
                                sawNotifications(
                                    notifications[notifications.length - 1].id
                                );
                            setNewNotifications(0);
                        }}
                    >
                        <PopoverTrigger>
                            <IconButton
                                position={"relative"}
                                ms="0 !important"
                                size={{
                                    base: "md",
                                    md: "lg",
                                }}
                                px={"0px !important"}
                                variant="ghost"
                                aria-label={"Notifications"}
                                //se tiver notificações, ao clicar, chama a função que envia o id da última notificação para o localhost
                                icon={
                                    <>
                                        <FiBell />
                                        {newNotifications > 0 && (
                                            <Box
                                                as={"span"}
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                color={"white"}
                                                position={"absolute"}
                                                top={"6px"}
                                                right={"4px"}
                                                fontSize={{
                                                    base: "8px",
                                                    md: "10px",
                                                }}
                                                bgColor={"#ff4d4f"}
                                                borderRadius={"full"}
                                                zIndex={9999}
                                                h={{
                                                    base: "12px",
                                                    md: "16px",
                                                }}
                                                w={{
                                                    base: "12px",
                                                    md: "16px",
                                                }}
                                            >
                                                {newNotifications}
                                            </Box>
                                        )}
                                    </>
                                }
                            />
                        </PopoverTrigger>
                        <PopoverContent
                            bg={useColorModeValue("white", "gray.800")}
                        >
                            <PopoverHeader fontWeight="semibold">
                                Notificações
                            </PopoverHeader>
                            <PopoverArrow
                                bg={useColorModeValue("white", "gray.800")}
                            />
                            <PopoverCloseButton />
                            <PopoverBody
                                maxH={"280px"}
                                overflowY={"auto"}
                                className={styles.scrollbar}
                            >
                                {notifications.length > 0 ? (
                                    notifications
                                        .reverse()
                                        .map((notification, index) => (
                                            <Box
                                                key={index}
                                                borderTopWidth={
                                                    index == 0 ? "0" : "1px"
                                                }
                                                py={".5rem"}
                                            >
                                                <Text
                                                    fontSize={"md"}
                                                    fontWeight={"semibold"}
                                                >
                                                    {notification.title}
                                                </Text>
                                                <Text fontSize={"sm"}>
                                                    {notification.description}
                                                </Text>
                                            </Box>
                                        ))
                                ) : (
                                    <Stack
                                        p={4}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                    >
                                        <FaInbox size={48} opacity={".5"} />
                                        <Text>
                                            Nenhuma notificação encontrada
                                        </Text>
                                    </Stack>
                                )}
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>

                    <Flex
                        alignItems={"center"}
                        justifyContent="center"
                        minW="48px"
                    >
                        <Menu>
                            <MenuButton
                                py={2}
                                transition="all 0.3s"
                                _focus={{ boxShadow: "none" }}
                            >
                                <HStack gap={"8px"}>
                                    <Avatar size={"sm"} src={avatar} />
                                    <VStack
                                        display={{ base: "none", md: "flex" }}
                                        alignItems="flex-start"
                                        spacing="1px"
                                        ml="2"
                                    >
                                        <Text fontSize="md" fontWeight={600}>
                                            {name.split(" ")[0]}
                                        </Text>
                                    </VStack>
                                    <Box display={{ base: "none", md: "flex" }}>
                                        <FiChevronDown />
                                    </Box>
                                </HStack>
                            </MenuButton>
                            <MenuList
                                bg={useColorModeValue("white", "gray.900")}
                                borderColor={useColorModeValue(
                                    "gray.200",
                                    "gray.700"
                                )}
                            >
                                <MenuItem
                                    onClick={() =>
                                        router.push(
                                            "/ambiente-logado/editar-perfil"
                                        )
                                    }
                                >
                                    Editar perfil
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={() => signOut()}>
                                    <Text color="red.500">Sair</Text>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                </HStack>
            </Flex>
        </>
    );
};
