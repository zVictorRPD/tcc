import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { Avatar, Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, InputGroup, InputRightElement, Stack, Text, useToast } from "@chakra-ui/react";
import { FiEdit2 } from "react-icons/fi";
import {
    validateFile,
    validateFileSize,
    validateName,
    validatePassword,
    validateConfirmationPassword,
} from "../../src/functions/validation";
import { api } from "../../src/services/api";
import { IoMdClose } from "react-icons/io";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import { getUserData } from "../../src/functions/userData";

const EditProfile: NextPage = () => {
    const { status, data } = useSession();
    const toast = useToast();
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [onLoading, setOnLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] =
        useState(false);
    const [userImage, setUserImage] = useState<string>("");
    const [changeImage, setChangeImage] = useState(false);
    const [editCampsValidation, setEditCampsValidation] =
        useState<IEditProfileValidation>({
            avatar: true,
            name: true,
            password: true,
            confirmationPassword: true,
        } as IEditProfileValidation);

    const [formCamps, setFormCamps] = useState<IEditProfile>({
        name: "",
        password: "",
        confirmationPassword: "",
        avatar: null,
    });

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
        setChangeImage(true);
        if (fileObj) {
            var reader = new FileReader();
            reader.onload = function (e: any) {
                setUserImage(e.target.result);
            };
            reader.readAsDataURL(fileObj);
        }
    };

    const handleSubmit = async () => {
        setOnLoading(true);
        if (formCamps.name !== data?.user?.name) {
            const isValidName = validateName(formCamps.name);
            setEditCampsValidation({
                ...editCampsValidation,
                name: isValidName,
            });
            if (!isValidName) {
                setOnLoading(false);
                return;
            }
        }
        if (formCamps.password !== "") {
            const isValidPassword = validatePassword(formCamps.password);
            const isValidConfirmationPassword = validateConfirmationPassword(formCamps.password, formCamps.confirmationPassword);
            setEditCampsValidation({
                ...editCampsValidation,
                password: isValidPassword,
                confirmationPassword: isValidConfirmationPassword,
            });
            if (!isValidPassword || !isValidConfirmationPassword) {
                setOnLoading(false);
                return;
            }
        }
        if (formCamps.name === data?.user?.name && formCamps.password === "" && changeImage === false) {
            toast({
                position: "top-right",
                title: "Nenhum campo foi alterado!",
                status: "error",
                isClosable: true,
            });
            setOnLoading(false);
            return;
        }

        const response = await api.post("/user/editUser", {
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
            signIn();
        } else {
            toast({
                position: "top-right",
                title: response.data.message,
                status: "error",
                isClosable: true,
            });
        }
        setOnLoading(false);
    };

    const getData = async () => {
        const { name, avatar } = await getUserData();
        setUserImage(avatar);
        setFormCamps({
            ...formCamps,
            name: name,
        })
    }

    useEffect(() => {
        if (
            data?.user?.name !== undefined &&
            data?.user?.name
        ) {
            setFormCamps({
                ...formCamps,
                name: data.user.name,
            });
            getData();
        }
    }, [data]);

    return (
        <>
            <Stack
                h={'100%'}
                w={'100%'}
                justifyContent={'center'}
                alignItems={'center'}
                flexDirection={'column'}
            >
                <Box
                    mt={'2rem'}
                    bg={'#fff'}
                    w={'100%'}
                    maxW={'500px'}
                    p={["1rem", "1rem", "1.5rem"]}
                    borderRadius={'lg'}
                >
                    <Text
                        textAlign={"center"}
                        fontSize={["xl", "2xl", "3xl"]}
                        mb={["1rem", "1rem", "1.5rem"]}
                    >
                        Edite sua conta
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
                        isInvalid={!editCampsValidation.name}
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
                        {!editCampsValidation.name && (
                            <FormErrorMessage>
                                Insira um nome valido.
                            </FormErrorMessage>
                        )}
                    </FormControl>

                    <FormControl mb={"1rem"}>
                        <FormLabel fontWeight={500}>Email</FormLabel>
                        <Input
                            type="email"
                            placeholder="examplemail@example.com"
                            value={data?.user?.email || ''}
                            disabled
                        />
                    </FormControl>
                    <FormControl
                        mb={["1rem", "1rem", "1.5rem"]}
                        isInvalid={!editCampsValidation.password}
                    >
                        <FormLabel fontWeight={500}>Nova senha</FormLabel>
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
                        {!editCampsValidation.password && (
                            <FormErrorMessage>
                                A senha precisa conter pelo menos 8 caracteres.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl
                        mb={["1rem", "1rem", "1.5rem"]}
                        isInvalid={!editCampsValidation.confirmationPassword}
                    >
                        <FormLabel fontWeight={500}>
                            Confirme sua nova senha
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
                        {!editCampsValidation.confirmationPassword && (
                            <FormErrorMessage>
                                A senha de confirmação está diferente da senha.
                            </FormErrorMessage>
                        )}
                    </FormControl>
                    <Button
                        w={"100%"}
                        variant={"blue-800"}
                        onClick={handleSubmit}
                        isLoading={onLoading}
                        loadingText={"Editando conta..."}
                    >
                        Editar conta
                    </Button>
                </Box>
            </Stack>
        </>
    );
};

export default EditProfile;
