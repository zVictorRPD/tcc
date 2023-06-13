import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Heading,
    Flex,
    Button,
    ModalFooter,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { FaEnvelope, FaInstagram } from "react-icons/fa";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function ContactModal(props: ContactModalProps) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size={"xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Entre em contato</ModalHeader>
                <ModalCloseButton />
                <ModalBody px={6}>
                    <Heading size={"md"} mb={".5rem"}>
                        Olá,
                    </Heading>
                    <Text textAlign={"justify"}>
                        Obrigado por visitar meu projeto. Eu adoraria ouvir de
                        você! Se você tiver alguma dúvida, sugestão ou
                        comentário, por favor, entre em contato comigo através
                        do meu e-mail ou Instagram.
                    </Text>
                    <Flex
                        justifyContent={"center"}
                        alignItems={"center"}
                        gap={"1rem"}
                        my={"1rem"}
                    >
                        <a
                            href="mailto:victor2007azevedo@hotmail.com"
                            rel="noreferrer"
                        >
                            <Button
                                leftIcon={<FaEnvelope />}
                                variant="blue-800"
                            >
                                E-mail
                            </Button>
                        </a>
                        <a
                            href="https://www.instagram.com/zvictor_rpd/"
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            <Button
                                leftIcon={<FaInstagram />}
                                variant="blue-800"
                            >
                                Instagram
                            </Button>
                        </a>
                    </Flex>
                    <Text mb=".5rem" textAlign={"justify"}>
                        Além disso, gostaria de agradecer a vocês, pelo incrível
                        marco de 1000 usuários! Este projeto não seria possível
                        sem o seu apoio e feedback. Obrigado por fazer parte
                        disso. Se você gostou do que viu, por favor, compartilhe
                        com seus amigos e colegas para que possamos alcançar
                        ainda mais pessoas.
                    </Text>
                    <Text mb=".5rem" textAlign={"justify"}>
                        Estou ansioso para ouvir de você e continuar a melhorar
                        este projeto.
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" mr={3} onClick={props.onClose}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ContactModal;
