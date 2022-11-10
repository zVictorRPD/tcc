import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { CurriculumContext } from '../curriculumContext';
import CourseTab from './CourseTab';
import PeriodTab from './PeriodTab';
import SubjectTab from './SubjectTab';
import ComplementaryTab from './ComplementaryTab';

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
                        <TabList
                            flexWrap={{
                                base: 'wrap',
                                md: 'nowrap',
                            }}
                        >
                            <Tab flex={'50%'}>Curso</Tab>
                            <Tab flex={'50%'}>Períodos</Tab>
                            <Tab flex={'50%'}>Matérias</Tab>
                            <Tab flex={'50%'}>Complementares</Tab>
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
                            <TabPanel px={0}>
                                <ComplementaryTab />
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