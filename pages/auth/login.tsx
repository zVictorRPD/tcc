import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import type { NextPage } from "next";
import Head from "next/head";
import VLibras from "@djpfs/react-vlibras";
import AuthContainer from "../../src/components/Auth/AuthContainer";
import { validateEmail, validatePassword } from "../../src/functions/validation";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useToast,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { api } from "../../src/services/api";
import { sign } from "crypto";

interface ILoginCamps {
    email: boolean;
    password: boolean;
}

const Login: NextPage = () => {
    const toast = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loginCamps, setLoginCamps] = useState<ILoginCamps>({
        email: true,
        password: true,
    } as ILoginCamps);
    const router = useRouter();

    const handleLogin = async () => {
        const emailValidation = validateEmail(email);
        const passwordValidation = validatePassword(password);
        setLoginCamps({
            email: emailValidation,
            password: passwordValidation,
        });

        if (emailValidation && passwordValidation) {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
                // remember,
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
                    title: "Email ou senha incorretos!",
                    status: "error",
                    isClosable: true,
                });
            }
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
                    <FormControl mb={"1rem"} isInvalid={!loginCamps.email}>
                        <FormLabel fontWeight={500}>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="examplemail@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {!loginCamps.email && (
                            <FormErrorMessage>
                                Insira um email valido.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                        mb={["1rem", "1rem", "1.5rem"]}
                        isInvalid={!loginCamps.password}
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
                        {!loginCamps.password && (
                            <FormErrorMessage>
                                Insira uma senha com 8 ou mais caracteres.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <HStack
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                        mb={["1rem", "1rem", "1.5rem"]}
                    >
                        <Checkbox
                            isChecked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                        >
                            <Text fontWeight={500}> Me mantenha conectado</Text>
                        </Checkbox>
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
            {/* <VLibras forceOnload={true} /> */}
        </>
    );
};

export default Login;
