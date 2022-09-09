import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import type { NextPage } from "next";
import { signOut } from "next-auth/react";

const Dashboard: NextPage = () => {
    const { status, data } = useSession();
    console.log(status, data);

    return (
        <div>
            dashboard
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default Dashboard;
