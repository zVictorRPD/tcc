import React from "react";
import type { NextPage } from "next";
import { Stack } from "@chakra-ui/react";
import { timeTableSchedule } from "./timeTableObject";
import IntervalGrid from "../../../src/components/Logged/Subject/IntervalGrid";
import SubjectGrid from "../../../src/components/Logged/Subject/SubjectGrid";
import WeekdaysGrid from "../../../src/components/Logged/Subject/WeekdaysGrid";
import { TimetableProvider } from "./timetableContext";
import AddSubjectModal from "../../../src/components/Logged/Subject/AddSubjectModal";

const Timetable: NextPage = () => {

    return (
        <TimetableProvider>
            <Stack p={{ base: '.5rem', md: '2rem' }} h={'100%'}>
                <WeekdaysGrid />
                {timeTableSchedule.map((timeTable, index) => {
                    if (timeTable != '2-3' && timeTable != '4-5') return <IntervalGrid key={index} type={timeTable} />;
                    else return <SubjectGrid key={index} type={timeTable} index={index} />
                })}
            </Stack>
            <AddSubjectModal />
        </TimetableProvider>
    );
};

export default Timetable;
