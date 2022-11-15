import { Box, Button, ButtonGroup, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { api } from '../../../../services/api';
import { TimetableContext } from '../TimetableContext';
import Informations from './Informations';
import Notes from './Notes';

function SubjectModal() {
    const { subjectModalIsOpen, subjectModalOnClose, selectedSubject, subjects, setSubjects } = useContext(TimetableContext);
    const [onLoad, setOnLoad] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: popoverIsOpen,
        onOpen: popoverOnOpen,
        onClose: popoverOnClose
    } = useDisclosure();
    const toast = useToast();


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