import { Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react'
import SubjectCard from './SubjectCard';
import { timeTableTranslation } from "../../../functions/timetable";
import { TimetableContext } from './TimetableContext';

interface ISubjectGridProps {
    type: string,
    index: number
}

function SubjectGrid(props: ISubjectGridProps) {
    const { type, index } = props;
    const { timetableSubjects } = useContext(TimetableContext);  

    
    const shiftSelector = (type: string, day: any, index: number) => {
        if (index < 5) {
            return day.m[type];
        } else if (index < 10) {
            return day.t[type];
        }
        return day.n[type];
    }

    return (
        <Grid templateColumns='62px repeat(6, 1fr)' gap={3}>
            <GridItem w='100%'>
                <VStack justifyContent={'center'} h={'100%'}>
                    <Text fontWeight={600}>{timeTableTranslation[`${type}-${index}`]}</Text>
                </VStack>
            </GridItem>

            {
                Object.values(timetableSubjects).map((day, i) => {
                    return (<SubjectCard key={i} subject={shiftSelector(type, day, index)} />)
                })
            }
        </Grid>
    )
}

export default SubjectGrid