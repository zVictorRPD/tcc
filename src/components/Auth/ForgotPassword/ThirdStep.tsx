import React, { useState } from "react";
import {
    Box,
    HStack,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface IThirdStepProps {
    setPassword: (password: string) => void;
    setConfirmationPassword: (confirmationPassword: string) => void;
}

export default function ThirdStep(props: IThirdStepProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
    return (
        <>
            <FormControl mb={["1rem", "1rem", "1.5rem"]}>
                <FormLabel fontWeight={500}>Nova senha</FormLabel>
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
                <FormLabel fontWeight={500}>Confirme sua nova senha</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={showConfirmationPassword ? "text" : "password"}
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
        </>
    );
}
