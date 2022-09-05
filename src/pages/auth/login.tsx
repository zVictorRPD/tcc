import React, { useState } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import VLibras from "@djpfs/react-vlibras";
import AuthContainer from "../../components/Auth/AuthContainer";
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login: NextPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
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
                    <FormControl mb={"1rem"}>
                        <FormLabel fontWeight={500}>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="examplemail@example.com"
                        />
                    </FormControl>
                    <FormControl mb={["1rem", "1rem", "1.5rem"]}>
                        <FormLabel fontWeight={500}>Senha</FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                            />
                            <InputRightElement width="3rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    variant='ghost'
                                    onClick={() => {setShowPassword(!showPassword)}}
                                >
                                    {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <HStack
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                        mb={["1rem", "1rem", "1.5rem"]}
                    >
                        <Checkbox defaultChecked>
                            <Text fontWeight={500}> Me mantenha conectado</Text>
                        </Checkbox>
                        <Text
                            color={"blue.400"}
                            cursor={"pointer"}
                            _hover={{ textDecoration: "underline" }}
                            onClick={() => router.push("/auth/signup")}
                            style={{ marginLeft: "0" }}
                        >
                            Recuperar senha
                        </Text>
                    </HStack>
                    <Button
                        mb={["1rem", "1rem", "1.5rem"]}
                        w={"100%"}
                        variant={"blue-800"}
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
