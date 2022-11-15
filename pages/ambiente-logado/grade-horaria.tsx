import React from "react";
import type { NextPage } from "next";
import { TimetableProvider } from "../../src/components/Logged/Timetable/TimetableContext";
import AddSubjectModal from "../../src/components/Logged/Timetable/AddSubjectModal";
import SubjectModal from "../../src/components/Logged/Timetable/SubjectModal/SubjectModal";
import TimetableMainContainer from "../../src/components/Logged/Timetable/TimetableMainContainer";

const Timetable: NextPage = () => {
    return (
        <TimetableProvider>
            <TimetableMainContainer />
            <AddSubjectModal />
            <SubjectModal />
        </TimetableProvider>
    );
};

export default Timetable;
