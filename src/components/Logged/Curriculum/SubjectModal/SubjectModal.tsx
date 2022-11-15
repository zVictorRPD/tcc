import { Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { api } from '../../../../services/api';
import { CurriculumContext } from '../curriculumContext';
import Informations from './Informations';
import Notes from './Notes';

function SubjectModal() {
    const { subjectModalIsOpen, subjectModalOnClose, selectedSubject, subjects, setSubjects, periods, setPeriods } = useContext(CurriculumContext);
    const [onLoad, setOnLoad] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: popoverIsOpen,
        onOpen: popoverOnOpen,
        onClose: popoverOnClose
    } = useDisclosure();
    const toast = useToast();

    const handleDeleteSubject = async () => {
        setOnLoad(true);
        try {
            const response = await api.post('/curriculum/subject/deleteSubject', {
                subjectId: selectedSubject.id,
                periodId: selectedSubject.periodId
            });
            if (!response.data.id) throw new Error('Erro ao deletar matéria');
            let newSubjects = subjects;
            delete newSubjects[selectedSubject.id];
            setSubjects(newSubjects);
            let newPeriods = periods;
            newPeriods[selectedSubject.periodId].subjectIds = newPeriods[selectedSubject.periodId].subjectIds.filter((subjectId: string) => subjectId !== selectedSubject.id);
            setPeriods(newPeriods);
            toast({
                title: "Matéria deletada",
                description: "A matéria foi deletada com sucesso",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            popoverOnClose();
            subjectModalOnClose();

        } catch (err) {
            toast({
                title: "Erro ao deletar matéria.",
                description: "Ocorreu um erro ao deletar a matéria.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        } finally {
            setOnLoad(false);
        }
    };

    return (
        <Modal
            isOpen={subjectModalIsOpen}
            onClose={subjectModalOnClose}
            size={"xl"}
        >
            <ModalOverlay />
            <ModalContent
                opacity={isOpen ? '.7 !important' : '1'}
            >
                <ModalHeader>{selectedSubject.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs>
                        <TabList>
                            <Tab>Informações</Tab>
                            <Tab>Anotações</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Informations
                                    isOpen={isOpen}
                                    onClose={onClose}
                                    onOpen={onOpen}
                                />
                            </TabPanel>
                            <TabPanel>
                                <Notes />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
                <ModalFooter>
                    <Popover
                        placement='top'
                        isOpen={popoverIsOpen}
                        onOpen={popoverOnOpen}
                        onClose={popoverOnClose}
                    >
                        <PopoverTrigger>
                            <Button colorScheme='red' mr={3}>Deletar</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverHeader fontWeight='semibold'>Confirmação</PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                Tem certeza que deseja deletar a matéria <Text display={'inline'} fontWeight={600}>{selectedSubject.name}?</Text> Essa ação não pode ser desfeita.
                            </PopoverBody>
                            <PopoverFooter display='flex' justifyContent='flex-end'>
                                <ButtonGroup size='sm'>
                                    <Button
                                        variant='outline'
                                        onClick={popoverOnClose}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        colorScheme='red'
                                        isLoading={onLoad}
                                        onClick={handleDeleteSubject}
                                    >
                                        Deletar
                                    </Button>
                                </ButtonGroup>
                            </PopoverFooter>
                        </PopoverContent>
                    </Popover>
                    <Button variant='outline' mr={3} onClick={subjectModalOnClose}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SubjectModal