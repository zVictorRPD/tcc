import React, { ReactNode } from "react";
import {
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    BoxProps,
    FlexProps,
    Image,
} from "@chakra-ui/react";
import {
    FiHome,
} from "react-icons/fi";

import { IconType } from "react-icons";
import { FaGraduationCap, FaClock, FaChalkboardTeacher, FaBook, FaCalendarAlt, FaMapMarkedAlt } from "react-icons/fa";

import { useRouter } from "next/router";

interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Dashboard", icon: FiHome, href: "/ambiente-logado/dashboard" },
    { name: "Grade curricular", icon: FaGraduationCap, href: "/ambiente-logado/grade-curricular" },
    { name: "Grade horária", icon: FaClock, href: "/ambiente-logado/grade-horaria" },
    { name: "Matérias", icon: FaBook, href: "/ambiente-logado/materias" },
    { name: "Professores", icon: FaChalkboardTeacher, href: "/ambiente-logado/professores" },
    { name: "Calendário", icon: FaCalendarAlt, href: "/ambiente-logado/calendario" },
    { name: "Mapa", icon: FaMapMarkedAlt, href: "/ambiente-logado/mapa" },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const router = useRouter();
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="20"
                alignItems="center"
                mx="8"
                justifyContent={{ base: "space-between", md: "center" }}
            >
                <a
                    onClick={() => router.push("/ambiente-logado/dashboard")}
                    style={{ cursor: "pointer" }}
                >
                    <Image
                        src="/assets/images/homepage/logo.png"
                        height={"44px"}
                        alt="Logo"
                    />
                </a>
                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem
                    key={link.name}
                    onClick={() => {
                        router.push(link.href)
                        onClose();
                    }}
                    icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactNode;
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Link
            href="#"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p="4"
                mx="2"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "blue.800",
                    color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white",
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};
