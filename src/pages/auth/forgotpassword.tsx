import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import VLibras from "@djpfs/react-vlibras";
import AuthContainer from "../../components/Auth/AuthContainer";
import { Box, Button, HStack, Text } from "@chakra-ui/react";
import FirstStep from "../../components/Auth/ForgotPassword/FirstStep";
import SecondStep from "../../components/Auth/ForgotPassword/SecondStep";
import ThirdStep from "../../components/Auth/ForgotPassword/ThirdStep";

const Login: NextPage = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState<string>('');
    const [token, setToken] = useState<number>(0);
    const [password, setPassword] = useState<string>('false');
    const [confirmationPassword, setConfirmationPassword] = useState<string>('false');
    
    const handleNextStep = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };

    return (
        <>
            <Head>
                <title>Esqueci a senha</title>
            </Head>
            <AuthContainer>
                <Box p={[".5rem", ".5rem", "1rem"]}>
                    <Text
                        textAlign={"center"}
                        fontSize={"5xl"}
                        mb={["1rem", "1rem", "1.5rem"]}
                    >
                        Esqueci a senha
                    </Text>

                    {step === 1 && <FirstStep  setEmail={setEmail} />}
                    {step === 2 && <SecondStep setToken={setToken} />}
                    {step === 3 && <ThirdStep setPassword={setPassword} setConfirmationPassword={setConfirmationPassword}/>}

                    <Button
                        mb={["1rem", "1rem", "1.5rem"]}
                        w={"100%"}
                        variant={"blue-800"}
                        onClick={handleNextStep}
                    >
                        Enviar
                    </Button>

                    <HStack
                        justifyContent={"center"}
                        mb={["1rem", "1rem", "1.5rem"]}
                    >
                        <Text
                            textAlign={"center"}
                            fontWeight={500}
                            fontSize={["sm", "sm", "md"]}
                        >
                            Lembrou sua senha?
                        </Text>
                        <Text
                            color={"blue.400"}
                            cursor={"pointer"}
                            fontSize={["sm", "sm", "md"]}
                            _hover={{ textDecoration: "underline" }}
                            onClick={() => router.push("/auth/login")}
                        >
                            Entre aqui
                        </Text>
                    </HStack>
                </Box>
            </AuthContainer>
            {/* <VLibras forceOnload={true} /> */}
        </>
    );
};

export default Login;
