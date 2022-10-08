import React from "react";
import type { NextPage } from "next";
import { Stack } from "@chakra-ui/react";
import { timeTableSchedule } from "../../src/components/Logged/Timetable/timeTableObject";
import SubjectGrid from "../../src/components/Logged/Timetable/SubjectGrid";
import WeekdaysGrid from "../../src/components/Logged/Timetable/WeekdaysGrid";
import { TimetableProvider } from "../../src/components/Logged/Timetable/TimetableContext";
import AddSubjectModal from "../../src/components/Logged/Timetable/AddSubjectModal";

const Timetable: NextPage = () => {
    return (
        <TimetableProvider>
            <Stack p={{ base: '.5rem', md: '2rem' }} h={'100%'}>
                <WeekdaysGrid />
                {timeTableSchedule.map((timeTable, index) => {
                    return <SubjectGrid key={index} type={timeTable} index={index} />
                })}
            </Stack>
            <AddSubjectModal />
        </TimetableProvider>
    );
};

export default Timetable;
