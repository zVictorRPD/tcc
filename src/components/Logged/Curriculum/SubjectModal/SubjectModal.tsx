import { Box, Button, Editable, EditablePreview, EditableTextarea, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Tooltip, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { CurriculumContext } from '../curriculumContext';
import Notes from './Notes';

function SubjectModal() {
    const { subjectModalIsOpen, subjectModalOnClose, selectedSubject } = useContext(CurriculumContext);
    const toast = useToast();

    return (
        <Modal isOpen={subjectModalIsOpen} onClose={subjectModalOnClose} size={"xl"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{selectedSubject.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs>
                        <TabList>
                            <Tab>Anotações</Tab>
                            <Tab>Avaliações</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Notes />
                            </TabPanel>
                            <TabPanel>
                                <p>two!</p>
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