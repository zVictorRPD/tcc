import { Box, Button, HStack, useToast } from '@chakra-ui/react';
import React, { useContext, useRef } from 'react'
import { CurriculumContext } from './curriculumContext';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
import PeriodColumn from './PeriodColumn';
import { FaPlus } from 'react-icons/fa';
import AddPeriodColumn from './AddPeriodColumn';
import styles from './style.module.scss';
import { api } from '../../../services/api';

function DragDropMainContainer() {
    resetServerContext();
    const { periods, subjects, periodOrder, setPeriods, addSubjectModalOnOpen } = useContext(CurriculumContext);
    const toast = useToast();
    const onDragEnd = async (result: any) => {

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

            try {
                const response = await api.post('/curriculum/period/updateSubjectIds', {
                    periodId: newPeriod.id,
                    subjectIds: newSubjectIds,
                    subjectId: draggableId,
                    type: 'samePeriod'
                });
                if (!response.data.subjectsOrder) throw new Error('Erro ao atualizar período');
            } catch (error) {
                toast({
                    title: "Erro ao atualizar",
                    description: "Não foi possível atualizar as matérias",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right"
                });
            }

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
            try {
                const response = await api.post('/curriculum/period/updateSubjectIds', {
                    periodId: [newStart.id, newFinish.id],
                    subjectIds: [startSubjectIds, finishSubjectIds],
                    subjectId: draggableId,
                    type: 'differentPeriod'
                });
                if (!response.data.periodId) throw new Error('Erro ao atualizar período');
            } catch (error) {
                toast({
                    title: "Erro ao atualizar",
                    description: "Não foi possível atualizar as matérias",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right"
                });
            }
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