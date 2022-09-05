import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function auth() {
    const router = useRouter();
    const [email, setEmail] = useState<string | string[]>("");
    const { email_home } = router.query;

    useEffect(() => {
        if (email_home) {
            setEmail(email_home);
        }
    }, [email_home]);

    console.log(email);

    return <h1>Create</h1>;
}
