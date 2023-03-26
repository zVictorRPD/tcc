import {
    Box,
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
interface ConfirmationModalProps {
    modalProps: {
        isOpen: boolean;
        onClose: () => void;
        timeout: number;
        resendEmail: () => void;
    };
    email: string;
}

export default function ConfirmationModal(props: ConfirmationModalProps) {
    const { isOpen, onClose, timeout, resendEmail } =
        props.modalProps;
    const { email } = props;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    px={{
                        base: '0',
                        md: '4'
                    }}
                >
                    <Stack
                        alignItems={"center"}
                        justifyContent={"center"}
                        flexDirection={"column"}
                        gap={4}
                    >
                        <Image
                            width="60px"
                            height="60px"
                            src="/assets/images/auth/email-icon.svg"
                            alt="email"
                        />
                        <Heading fontSize={"2xl"}>
                            Confirmação de Email
                        </Heading>
                        <Box>
                            <Text
                                fontSize={"sm"}
                                textAlign={"center"}
                                
                            >
                                Email enviado para: <strong>{email}</strong>
                            </Text>
                            <Text
                                fontSize={"sm"}
                                textAlign={"center"}
                                
                            >
                                Clique no link contido no email e termine seu cadastro
                            </Text>
                        </Box>
                    </Stack>
                </ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <Button
                        size={"sm"}
                        variant={"outline"}
                        mr={3}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        size={"sm"}
                        variant="blue-800"
                        isLoading={timeout > 0 ? true : false}
                        loadingText={`Reenviar código ${timeout} seg`}
                        spinnerPlacement="end"
                        onClick={resendEmail}
                    >
                        Reenviar código
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
