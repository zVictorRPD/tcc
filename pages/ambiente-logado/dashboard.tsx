import React from "react";
import type { NextPage } from "next";
import { Grid, GridItem } from "@chakra-ui/react";
import Class from "../../src/components/Logged/Dashboard/Class";
import Events from "../../src/components/Logged/Dashboard/Events";
import Status from "../../src/components/Logged/Dashboard/Status";
import Subjects from "../../src/components/Logged/Dashboard/Subjects";
import Teachers from "../../src/components/Logged/Dashboard/Teachers";

const Dashboard: NextPage = () => {
    return (
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
    );
};

export default Dashboard;
