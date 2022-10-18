import { Button, ButtonGroup, Divider, Editable, EditablePreview, EditableTextarea, Flex, IconButton, Input, Text, Textarea, useEditableControls } from '@chakra-ui/react'
import React from 'react'
import { FaEdit, FaCheck, FaTimes, FaPlus } from 'react-icons/fa'

export default function Notes() {
    /* Here's a custom control */
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup w={'100%'} mt={'.5rem'} justifyContent='end' size='sm'>
                <Button colorScheme={'red'} {...getCancelButtonProps()}><FaTimes /></Button>
                <Button variant={'blue-800'} {...getSubmitButtonProps()}><FaCheck /></Button>
            </ButtonGroup>
        ) : (
            <Flex justifyContent='end' mt={'.5rem'}>
                <Button variant={'blue-800'} size={'sm'} {...getEditButtonProps()}><FaEdit /></Button>
            </Flex>
        )
    }
    return (
        <>
            <Text fontWeight={600}>
                Realize anotações sobre a matéria
            </Text>
            <Divider my={'.5rem'} />
            <Editable
                defaultValue=''
                isPreviewFocusable={false}
                placeholder='Digite aqui...'
            >
                <EditablePreview />
                {/* Here is the custom input */}
                <Textarea as={EditableTextarea} />
                <EditableControls />
            </Editable>
            <Divider my={'.5rem'} />
            <Text fontWeight={600}>
                Salve links úteis
            </Text>
            <Flex 
                justifyContent={'end'}
            >
                <Button variant={'blue-800'} size={'sm'}><FaPlus /></Button>
            </Flex>

        </>

    )
}
