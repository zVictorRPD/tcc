import { Box, Button, Editable, EditablePreview, EditableTextarea, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { CurriculumContext } from '../curriculumContext';
import Informations from './Informations';
import Notes from './Notes';

function SubjectModal() {
    const { subjectModalIsOpen, subjectModalOnClose, selectedSubject } = useContext(CurriculumContext);
    const { isOpen, onOpen, onClose } = useDisclosure();
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
                    <Button variant='outline' mr={3} onClick={subjectModalOnClose}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SubjectModal