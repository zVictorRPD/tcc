import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { CurriculumContext } from '../curriculumContext';
import CourseTab from './CourseTab';
import PeriodTab from './PeriodTab';
import SubjectTab from './SubjectTab';

function CurriculumDrawer() {
    const { curriculumDrawerIsOpen, curriculumDrawerOnClose, addSubjectModalOnOpen } = useContext(CurriculumContext);
    return (
        <Drawer onClose={curriculumDrawerOnClose} isOpen={curriculumDrawerIsOpen} size={'md'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Grade Curricular</DrawerHeader>
                <DrawerBody>
                    <Tabs isFitted >
                        <TabList>
                            <Tab>Curso</Tab>
                            <Tab>Períodos</Tab>
                            <Tab>Matérias</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel px={0}>
                                <CourseTab />
                            </TabPanel>
                            <TabPanel px={0}>
                                <PeriodTab />
                            </TabPanel>
                            <TabPanel px={0}>
                                <SubjectTab />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </DrawerBody>
                <DrawerFooter>
                    <Button
                        variant='blue-800'
                        size={{ base: 'sm', md: 'md' }}
                        onClick={addSubjectModalOnOpen}
                    >
                        Adicionar matéria
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CurriculumDrawer