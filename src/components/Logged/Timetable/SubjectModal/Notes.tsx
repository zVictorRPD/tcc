import { Button, useToast, ButtonGroup, Divider, Editable, EditablePreview, EditableTextarea, Flex, HStack, Input, Text, Textarea, useEditableControls, Box } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaEdit, FaCheck, FaTimes, FaPlus, FaTrash } from 'react-icons/fa'
import { api } from '../../../../services/api';
import { TimetableContext } from '../TimetableContext';


export default function Notes() {
    const { selectedSubject, subjects, setSubjects } = useContext(TimetableContext);
    const [note, setNote] = useState('');
    const [links, setLinks] = useState<ILink[]>(selectedSubject?.links || []);
    const [link, setLink] = useState<ILink>({
        name: '',
        url: ''
    });
    const [addingLink, setAddingLink] = useState(false);
    const toast = useToast();

    const handleSaveNote = () => {
        try {
            const response = api.post('curriculum/subject/updateNote', {
                subjectId: selectedSubject.id,
                text: note
            });
            setSubjects({
                ...subjects,
                [selectedSubject.id]: {
                    ...subjects[selectedSubject.id],
                    note: note
                }
            });
        } catch (error) {
            console.log(error);

        }
    }

    const handleAddLink = (e:any) => {
        e.preventDefault();
        //regex to check if the url is valid
        const regex = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

        if (link.name === '' || link.url === '') {
            toast({
                title: 'Erro ao adicionar link',
                description: 'Preencha todos os campos',
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            })
            return;
        }
        if (!regex.test(link.url)) {
            toast({
                title: 'Erro ao adicionar link',
                description: 'Link inválido',
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            })
            return;
        }

        //add http if it's not present
        let url = link.url;
        if (!link.url.startsWith('http')) {
            url = `https://${link.url}`
        }

        //check if the link already exists
        if (links.find(l => l.url === url)) {
            toast({
                title: 'Erro ao adicionar link',
                description: 'Link já adicionado',
                status: 'error',
                position: 'top-right',
                duration: 3000,
                isClosable: true
            })
            return;
        }

        try {
            const newLinks = [...links, {
                name: link.name,
                url: url
            }];
            const response = api.post('curriculum/subject/updateLink', {
                subjectId: selectedSubject.id,
                links: newLinks
            });

            setLinks(newLinks);
            setLink({
                name: '',
                url: ''
            });
            setSubjects({
                ...subjects,
                [selectedSubject.id]: {
                    ...subjects[selectedSubject.id],
                    links: newLinks
                }
            });
            setAddingLink(false);
        } catch (error) {
            console.log(error);

        }

    }

    const handleDeleteLink = (url: string) => {
        try {
            const newLinks = links.filter((link, i) => link.url !== url);
            const response = api.post('curriculum/subject/updateLink', {
                subjectId: selectedSubject.id,
                links: newLinks
            });
            setLinks(newLinks);
            setSubjects({
                ...subjects,
                [selectedSubject.id]: {
                    ...subjects[selectedSubject.id],
                    links: newLinks
                }
            });
        } catch (error) {
            console.log(error);
        }
    }



    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

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
            <Text fontSize={'xl'} fontWeight={600}>
                Anotações sobre a matéria
            </Text>
            <Divider my={'.5rem'} />
            <Editable
                defaultValue={selectedSubject?.note || ''}
                isPreviewFocusable={false}
                placeholder='Salve suas informações sobre a matéria'
                onChange={(value) => setNote(value)}
                onSubmit={handleSaveNote}
            >
                <EditablePreview />
                {/* Here is the custom input */}
                <Textarea as={EditableTextarea} />
                <EditableControls />
            </Editable>
            <Divider my={'.5rem'} />
            <Text fontSize={'xl'} fontWeight={600} mb={'.5rem'}>
                Links úteis
            </Text>
            <Divider my={'.5rem'} />
            {links.map((link, index) => (
                <Box key={index}>
                    <HStack>
                        <Text fontWeight={600} color='blue.500'>
                            <a href={link.url} target='_blank' rel="noreferrer">
                                {link.name}
                            </a>
                        </Text>
                        <Button
                            ml={'auto !important'}
                            variant={'red-500'}
                            size={'xs'}
                            onClick={() => handleDeleteLink(link.url)}
                        >
                            <FaTrash />
                        </Button>
                    </HStack>

                    <Divider my={'.5rem'} />
                </Box>
            ))}

            {addingLink ? (
                <>
                    <form onSubmit={(e) => handleAddLink(e)}>
                        <Input
                            placeholder="Artigo científico"
                            type={'text'}
                            value={link.name}
                            onChange={(e) => setLink({ ...link, name: e.target.value })}
                            my={'.5rem'}
                        />
                        <Input
                            type={'text'}
                            placeholder="www.universidade.com/artigo"
                            value={link.url}
                            onChange={(e) => setLink({ ...link, url: e.target.value })}
                        />
                        <HStack
                            mt={2}
                            w={'100%'}
                        >
                            <Button
                                size={'sm'}
                                variant='outline'
                                mr={1}
                                onClick={() => setAddingLink(false)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                size={'sm'}
                                variant='blue-800'
                                type='submit'
                            >
                                Adicionar
                            </Button>
                        </HStack>
                    </form>
                </>
            ) : (
                <Flex
                    justifyContent={'end'}
                >
                    <Button
                        variant={'blue-800'}
                        size={'sm'}
                        onClick={() => setAddingLink(true)}
                    >
                        <FaPlus />
                    </Button>
                </Flex >
            )}
        </>

    )
}
