import { Box, GridItem } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { TimetableContext } from '../../../../pages/ambiente-logado/grade-horaria/timetableContext';

interface SubjectCardProps {
    subject: ISubject | '',
}

function SubjectCard(props: SubjectCardProps) {
    const { subject } = props;
    const { addSubjectModalOnOpen } = useContext(TimetableContext);
    return (
        <GridItem w='100%'>
            <Box
                p={{ base: '.5rem' }}
                bg="white"
                borderRadius={'12px'}
                borderWidth="1px"
                borderColor={'gray.300'}
                h={'100px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                cursor={'pointer'}
                _hover={{
                    filter: 'brightness(.95)',
                    transition: 'all .2s ease-in-out',
                }}
                onClick={addSubjectModalOnOpen}
            >
                {subject != '' ? subject.name : 'Horário vago'}
            </Box>
        </GridItem>
    )
}

export default SubjectCard