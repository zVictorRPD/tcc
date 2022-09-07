import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface ConfirmationModalProps {
    modalProps: {
        isOpen: boolean;
        onClose: () => void;
        timeout: number;
        resendEmail: () => void;
    };
}

export default function ConfirmationModal(props: ConfirmationModalProps) {
    const { isOpen, onClose, timeout, resendEmail } = props.modalProps;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody></ModalBody>

                <ModalFooter justifyContent={"center"}>
                    <Button
                        size={"sm"}
                        variant={"solid"}
                        mr={3}
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                    <Button
                        size={"sm"}
                        variant="blue-800"
                        isLoading={timeout > 0 ? true : false}
                        disabled={timeout > 0 ? true : false}
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
