import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import VLibras from "@djpfs/react-vlibras";
import AuthContainer from "../../components/Auth/AuthContainer";

const Login: NextPage = () => {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <AuthContainer>
                <h1>Form</h1>
            </AuthContainer>
            {/* <VLibras forceOnload={true} /> */}
        </>
    );
};

export default Login;
