import { Box, Button, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { CurriculumContext } from './curriculumContext';


interface ISubjectProps {
    subjectData: ISubject;
    index: number;
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
    const { subjectData, index } = props;

    const changeStatus = () => {
        console.log('changeStatus');
        console.log(subjectData);

        const status = subjectData.status;
        console.log(status);
        if (!status || status === '') return;

        const newStatus = status === 'todo' ? 'doing' : status === 'doing' ? 'done' : status === 'done' ? 'failed' : 'todo';

        console.log(newStatus);


        setSubjects({
            ...subjects,
            [subjectData.id]: {
                ...subjects[subjectData.id],
                status: newStatus
            }
        });

    }

    return (
        <Draggable
            draggableId={subjectData.id}
            index={index}
            key={subjectData.id}
        >
            {(provided, snapshot) => (
                <Box
                    w={'100%'}
                    borderRadius={'1rem'}
                    minH={'100px'}
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
                            {`${subjectData.code} - ${subjectData.time}`}
                        </Text>
                    </Box>
                    {/* body */}
                    <Box display={'flex'} alignItems={'center'} flexGrow={1}>
                        <Text fontSize={'1.25rem'} fontWeight={'bold'}>{subjectData.name}</Text>
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
                                setSelectedSubject(subjectData);
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