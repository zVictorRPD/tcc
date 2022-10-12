import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa';
import Subject from './Subject';
import { Droppable } from 'react-beautiful-dnd';
import styles from './style.module.scss';
import { CurriculumContext } from './curriculumContext';

interface IPeriodColumnProps {
    period: IPeriods[number];
    subjects: ISubjects[string][];
}

function PeriodColumn(props: IPeriodColumnProps) {
    const { period, subjects } = props;

    return (
        <Stack
            bg={'gray.300'}
            borderWidth='1px'
            borderColor='gray.400'
            maxH={'83.2vh'}
            minW={'300px'}
            borderRadius={'1rem 1rem 0 0'}
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
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}

            >
                <Text
                    fontWeight={600}
                    color='gray.800'
                    fontSize={'2xl'}
                    textAlign={'center'}
                >
                    {period.name}
                </Text>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        size={'sm'}
                        aria-label='Options'
                        icon={<FaEllipsisV />}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem icon={<FaEdit />}>
                            Editar nome
                        </MenuItem>
                        <MenuItem icon={<FaTrash />}>
                            Excluir
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            {/* Body */}
            <Droppable droppableId={period.id}>
                {(provided, snapshot) => (
                    <Stack
                        {...provided.droppableProps}
                        px={'1rem'}
                        pb={'1rem'}
                        h={'100%'}
                        minH={'100px'}
                        overflowY={'auto'}
                        style={{ margin: 0 }}
                        ref={provided.innerRef}
                        bg={snapshot.isDraggingOver ? 'gray.400' : 'gray.300'}
                        transition={'background-color .3s ease'}
                        className={styles.period_scrollbar}

                    >
                        {Object.keys(subjects).map((key: any, index) => {
                            return <Subject key={index} index={index} subjectData={subjects[key]} />
                        })}
                        {provided.placeholder}
                    </Stack>
                )}

            </Droppable>
        </Stack>

    )
}

export default PeriodColumn