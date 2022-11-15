import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import type { NextPage } from "next";
import Head from "next/head";
import AuthContainer from "../../src/components/Auth/AuthContainer";
import ConfirmationModal from "../../src/components/Auth/Signup/ConfirmationModal";
import {
    validateEmail,
    validatePassword,
} from "../../src/functions/validation";
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ILoginCampsValidation } from "../../src/interfaces/auth/auth.interface";
import { api } from "../../src/services/api";

const Login: NextPage = () => {
    const router = useRouter();
    const callbackUrl = useRouter().query;
    const toast = useToast();
    const [timeout, setTimeout] = React.useState(0);
    const [clockTimer, setClockTimer] = useState<NodeJS.Timer>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [onLoading, setOnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginCampsValidation, setLoginCampsValidation] =
        useState<ILoginCampsValidation>({
            email: true,
            password: true,
        } as ILoginCampsValidation);

    //função para lidar com a verificação de email
    const handleVerifyEmail = (urlMessage: string | string[]) => {
        
        const url = urlMessage.toString();
        if(!url.includes('?') && !url.includes('=')) return;
        const message = url.split("?")[1].split("=")[1]

        if (message === "invalidlink") {
            toast({
                position: "top-right",
                title: "Link inválido",
                description: "O link que você tentou acessar não é válido.",
                status: "error",
                isClosable: true,
            });
        } else if (message === "alreadyverified") {
            toast({
                position: "top-right",
                title: "Email já verificado",
                description:
                    "O email que você tentou verificar já foi verificado.",
                status: "error",
                isClosable: true,
            });
        } else if (message === "verified") {
            toast({
                position: "top-right",
                title: "Email verificado",
                description: "O email foi verificado com sucesso.",
                status: "success",
                isClosable: true,
            });
        }
    };

    useEffect(() => {
        //função para lidar com a verificação de email
        if (callbackUrl.callbackUrl !== undefined) {
            handleVerifyEmail(callbackUrl.callbackUrl);
        }
    }, [callbackUrl]);

    const handleLogin = async () => {
        setOnLoading(true);
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        setLoginCampsValidation({
            email: emailValidation,
            password: passwordValidation,
        });

        if (emailValidation && passwordValidation) {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (response && response.status === 200) {
                toast({
                    position: "top-right",
                    title: "Usuário logado com sucesso!",
                    status: "success",
                    isClosable: true,
                });
                router.push("/ambiente-logado/dashboard");
            } else {
                toast({
                    position: "top-right",
                    title: response?.error,
                    status: "error",
                    isClosable: true,
                });
                if (response?.error === "Email não verificado") {
                    onOpen();
                }
            }
        }

        setOnLoading(false);
    };

    const modalTimeout = () => {
        setTimeout(30);
        let seconds = 30;
        if (clockTimer) clearInterval(clockTimer);

        setClockTimer(
            setInterval(() => {
                setTimeout((prev) => prev - 1);
                seconds--;
                if (seconds == 0) {
                    clearInterval(clockTimer);
                }
            }, 1000)
        );
    };

    const resendEmail = async () => {
        modalTimeout();
        const response = await api.post("/user/resendVerification", {
            email: email,
        });
        if (response.data.code === "200") {
            toast({
                position: "top-right",
                title: response.data.message,
                status: "success",
                isClosable: true,
            });
        } else {
            toast({
                position: "top-right",
                title: response.data.message,
                status: "error",
                isClosable: true,
            });
            if (response.data.code === "401") router.push("/auth/login");
        }
    };
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <AuthContainer>
                <Box p={[".5rem", ".5rem", "1rem"]}>
                    <Text
                        textAlign={"center"}
                        fontSize={"5xl"}
                        mb={["1rem", "1rem", "1.5rem"]}
                    >
                        Faça login
                    </Text>
                    <FormControl
                        mb={"1rem"}
                        isInvalid={!loginCampsValidation.email}
                    >
                        <FormLabel fontWeight={500}>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="examplemail@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {!loginCampsValidation.email && (
                            <FormErrorMessage>
                                Insira um email valido.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                        mb={["1rem", "1rem", "1.5rem"]}
                        isInvalid={!loginCampsValidation.password}
                    >
                        <FormLabel fontWeight={500}>Senha</FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <InputRightElement width="3rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        setShowPassword(!showPassword);
                                    }}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible />
                                    ) : (
                                        <AiOutlineEye />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {!loginCampsValidation.password && (
                            <FormErrorMessage>
                                Insira uma senha com 8 ou mais caracteres.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <HStack
                        justifyContent={"flex-end"}
                        flexWrap={"wrap"}
                        mb={["1rem", "1rem", "1.5rem"]}
                    >
                        <Text
                            color={"blue.400"}
                            cursor={"pointer"}
                            _hover={{ textDecoration: "underline" }}
                            onClick={() => router.push("/auth/forgotpassword")}
                            style={{ marginLeft: "0" }}
                        >
                            Recuperar senha
                        </Text>
                    </HStack>
                    <Button
                        mb={["1rem", "1rem", "1.5rem"]}
                        w={"100%"}
                        variant={"blue-800"}
                        onClick={handleLogin}
                        isLoading={onLoading}
                        loadingText="Enviando"
                    >
                        Entrar
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
                            Não tem uma conta?
                        </Text>
                        <Text
                            color={"blue.400"}
                            cursor={"pointer"}
                            fontSize={["sm", "sm", "md"]}
                            _hover={{ textDecoration: "underline" }}
                            onClick={() => router.push("/auth/signup")}
                        >
                            Crie a sua aqui
                        </Text>
                    </HStack>
                </Box>
            </AuthContainer>
            <ConfirmationModal
                modalProps={{ isOpen, onClose, timeout, resendEmail }}
                email={email}
            />
            {/* <VLibras forceOnload={true} /> */}
        </>
    );
};

export default Login;
