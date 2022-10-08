import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

interface ISubjectProps {
    subjectData: ISubject;
    index: number;
}

function Subject(props: ISubjectProps) {
    const { subjectData, index } = props;
    
    return (
        <Draggable
            draggableId={subjectData.id}
            index={index}
            key={subjectData.id}
        >
            {provided => (
                <Box
                    w={'100%'}
                    bg={'white'}
                    borderRadius={'1rem'}
                    minH={'100px'}
                    mt={'0 !important'}
                    borderWidth={'1px'}
                    borderColor={'gray.300'}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <Text>
                        {`${subjectData.code} - ${subjectData.name}`}
                    </Text>
                </Box>
            )}

        </Draggable>

    )
}

export default Subject