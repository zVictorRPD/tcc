import { Box, GridItem, Text, Tooltip } from '@chakra-ui/react'
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
                label={typeof subject !== 'string' ? toCapitalize(subjects[subject.id].name) : 'Clique para adicionar uma matéria'}
                hasArrow
                placement={'top'}
            >
                <Box
                    p={{ base: '.5rem' }}
                    bg={typeof subject !== 'string' ? subject.bgColor : 'white'}
                    color={typeof subject !== 'string' ? 'white' : 'gray.800'}
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
                        if (typeof subject !== 'string') {
                            setSelectedSubject(subjects[subject.id]);
                            setSelectedColor(subject.bgColor);
                            subjectModalOnOpen();
                        } else {
                            addSubjectModalOnOpen();
                        }
                    }}
                >
                    {
                        typeof subject !== 'string' ? (
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