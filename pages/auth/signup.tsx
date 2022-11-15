import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import AuthContainer from "../../src/components/Auth/AuthContainer";
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from "react-icons/ai";
import ConfirmationModal from "../../src/components/Auth/Signup/ConfirmationModal";
import {
    ISignupCampsValidation,
    ISignupCamps,
} from "../../src/interfaces/auth/auth.interface";
import {
    validateConfirmationPassword,
    validateEmail,
    validateFile,
    validateFileSize,
    validateName,
    validatePassword,
} from "../../src/functions/validation";
import { api } from "../../src/services/api";

const SignUp: NextPage = () => {
    const router = useRouter();
    const toast = useToast();
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const { email_home } = router.query;
    const [onLoading, setOnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] =
        useState(false);
    const [userImage, setUserImage] = useState<string>("");
    const [clockTimer, setClockTimer] = useState<NodeJS.Timer>();
    const [signupCampsValidation, setSignupCampsValidation] =
        useState<ISignupCampsValidation>({
            name: true,
            email: true,
            password: true,
            confirmationPassword: true,
        } as ISignupCampsValidation);

    const [formCamps, setFormCamps] = useState<ISignupCamps>({
        name: "",
        email: "",
        password: "",
        confirmationPassword: "",
        avatar: null,
    });

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
        const isValidFile = validateFile(fileObj);
        if (!isValidFile) {
            toast({
                position: "top-right",
                title: "Tipo de arquivo não suportado!",
                status: "error",
                isClosable: true,
            });
            return;
        }
        const isValidSize = validateFileSize(fileObj);
        if (!isValidSize) {
            toast({
                position: "top-right",
                title: "Arquivo muito extenso! (máximo 2MB)",
                status: "error",
                isClosable: true,
            });
            return;
        }

        setFormCamps({ ...formCamps, avatar: fileObj });
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
            setFormCamps({ ...formCamps, email: email_home });
        }
    }, [email_home]);

    const handleSubmit = async () => {
        setOnLoading(true);
        const formCampsValidation = {
            email: validateEmail(formCamps.email as string),
            password: validatePassword(formCamps.password),
            confirmationPassword: validateConfirmationPassword(
                formCamps.password,
                formCamps.confirmationPassword
            ),
            name: validateName(formCamps.name),
        };
        setSignupCampsValidation(formCampsValidation);
        if (!Object.values(formCampsValidation).includes(false)) {
            const response = await api.post("/user/signup", {
                ...formCamps,
                avatar: userImage,
            });

            if (response.data.code == "200") {
                toast({
                    position: "top-right",
                    title: response.data.message,
                    status: "success",
                    isClosable: true,
                });
                // router.push("/auth/login");
                modalTimeout();
                onOpen();
            } else {
                toast({
                    position: "top-right",
                    title: response.data.message,
                    status: "error",
                    isClosable: true,
                });
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
            email: formCamps.email,
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
            if(response.data.code === "401") router.push("/auth/login");
            
        }
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
                    <FormControl
                        mb={"1rem"}
                        isInvalid={!signupCampsValidation.name}
                    >
                        <FormLabel fontWeight={500}>Nome</FormLabel>
                        <Input
                            type="text"
                            placeholder="Victor Martins"
                            value={formCamps.name}
                            onChange={(e) =>
                                setFormCamps({
                                    ...formCamps,
                                    name: e.target.value,
                                })
                            }
                        />
                        {!signupCampsValidation.name && (
                            <FormErrorMessage>
                                Insira um nome valido.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                        mb={"1rem"}
                        isInvalid={!signupCampsValidation.email}
                    >
                        <FormLabel fontWeight={500}>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="examplemail@example.com"
                            value={formCamps.email}
                            onChange={(e) =>
                                setFormCamps({
                                    ...formCamps,
                                    email: e.target.value,
                                })
                            }
                        />
                        {!signupCampsValidation.email && (
                            <FormErrorMessage>
                                Insira um email valido.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                        mb={["1rem", "1rem", "1.5rem"]}
                        isInvalid={!signupCampsValidation.password}
                    >
                        <FormLabel fontWeight={500}>Senha</FormLabel>
                        <InputGroup size="md">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                value={formCamps.password}
                                onChange={(e) =>
                                    setFormCamps({
                                        ...formCamps,
                                        password: e.target.value,
                                    })
                                }
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
                        {!signupCampsValidation.password && (
                            <FormErrorMessage>
                                Insira uma senha valida.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                        mb={["1rem", "1rem", "1.5rem"]}
                        isInvalid={!signupCampsValidation.confirmationPassword}
                    >
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
                                value={formCamps.confirmationPassword}
                                onChange={(e) =>
                                    setFormCamps({
                                        ...formCamps,
                                        confirmationPassword: e.target.value,
                                    })
                                }
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
                        {!signupCampsValidation.confirmationPassword && (
                            <FormErrorMessage>
                                A senha de confirmação está diferente da senha.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <Button
                        mb={["1rem", "1rem", "1.5rem"]}
                        w={"100%"}
                        variant={"blue-800"}
                        onClick={handleSubmit}
                        isLoading={onLoading}
                        loadingText={"Criando conta..."}
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
                email={formCamps.email.toString()}
            />
            {/* <VLibras forceOnload={true} /> */}
        </>
    );
};

export default SignUp;
