import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay,  Tab, TabList, TabPanel, TabPanels, Tabs, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { DashboardContext } from '../DashboardContext';
import Informations from './Informations';
import Notes from './Notes';
import Rating from './Rating';

function SubjectModal() {
    const { subjectModalIsOpen, subjectModalOnClose, selectedSubject } = useContext(DashboardContext);
    const [onLoad, setOnLoad] = useState(false);
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
                    <Button variant='outline' mr={3} onClick={subjectModalOnClose}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SubjectModal