import { Box, GridItem, Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { toCapitalize } from '../../../functions/toCapitalize';
import { TimetableContext } from './TimetableContext';

interface SubjectCardProps {
    subject: string | {
        id: string,
        bgColor: string;
    },
}

function SubjectCard(props: SubjectCardProps) {
    const { subject } = props;
    const { addSubjectModalOnOpen, setSelectedSubject, setSelectedColor, subjects, subjectModalOnOpen } = useContext(TimetableContext);
    return (
        <GridItem w='100%'>
            <Tooltip
                label={typeof subject !== 'string' && subjects[subject.id]?.name !== undefined ? toCapitalize(subjects[subject.id].name) : 'Clique para adicionar uma matéria'}
                hasArrow
                placement={'top'}
            >
                <Box
                    p={{ base: '.5rem' }}
                    bg={typeof subject !== 'string' && subjects[subject.id]?.name !== undefined ? subject.bgColor : useColorModeValue('white', 'gray.700')}
                    color={typeof subject !== 'string' && subjects[subject.id]?.name !== undefined ? 'white' :  useColorModeValue('gray.800', 'white')}
                    borderRadius={'12px'}
                    borderWidth="1px"
                    borderColor={'gray.300'}
                    h={'50px'}
                    w={'244px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    cursor={'pointer'}

                    _hover={{
                        filter: 'brightness(.95)',
                        transition: 'all .2s ease-in-out',
                    }}
                    onClick={() => {
                        if (typeof subject !== 'string' && subjects[subject.id]?.name !== undefined) {
                            setSelectedSubject(subjects[subject.id]);
                            setSelectedColor(subject.bgColor);
                            subjectModalOnOpen();
                        } else {
                            addSubjectModalOnOpen();
                        }
                    }}
                >
                    {
                        typeof subject !== 'string' && subjects[subject.id]?.name !== undefined ? (
                            <Text
                                w={'244px'}
                                textAlign={'center'}
                                textOverflow={'ellipsis'}
                                overflow={'hidden'}
                                whiteSpace={'nowrap'}
                            >
                                {toCapitalize(subjects[subject.id].name)}
                            </Text>
                        ) : (
                            'Horário vago'
                        )
                    }
                </Box>
            </Tooltip>
        </GridItem>
    )
}

export default SubjectCard