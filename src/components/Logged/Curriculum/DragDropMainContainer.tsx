import { HStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { renderToString } from 'react-dom/server';
import { CurriculumContext } from './curriculumContext';
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd';
import PeriodColumn from './PeriodColumn';

function DragDropMainContainer() {
    resetServerContext();
    const { periods, subjects, periodOrder, setPeriods } = useContext(CurriculumContext);
    const onDragEnd = (result: any) => {
        
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const period = periods[source.droppableId];
        const newSubjectIds = Array.from(period.subjectIds);

        newSubjectIds.splice(source.index, 1);
        newSubjectIds.splice(destination.index, 0, draggableId);

        const newPeriod = {
            ...period,
            subjectIds: newSubjectIds,
        };

        const newPeriods = {
            ...periods,
            [newPeriod.id]: newPeriod,
        };
        setPeriods(newPeriods);
    }

    return (
        <HStack p={{ base: '.5rem', md: '2rem' }} h={'100%'} gap={2}>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                {
                    periodOrder.map((order, index) => {
                        const period = periods[order];
                        const periodSubjects = period.subjectIds.map(subjectId => subjects[subjectId]);
                        return <PeriodColumn key={index} period={period} subjects={periodSubjects} />
                    })
                }
            </DragDropContext>
        </HStack>
    )
}

export default DragDropMainContainer