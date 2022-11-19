import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { Grid } from "@chakra-ui/react";
import Class from "../../src/components/Logged/Dashboard/Class";
import Events from "../../src/components/Logged/Dashboard/Events";
import Status from "../../src/components/Logged/Dashboard/Status";
import Subjects from "../../src/components/Logged/Dashboard/Subjects";
import Teachers from "../../src/components/Logged/Dashboard/Teachers";
import { useSession } from "next-auth/react";
import { DashboardProvider } from "../../src/components/Logged/Dashboard/DashboardContext";
import EventModal from "../../src/components/Logged/Dashboard/EventsModal";

const Dashboard: NextPage = () => {
    const [userId, setUserId] = useState(0);
    const { data } = useSession();

    useEffect(() => {
        if (typeof data?.id === 'number') {
            setUserId(data?.id);
        }
    }, [data]);

    return (
        <DashboardProvider>
            <Grid
                p={{
                    base: "1rem",
                    xl: "1.5rem",
                }}
                templateRows={{
                    base: "repeat(5, min-content)",
                    lg: "repeat(2, 1fr)",
                }}
                templateColumns={{
                    base: "1fr",
                    lg: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)",
                }}
                gap={{
                    base: "1rem",
                    xl: "1.5rem",
                }}
            >
                <Class />
                <Events />
                <Status />
                <Subjects />
                <Teachers />
            </Grid>
            <EventModal />
        </DashboardProvider>
    );
};

export default Dashboard;
