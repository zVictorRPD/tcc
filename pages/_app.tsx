import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";
import LoggedContainer from "../src/components/Logged/Layout/LoggedContainer";
import Head from "next/head";
import VLibras from 'vlibras-nextjs';
import Script from 'next/script';

function MyApp({ Component, pageProps, router }: AppProps) {
    const url = router.pathname;
    const isLogged = url.split("/").includes("ambiente-logado");

    return (
        <ChakraProvider theme={theme}>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
            </Head>
            <>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-BCEBNRSCN6"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-BCEBNRSCN6');
                    `}
                </Script>
            </>
            <SessionProvider session={pageProps.session}>
                {isLogged ? (
                    <LoggedContainer pageName={url.split('ambiente-logado/')[1]}>
                        <Component {...pageProps} />
                    </LoggedContainer>
                ) :
                    <Component {...pageProps} />
                }
            </SessionProvider>
            {process.env.NODE_ENV === "production" && <VLibras forceOnload />}
        </ChakraProvider>
    );
}

export default MyApp;
