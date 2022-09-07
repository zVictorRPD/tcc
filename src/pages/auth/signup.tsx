import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import VLibras from "@djpfs/react-vlibras";
import Head from "next/head";
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import AuthContainer from "../../components/Auth/AuthContainer";
import {
    AiOutlineClose,
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import ConfirmationModal from "../../components/Auth/Signup/ConfirmationModal";
const SignUp: NextPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string | string[]>("");
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const { email_home } = router.query;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] =
        useState(false);
    const [userImage, setUserImage] = useState<string>("");
    const [clockTimer, setClockTimer] = useState<NodeJS.Timer>();

    /*modal */
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [timeout, setTimeout] = React.useState(30);

    const pencilPosition = {
        top: "0",
        right: "0.5rem",
        cursor: "pointer",
    };
    const closePosition = {
        bottom: "0rem",
        right: "0.5rem",
        cursor: "pointer",
    };
    const handleFileClick = () => {
        if (inputRef.current) inputRef.current.click();
    };
    const handleFileChange = (event: any) => {
        const fileObj = event.target.files && event.target.files[0];
        if (fileObj) {
            var reader = new FileReader();
            reader.onload = function (e: any) {
                setUserImage(e.target.result);
            };
            reader.readAsDataURL(fileObj);
        }
    };
    useEffect(() => {
        if (email_home) {
            setEmail(email_home);
        }
    }, [email_home]);

    const handleSubmit = () => {
        
        modalTimeout();
        onOpen();
    };

    const modalTimeout = () => {
        setTimeout(30);
        let seconds = 30;
        if(clockTimer) clearInterval(clockTimer);

        setClockTimer(setInterval(() => {
            setTimeout((prev) => prev - 1);
            seconds--;
            if (seconds == 0) {
                clearInterval(clockTimer);
            }
        }, 1000));
        
        
    };

    const resendEmail = () => {
        modalTimeout();
    };

    return (
        <>
            <Head>
                <title>Cadastro</title>
            </Head>
            <AuthContainer>
                <Box p={[".5rem", ".5rem", "1rem"]}>
                    <Text
                        textAlign={"center"}
                        fontSize={["3xl", "4xl", "5xl"]}
                        mb={["1rem", "1rem", "1.5rem"]}
                    >
                        Crie sua conta
                    </Text>
                    <HStack justifyContent={"center"}>
                        <Box position={"relative"}>
                            <Avatar
                                size={"xl"}
                                onClick={handleFileClick}
                                src={userImage}
                                cursor={"pointer"}
                            />

                            <Stack
                                bg={"blue.800"}
                                w={"1.5rem"}
                                h={"1.5rem"}
                                justifyContent={"center"}
                                alignItems={"center"}
                                borderRadius={"full"}
                                position={"absolute"}
                                style={pencilPosition}
                                onClick={handleFileClick}
                            >
                                <FiEdit2
                                    color={"#EDF2F7"}
                                    fontSize={".875rem"}
                                />
                            </Stack>
                            {userImage && (
                                <Stack
                                    bg={"red.500"}
                                    w={"1.5rem"}
                                    h={"1.5rem"}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    borderRadius={"full"}
                                    position={"absolute"}
                                    style={closePosition}
                                    onClick={() => setUserImage("")}
                                >
                                    <IoMdClose
                                        color={"#EDF2F7"}
                                        fontSize={"0.938rem"}
                                    />
                                </Stack>
                            )}
                        </Box>
                        <input
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange}
                            hidden
                        />
                    </HStack>
                    <FormControl mb={"1rem"}>
                        <FormLabel fontWeight={500}>Nome</FormLabel>
                        <Input type="text" placeholder="Victor Martins" />
                    </FormControl>
                    <FormControl mb={"1rem"}>
                        <FormLabel fontWeight={500}>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="examplemail@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    </FormControl>
                    <FormControl mb={["1rem", "1rem", "1.5rem"]}>
                        <FormLabel fontWeight={500}>
                            Confirme sua senha
                        </FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={
                                    showConfirmationPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="********"
                            />
                            <InputRightElement width="3rem">
                                <Button
                                    h="1.75rem"
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                        setShowConfirmationPassword(
                                            !showConfirmationPassword
                                        );
                                    }}
                                >
                                    {showConfirmationPassword ? (
                                        <AiOutlineEyeInvisible />
                                    ) : (
                                        <AiOutlineEye />
                                    )}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Button
                        mb={["1rem", "1rem", "1.5rem"]}
                        w={"100%"}
                        variant={"blue-800"}
                        onClick={handleSubmit}
                    >
                        Criar conta
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
                            Já possui conta?
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
            <ConfirmationModal
                modalProps={{ isOpen, onClose, timeout, resendEmail }}
            />
            {/* <VLibras forceOnload={true} /> */}
        </>
    );
};

export default SignUp;
