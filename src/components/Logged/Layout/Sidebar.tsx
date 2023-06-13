import React, { ReactNode, useState, useEffect } from "react";
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

import { IconType } from "react-icons";
import {
    FaGraduationCap,
    FaClock,
    FaChalkboardTeacher,
    FaBook,
    FaCalendarAlt,
    FaCalendarDay,
    FaMapMarkedAlt,
    FaDownload,
    FaEnvelope,
} from "react-icons/fa";
import { GiPodium } from "react-icons/gi";

import { MdSpaceDashboard } from "react-icons/md";

import { useRouter } from "next/router";

interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}
const LinkItems: Array<LinkItemProps> = [
    {
        name: "Dashboard",
        icon: MdSpaceDashboard,
        href: "/ambiente-logado/dashboard",
    },
    {
        name: "Grade curricular",
        icon: FaGraduationCap,
        href: "/ambiente-logado/grade-curricular",
    },
    {
        name: "Grade horária",
        icon: FaClock,
        href: "/ambiente-logado/grade-horaria",
    },
    {
        name: "Ranking",
        icon: GiPodium,
        href: "/ambiente-logado/ranking",
    },
    {
        name: "Professores",
        icon: FaChalkboardTeacher,
        href: "/ambiente-logado/professores",
    },
    {
        name: "Calendário",
        icon: FaCalendarDay,
        href: "/ambiente-logado/calendario",
    },
    {
        name: "Calendário Acadêmico",
        icon: FaCalendarAlt,
        href: "/ambiente-logado/calendario-academico",
    },
    { name: "Mapa", icon: FaMapMarkedAlt, href: "/ambiente-logado/mapa" },
    { name: "Matérias", icon: FaBook, href: "/ambiente-logado/materias" },
];

interface SidebarProps extends BoxProps {
    onClose: () => void;
    modalOnOpen: () => void;
}

export const SidebarContent = ({
    onClose,
    modalOnOpen,
    ...rest
}: SidebarProps) => {
    const router = useRouter();
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState(null);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClick = (evt: any) => {
        evt.preventDefault();
        if (!promptInstall) {
            return;
        }
        (promptInstall as any).prompt();
    };

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
                        src={useColorModeValue(
                            "/assets/images/homepage/logo.png",
                            "/assets/images/homepage/white_logo.png"
                        )}
                        height={"34px"}
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
                        router.push(link.href);
                        onClose();
                    }}
                    icon={link.icon}
                >
                    {link.name}
                </NavItem>
            ))}
            <NavItem key={"contact"} onClick={modalOnOpen} icon={FaEnvelope}>
                Contato
            </NavItem>
            {supportsPWA && (
                <NavItem key={"Download"} icon={FaDownload} onClick={onClick}>
                    Download
                </NavItem>
            )}
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
