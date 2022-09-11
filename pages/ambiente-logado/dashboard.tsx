import React from "react";
import type { NextPage } from "next";
import LoggedContainer from "../../src/components/Logged/LoggedContainer";
import { useSession } from "next-auth/react";

const Dashboard: NextPage = () => {
    const { status, data } = useSession();
    return (
        <LoggedContainer sessionData={data}>
            <h1>Dashboard</h1>
        </LoggedContainer>
    );
};

export default Dashboard;
