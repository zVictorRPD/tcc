import { Box, Button, HStack } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { CurriculumContext } from './curriculumContext';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
import PeriodColumn from './PeriodColumn';
import { FaPlus } from 'react-icons/fa';
import AddPeriodColumn from './AddPeriodColumn';
import styles from './style.module.scss';

function DragDropMainContainer() {
    resetServerContext();
    const { periods, subjects, periodOrder, setPeriods, addSubjectModalOnOpen } = useContext(CurriculumContext);
    const onDragEnd = (result: any) => {

        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const start = periods[source.droppableId];
        const finish = periods[destination.droppableId];

        if (start === finish) {

            const newSubjectIds = Array.from(start.subjectIds);

            newSubjectIds.splice(source.index, 1);
            newSubjectIds.splice(destination.index, 0, draggableId);

            const newPeriod = {
                ...start,
                subjectIds: newSubjectIds,
            };

            const newPeriods = {
                ...periods,
                [newPeriod.id]: newPeriod,
            };
            setPeriods(newPeriods);

        } else {
            //moving from one list to another
            const startSubjectIds = Array.from(start.subjectIds);
            startSubjectIds.splice(source.index, 1);
            const newStart = {
                ...start,
                subjectIds: startSubjectIds,
            };

            const finishSubjectIds = Array.from(finish.subjectIds);
            finishSubjectIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                subjectIds: finishSubjectIds,
            };

            const newPeriods = {
                ...periods,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            };
            setPeriods(newPeriods);
        }

    }

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            {
                periodOrder.length > 0 ? (
                    <HStack
                        p={{ base: '.5rem', md: '2rem' }}
                        h={'91.7vh'}
                        gap={2}
                        position={'relative'}
                        overflowX={'auto'}
                        alignItems={'flex-start'}
                        className={styles.main_container_scrollbar}
                    >
                        {
                            periodOrder.map((order, index) => {
                                const period = periods[order];
                                const periodSubjects = !!period.subjectIds ? period.subjectIds.map(subjectId => subjects[subjectId]) : [];                                
                                return <PeriodColumn key={index} period={period} subjects={periodSubjects} />
                            })
                        }
                        <AddPeriodColumn />
                    </HStack>
                ) : 'vazio'
            }
            <Box
                position={'absolute'}
                bottom={'1rem'}
                right={'1rem'}
            >
                <Button
                    variant='blue-800'
                    size={{ base: 'sm', md: 'md' }}
                    leftIcon={<FaPlus />}
                    onClick={() => {
                        addSubjectModalOnOpen();
                    }}
                >
                    Adicionar matéria
                </Button>
            </Box>
        </DragDropContext>
    )
}

export default DragDropMainContainer