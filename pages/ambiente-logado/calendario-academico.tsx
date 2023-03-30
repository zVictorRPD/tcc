import React from "react";
import type { NextPage } from "next";
import { Grid } from "@chakra-ui/react";
import { academicCalendarDates as dates } from "../../src/functions/academicCalendarDates";
import DateCard from "../../src/components/Logged/AcademicCalendar/DateCard";

const AcademicCalendar: NextPage = () => {
    return (
        <>
            <Grid
                maxW={'768px'}
                margin={'0 auto'}
                templateRows={{
                    base: "repeat(4, min-content)",
                    md: "repeat(2, 1fr)",
                }}
                templateColumns={{
                    base: "1fr",
                    md: "repeat(2, 1fr)",
                }}
                gap={{
                    base: "1rem",
                    xl: "1.5rem",
                }}
            >
                {dates.map((date, index) => {
                    return (<DateCard key={index} date={date} />)
                })}
            </Grid>
        </>
    );
};

export default AcademicCalendar;
