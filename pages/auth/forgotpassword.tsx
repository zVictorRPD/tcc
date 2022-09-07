import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import VLibras from "@djpfs/react-vlibras";
import AuthContainer from "../../src/components/Auth/AuthContainer";
import { Box, Button, HStack, Text, useToast } from "@chakra-ui/react";
import FirstStep from "../../src/components/Auth/ForgotPassword/FirstStep";
import SecondStep from "../../src/components/Auth/ForgotPassword/SecondStep";
import ThirdStep from "../../src/components/Auth/ForgotPassword/ThirdStep";
import { api } from "../../src/services/api";
import {
    validateEmail,
    validateConfirmationPassword,
    validatePassword,
} from "../../src/functions/validation";
import {
    IForgotCamps,
    IForgotCampsValidation,
} from "../../src/interfaces/auth/auth.interface";

const Login: NextPage = () => {
    const router = useRouter();
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [token, setToken] = useState<number>(0);
    const [password, setPassword] = useState<string>("false");
    const [confirmationPassword, setConfirmationPassword] =
        useState<string>("false");

    const [forgotCampsValidation, setForgotCampsValidation] =
        useState<IForgotCampsValidation>({
            email: true,
            token: true,
            password: true,
            confirmationPassword: true,
        } as IForgotCampsValidation);

    const [formCamps, setFormCamps] = useState<IForgotCamps>({
        email: "",
        token: "",
        password: "",
        confirmationPassword: "",
    });

    const handleNextStep = async () => {
        
        if (step === 1) {
            if (validateEmail(formCamps.email)) {
                const emailExist = await api.post('/forgotPassword/generateToken', {email: formCamps.email});
                if (emailExist.data.code === 200) {
                    toast({
                        position: "top-right",
                        title: "Um token foi gerado e enviado para seu email!",
                        status: "success",
                        isClosable: true,
                    });
                    console.log(step);
                    setStep(2);
                } else if(emailExist.data.code === 404) {
                    toast({
                        position: "top-right",
                        title: "Esse email não está cadastrado!",
                        status: "error",
                        isClosable: true,
                    });
                }else if(emailExist.data.code === 500) {
                    toast({
                        position: "top-right",
                        title: "Erro ao gerar o token!",
                        status: "error",
                        isClosable: true,
                    });
                }
            }else{
                setForgotCampsValidation({
                    ...forgotCampsValidation,
                    email: false,
                });
            }
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

                    {step === 1 && (
                        <FirstStep
                            firstStepProps={{
                                formCamps,
                                setFormCamps,
                                forgotCampsValidation,
                            }}
                        />
                    )}
                    {step === 2 && <SecondStep setToken={setToken} />}
                    {step === 3 && (
                        <ThirdStep
                            setPassword={setPassword}
                            setConfirmationPassword={setConfirmationPassword}
                        />
                    )}

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
