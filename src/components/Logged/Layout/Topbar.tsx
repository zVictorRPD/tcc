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
    Image,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverCloseButton,
    PopoverArrow,
    PopoverBody,
    Stack,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";
import { FaInbox } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { getUserData } from "../../../functions/userData";
import { pageNameObject } from "../../../functions/pageName";

interface TopBarProps extends FlexProps {
    topBarProps: {
        onOpen: () => void;
        pageName: string;
    };
}

export const TopBar = ({ topBarProps, ...rest }: TopBarProps) => {
    const { onOpen, pageName } = topBarProps;
    const [notifications, setNotifications] = useState([]);
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState("");
    const router = useRouter();
    const { status, data } = useSession();

    const getData = async (id: string) => {
        const { name, avatar } = await getUserData(id);
        setName(name);
        setAvatar(avatar);
    }

    useEffect(() => {
        if (data?.id !== undefined && data?.id) {
            getData(data?.id.toString());
        }
    }, [data]);


    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent={"space-between"}
            {...rest}
        >
            {/* Mobile */}
            <Box w={'80px'} display={{ base: "flex", md: "none" }}>
                <IconButton
                    onClick={onOpen}
                    variant="outline"
                    aria-label="open menu"
                    icon={<FiMenu />}
                />
            </Box>

            <Box display={{ base: "flex", md: "none" }}>
                <Text
                    fontSize={'xl'}
                >
                    {pageNameObject[pageName]}
                </Text>
            </Box>

            {/* Desktop */}
            <Box ml={'1rem'} display={{ base: "none", md: "block" }}>
                <Text
                    fontSize={'3xl'}
                >
                    {pageNameObject[pageName]}
                </Text>
            </Box>
            <HStack spacing={{ base: "0", md: "6" }}>
                <Popover placement='bottom-start'>
                    <PopoverTrigger>
                        <IconButton
                            size="lg"
                            variant="ghost"
                            aria-label="open menu"
                            icon={<FiBell />}
                        />
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverHeader fontWeight='semibold'>Notificações</PopoverHeader>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            {
                                notifications.length > 0 ? notifications.map((notification, index) => (
                                    <Text key={index}>{notification}</Text>
                                )) :
                                    <Stack p={4} justifyContent={'center'} alignItems={'center'}>
                                        <FaInbox size={48} opacity={'.5'} />
                                        <Text color={'gray.800'}>Nenhuma notificação encontrada</Text>
                                    </Stack>
                            }
                        </PopoverBody>
                    </PopoverContent>
                </Popover>

                <Flex alignItems={"center"}>
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
                                    <Text
                                        fontSize="md"
                                        fontWeight={600}
                                        color="gray.800"
                                    >
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
                            <MenuItem onClick={() => router.push("/ambiente-logado/editar-perfil")}>Editar perfil</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={() => signOut()}>
                                <Text color="red.500">Sair</Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
