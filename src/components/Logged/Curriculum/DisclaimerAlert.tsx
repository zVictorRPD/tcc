import {
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    Button,
    Icon,
    Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { CurriculumContext } from "./curriculumContext";
import { FiAlertTriangle } from "react-icons/fi";

function DisclaimerAlert() {
    const { disclaimerIsOpen, disclaimerOnClose, cancelRef } =
        useContext(CurriculumContext);
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={disclaimerOnClose}
            isOpen={disclaimerIsOpen}
            closeOnEsc={false}
            closeOnOverlayClick={false}
            isCentered
        >
            <AlertDialogOverlay />
            <AlertDialogContent>
                <AlertDialogHeader display={"flex"} alignItems={"center"}>
                    <Icon as={FiAlertTriangle} mr={2} />
                    <Text as={"span"}>Aviso Importante</Text>
                </AlertDialogHeader>
                <AlertDialogBody textAlign={"justify"}>
                    A grade curricular é montada de acordo com o planejamento do
                    seu curso, infelizmente o sistema não tem acesso aos
                    pré-requisitos de cada disciplina, portanto, é de sua
                    responsabilidade verificar se a disciplina que você está
                    adicionando possui pré-requisitos que você ainda não cursou.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button colorScheme="green" ml={3} onClick={disclaimerOnClose}>
                        Entendi e tomarei cuidado
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DisclaimerAlert;
