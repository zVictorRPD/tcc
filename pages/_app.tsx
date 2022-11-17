import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";
import LoggedContainer from "../src/components/Logged/Layout/LoggedContainer";
import Head from "next/head";

function MyApp({ Component, pageProps, router }: AppProps) {
    const url = router.pathname;
    const isLogged = url.split("/").includes("ambiente-logado");

    return (
        <ChakraProvider theme={theme}>
            <Head>
                <meta
                    name='viewport'
                    content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
                />
            </Head>
            <SessionProvider session={pageProps.session}>
                {isLogged ? (
                    <LoggedContainer pageName={url.split('ambiente-logado/')[1]}>
                        <Component {...pageProps} />
                    </LoggedContainer>
                ) :
                    <Component {...pageProps} />
                }
            </SessionProvider>
        </ChakraProvider>
    );
}

export default MyApp;
