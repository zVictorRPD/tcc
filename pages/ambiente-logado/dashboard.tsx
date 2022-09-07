import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function dashboard() {
    const { status, data } = useSession();
    console.log(status, data);

    return (
        <div>
            dashboard
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}
