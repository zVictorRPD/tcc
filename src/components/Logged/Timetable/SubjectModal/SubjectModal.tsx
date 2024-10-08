import { Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { removeSubject } from '../../../../functions/timetable';
import { api } from '../../../../services/api';
import { TimetableContext } from '../TimetableContext';
import Informations from './Informations';
import Notes from './Notes';
import Rating from './Rating';

function SubjectModal() {
    const { subjectModalIsOpen, subjectModalOnClose, selectedSubject, setTimetableSubjects, timetableSubjects } = useContext(TimetableContext);
    const [onLoad, setOnLoad] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: popoverIsOpen,
        onOpen: popoverOnOpen,
        onClose: popoverOnClose
    } = useDisclosure();
    const toast = useToast();

    const removeSubjectFromTimetable = async () => {
        setOnLoad(true);
        const newTimetable = removeSubject(selectedSubject.id, timetableSubjects);
        try {
            await api.post('timetable/updateTimetable', {
                timetable: newTimetable
            });
            toast({
                title: 'Disciplina removida',
                description: 'Disciplina removida com sucesso',
                status: 'success',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            });
            setTimetableSubjects(newTimetable);
            popoverOnClose();
        } catch (error) {
            toast({
                title: 'Erro ao remover matéria',
                description: 'Tente novamente mais tarde',
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            })
        } finally {
            setOnLoad(false);
            subjectModalOnClose();
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
                <ModalBody
                    px={{
                        base: '0',
                        md: '4'
                    }}
                >
                    <Tabs>
                        <TabList>
                            <Tab>Informações</Tab>
                            <Tab>Anotações</Tab>
                            <Tab>Avaliações</Tab>
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
                            <TabPanel>
                                <Rating />
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
                            <Button colorScheme='red' mr={3}>Remover</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverHeader fontWeight='semibold'>Confirmação</PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                Tem certeza que deseja remover a matéria <Text display={'inline'} fontWeight={600}>{selectedSubject.name}</Text> da sua grade horária?
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
                                        onClick={removeSubjectFromTimetable}
                                    >
                                        Remover
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