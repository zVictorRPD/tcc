import { Box, GridItem } from '@chakra-ui/react'
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
    const { addSubjectModalOnOpen, setSelectedSubject, subjects, subjectModalOnOpen } = useContext(TimetableContext);
    return (
        <GridItem w='100%'>
            <Box
                p={{ base: '.5rem' }}
                bg={typeof subject !== 'string' ? subject.bgColor : 'white'}
                color={typeof subject !== 'string' ? 'white' : 'gray.800'}
                borderRadius={'12px'}
                borderWidth="1px"
                borderColor={'gray.300'}
                h={'50px'}
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
                        subjectModalOnOpen();
                    } else {
                        addSubjectModalOnOpen();
                    }
                }}
            >
                {typeof subject !== 'string' ? toCapitalize(subjects[subject.id].name) : 'Horário vago'}
            </Box>
        </GridItem>
    )
}

export default SubjectCard