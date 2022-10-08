import { Box, Button, HStack, Stack, Text } from '@chakra-ui/react';
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import Subject from './Subject';
import { Droppable } from 'react-beautiful-dnd';

interface IPeriodColumnProps {
    period: IPeriods[number];
    subjects: ISubjects[string][];
}

function PeriodColumn(props: IPeriodColumnProps) {
    const { period, subjects } = props;
    console.log(period.id);

    return (
        <Stack
            bg={'gray.300'}
            borderWidth='1px'
            borderColor='gray.400'
            h={'85vh'}
            minW={'300px'}
            borderRadius={'1rem'}
        >
            {/* Header */}
            <Box
                borderBottomWidth={'1px'}
                borderBottomColor={'gray.400'}
                w={'100%'}
                py={2}
                px={4}
                bg={'white'}
                borderRadius={'1rem 1rem 0 0'}
            >
                <Text
                    fontWeight={600}
                    color='gray.800'
                    fontSize={'2xl'}
                    textAlign={'center'}
                >
                    {period.name}
                </Text>
            </Box>
            {/* Body */}
            <Droppable droppableId={period.id}>
                {provided => (
                    <Stack
                        px={'1rem'}
                        rowGap={'1rem'}
                        py={'1rem'}
                        style={{ margin: 0 }}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {Object.keys(subjects).map((key: any, index) => {
                            return <Subject key={index} index={index} subjectData={subjects[key]} />
                        })}
                        {provided.placeholder}
                    </Stack>
                )}

            </Droppable>


            {/* Footer */}
            <HStack
                borderTopWidth={'1px'}
                borderTopColor={'gray.400'}
                bg={'white'}
                w={'100%'}
                py={2}
                px={4}
                cursor={'pointer'}
                borderRadius={'0 0 1rem 1rem'}
                justifyContent={'center'}
                style={{ marginTop: 'auto' }}
                _hover={{
                    bg: 'gray.50'
                }}

            >
                <Text
                    fontWeight={400}
                    color='gray.800'
                    fontSize={'xl'}
                    textAlign={'center'}
                >
                    Adicionar matéria
                </Text>
                <FaPlus style={{ marginTop: '3px' }} />
            </HStack>
        </Stack>

    )
}

export default PeriodColumn