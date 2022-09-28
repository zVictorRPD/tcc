import { Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import React, { useContext } from 'react'
import SubjectCard from './SubjectCard';
import { timeTableTranslation } from "../../../../pages/ambiente-logado/grade-horaria/timeTableObject";
import { TimetableContext } from '../../../../pages/ambiente-logado/grade-horaria/timetableContext';

interface ISubjectGridProps {
    type: string,
    index: number
}

function SubjectGrid(props: ISubjectGridProps) {
    const { type, index } = props;
    const { timetableSubjects } = useContext(TimetableContext);  

    const shiftSelector = (type: string, day: any, index: number) => {
        if (index < 3) {
            return day[1].m[type];
        } else if (index < 6) {
            return day[1].t[type];
        }
        return day[1].n[type];
    }

    return (
        <Grid templateColumns='62px repeat(5, 1fr)' gap={3}>
            <GridItem w='100%'>
                <VStack justifyContent={'center'} h={'100%'}>
                    <Text fontWeight={600}>{timeTableTranslation[`${type}-${index}`]}</Text>
                </VStack>
            </GridItem>

            {
                Object.entries(timetableSubjects).map((day, i) => {
                    return (<SubjectCard key={i} subject={shiftSelector(type, day, index)} />)
                })
            }
        </Grid>
    )
}

export default SubjectGrid