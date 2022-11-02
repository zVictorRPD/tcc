import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { CurriculumContext } from './curriculumContext';

function CurriculumDrawer() {
    const { curriculumDrawerIsOpen, curriculumDrawerOnClose } = useContext(CurriculumContext);
    return (
        <Drawer onClose={curriculumDrawerOnClose} isOpen={curriculumDrawerIsOpen} size={'md'}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Grade Curricular</DrawerHeader>
                <DrawerBody>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Consequat nisl vel pretium lectus quam id. Semper quis lectus
                        nulla at volutpat diam ut venenatis. Dolor morbi non arcu risus
                        quis varius quam quisque. Massa ultricies mi quis hendrerit dolor
                        magna eget est lorem. Erat imperdiet sed euismod nisi porta.
                        Lectus vestibulum mattis ullamcorper velit.
                    </p>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default CurriculumDrawer