import React, { ReactNode } from "react";
import { SidebarContent } from "./Sidebar";
import { TopBar } from "./Topbar";
import {
    Box,
    useColorModeValue,
    Drawer,
    DrawerContent,
    useDisclosure,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Heading,
    Flex,
} from "@chakra-ui/react";

import {
    FaEnvelope,
    FaInstagram
} from "react-icons/fa";

export default function LoggedContainer({
    pageName,
    children,
}: {
    pageName: string;
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: modalIsOpen,
        onOpen: modalOnOpen,
        onClose: modalOnClose,
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
                bg={useColorModeValue("gray.100", "gray.900")}
            >
                <SidebarContent
                    onClose={() => onClose}
                    modalOnOpen={modalOnOpen}
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
                            modalOnOpen={modalOnOpen}
                        />
                    </DrawerContent>
                </Drawer>
                {/* mobilenav */}
                <TopBar topBarProps={{ onOpen, pageName }} />
                <Box
                    ml={{ base: 0, md: 60 }}
                    pt={"80px"}
                    minH={"calc(100vh - 80px)"}
                    bg={useColorModeValue("gray.100", "gray.900")}
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
            <Modal isOpen={modalIsOpen} onClose={modalOnClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Entre em contato</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        px={6}
                    >
                        <Heading size={'md'} mb={'.5rem'}>Olá,</Heading>
                        <Text textAlign={'justify'}>Obrigado por visitar meu projeto. Eu adoraria ouvir de você! Se você tiver alguma dúvida, sugestão ou comentário, por favor, entre em contato comigo através do meu e-mail ou Instagram.</Text>
                        <Flex 
                            justifyContent={'center'}
                            alignItems={'center'}
                            gap={'1rem'}
                            my={'1rem'}
                        >
                            <a href="mailto:victor2007azevedo@hotmail.com" rel="noreferrer">
                                <Button leftIcon={<FaEnvelope />} mr={3} variant="blue-800">
                                    E-mail
                                </Button>
                            </a>
                            <a href="https://www.instagram.com/zvictor_rpd/" target={'_blank'} rel="noreferrer">
                                <Button leftIcon={<FaInstagram />} mr={3} variant="blue-800">
                                    Instagram
                                </Button>
                            </a>
                        </Flex>
                        <Text mb=".5rem" textAlign={'justify'}>Além disso, gostaria de agradecer a vocês, pelo incrível marco de 500 usuários! Este projeto não seria possível sem o seu apoio e feedback. Obrigado por fazer parte disso. Se você gostou do que viu, por favor, compartilhe com seus amigos e colegas para que possamos alcançar ainda mais pessoas.</Text>
                        <Text mb=".5rem" textAlign={'justify'}>Estou ansioso para ouvir de você e continuar a melhorar este projeto.</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="outline" mr={3} onClick={modalOnClose}>
                            Fechar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
