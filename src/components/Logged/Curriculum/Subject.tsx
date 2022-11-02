import { Box, Button, Text } from '@chakra-ui/react'
import React, { useContext, useRef, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { toCapitalize } from '../../../functions/toCapitalize';
import { api } from '../../../services/api';
import { CurriculumContext } from './curriculumContext';

interface ISubjectProps {
    subjectData: ISubject;
    index: number;
    periodId: string;
}

const backgroundColors: any = {
    'todo': 'gray.500',
    'doing': 'blue.500',
    'done': 'green.500',
    'failed': 'red.500'
}

const translateStatus: any = {
    'todo': 'Pendente',
    'doing': 'Cursando',
    'done': 'Aprovado',
    'failed': 'Reprovado'
}

const buttonStatus: any = {
    'todo': 'gray-500',
    'doing': 'blue-500',
    'done': 'green-500',
    'failed': 'red-500'
}

function Subject(props: ISubjectProps) {
    const { subjects, setSubjects, setSelectedSubject, subjectModalOnOpen } = useContext(CurriculumContext);
    const { subjectData, index, periodId } = props;
    const [clockTimer, setClockTimer] = useState<NodeJS.Timer>();

    const changeStatus = () => {
        const status = subjectData.status;
        if (!status || status === '') return;

        const newStatus = status === 'todo' ? 'doing' : status === 'doing' ? 'done' : status === 'done' ? 'failed' : 'todo';

        setSubjects({
            ...subjects,
            [subjectData.id]: {
                ...subjects[subjectData.id],
                status: newStatus
            }
        });

        if (clockTimer) clearInterval(clockTimer);

        setClockTimer(
            setTimeout(() => {
                try {
                    api.post('/curriculum/subject/updateStatus', {
                        subjectId: subjectData.id,
                        status: newStatus
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }, 2000)
        );
    }
    
    return (
        <Draggable
            draggableId={subjectData.id}
            index={index}
            key={subjectData.id}
        >
            {(provided, snapshot) => (
                <Box
                    w={'260px'}
                    borderRadius={'1rem'}
                    minH={'110px'}
                    bg={'white'}
                    mt={'1rem !important'}
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    shadow={snapshot.isDragging ? 'outline' : 'none'}
                >
                    {/* header */}
                    <Box
                        w={'100%'}
                        bg={subjectData.status ? backgroundColors[subjectData.status] : backgroundColors['todo']}
                        borderRadius={'1rem 1rem 0 0'}
                        p={'.125rem'}
                    >
                        <Text
                            fontSize={'0.875rem'}
                            fontWeight={'400'}
                            color={'white'}
                            textAlign={'center'}
                        >
                            {`${subjectData.code} - ${subjectData.time} horas`}
                        </Text>
                    </Box>
                    {/* body */}
                    <Box px={'.5rem'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexGrow={1}>
                        <Text fontSize={'1rem'} fontWeight={'500'} textAlign={'center'}>{toCapitalize(subjectData.name)}</Text>
                    </Box>
                    {/* Footer */}
                    <Box
                        mb={'.5rem'}
                        display={'flex'}
                        columnGap={'.5rem'}
                    >
                        <Button
                            variant={subjectData.status ? buttonStatus[subjectData.status] : buttonStatus['todo']}
                            size={'xs'}
                            onClick={changeStatus}
                            cursor={'pointer'}
                        >
                            {subjectData.status ? translateStatus[subjectData.status] : translateStatus['todo']}
                        </Button>
                        <Button
                            variant={'blue-800'}
                            size={'xs'}
                            onClick={() => {
                                setSelectedSubject({
                                    ...subjectData,
                                    periodId: periodId
                                });
                                subjectModalOnOpen()
                            }}
                            cursor={'pointer'}
                        >
                            Ver mais
                        </Button>
                    </Box>
                </Box>
            )}

        </Draggable>

    )
}

export default Subject