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
    const [onLoading, setOnLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [forgotCampsValidation, setForgotCampsValidation] =
        useState<IForgotCampsValidation>({
            email: true,
            token: true,
            password: true,
            confirmationPassword: true,
        } as IForgotCampsValidation);

    const [formFields, setFormFields] = useState<IForgotCamps>({
        email: "",
        token: "",
        password: "",
        confirmationPassword: "",
    });

    const handleNextStep = async () => {
        setOnLoading(true);
        if (step === 1) {
            if (validateEmail(formFields.email)) {
                const emailExist = await api.post(
                    "/forgotPassword/generateToken",
                    { email: formFields.email }
                );
                if (emailExist.data.code === 200) {
                    toast({
                        position: "top-right",
                        title: "Um token foi gerado e enviado para seu email!",
                        status: "success",
                        isClosable: true,
                    });
                    setStep(2);
                } else if (emailExist.data.code === 404) {
                    toast({
                        position: "top-right",
                        title: "Esse email não está cadastrado!",
                        status: "error",
                        isClosable: true,
                    });
                } else if (emailExist.data.code === 500) {
                    toast({
                        position: "top-right",
                        title: "Erro ao gerar o token!",
                        status: "error",
                        isClosable: true,
                    });
                }
            } else {
                setForgotCampsValidation({
                    ...forgotCampsValidation,
                    email: false,
                });
            }
        } else if (step === 2) {
            if (formFields.token.toString().length === 8) {
                const tokenExist = await api.post(
                    "/forgotPassword/validateToken",
                    { email: formFields.email, token: formFields.token.toString() }
                );
                if (tokenExist.data.code === 200) {
                    toast({
                        position: "top-right",
                        title: "Token validado com sucesso!",
                        status: "success",
                        isClosable: true,
                    });
                    setStep(3);
                } else if (tokenExist.data.code === 403) {
                    toast({
                        position: "top-right",
                        title: "Token expirado!",
                        status: "error",
                        isClosable: true,
                    });
                } else if (tokenExist.data.code === 404) {
                    toast({
                        position: "top-right",
                        title: "Token inválido!",
                        status: "error",
                        isClosable: true,
                    });
                }
            } else {
                setForgotCampsValidation({
                    ...forgotCampsValidation,
                    token: false,
                });
            }
        } else {
            if (
                validatePassword(formFields.password) &&
                validateConfirmationPassword(formFields.password, formFields.confirmationPassword)
            ) {
                const newPassword = await api.post(
                    "/forgotPassword/changePassword",
                    {
                        email: formFields.email,
                        password: formFields.password,
                        token: formFields.token.toString(),
                    }
                );
                if (newPassword.data.code === 200) {
                    toast({
                        position: "top-right",
                        title: "Senha alterada com sucesso!",
                        status: "success",
                        isClosable: true,
                    });
                    router.push("/auth/login");
                } else if (newPassword.data.code === 500) {
                    toast({
                        position: "top-right",
                        title: "Erro ao alterar a senha!",
                        status: "error",
                        isClosable: true,
                    });
                }
            } else {
                setForgotCampsValidation({
                    ...forgotCampsValidation,
                    password: false,
                    confirmationPassword: false,
                });
            }
        }
        setOnLoading(false);
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
                                formFields,
                                setFormFields,
                                forgotCampsValidation,
                            }}
                        />
                    )}
                    {step === 2 && (
                        <SecondStep
                            secondStepProps={{
                                formFields,
                                setFormFields,
                                forgotCampsValidation,
                            }}
                        />
                    )}
                    {step === 3 && (
                        <ThirdStep
                            thirdStepProps={{
                                formFields,
                                setFormFields,
                                forgotCampsValidation,
                            }}
                        />
                    )}

                    <Button
                        mb={["1rem", "1rem", "1.5rem"]}
                        w={"100%"}
                        variant={"blue-800"}
                        onClick={handleNextStep}
                        isLoading={onLoading}
                        loadingText="Enviando"
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
