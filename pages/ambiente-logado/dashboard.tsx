import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { NextPage } from "next";
import { signOut } from "next-auth/react";
import { api } from "../../src/services/api";

const Dashboard: NextPage = () => {
    const { status, data } = useSession();
    const [userAvatar, setUserAvatar] = useState("");
    async function getUserImage() {
        const response = await api.post('/getUserAvatar', {id: data?.id});
        if(response.data.code === 200) {
            setUserAvatar(response.data.data.avatar);
        }
        return false
    }

    useEffect(() => {  
        if(data?.id !== undefined) {
            getUserImage();
        }
    }, [data]);
    
    return (
        <div>
            dashboard
            <img src={userAvatar} alt="" />
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
};

export default Dashboard;
