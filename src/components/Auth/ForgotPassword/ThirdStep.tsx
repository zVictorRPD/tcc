import React, { useState } from "react";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IForgotCamps, IForgotCampsValidation } from "../../../interfaces/auth/auth.interface";

interface IThirdStepProps {
    thirdStepProps: {
        formFields: IForgotCamps;
        setFormFields: React.Dispatch<React.SetStateAction<IForgotCamps>>;
        forgotCampsValidation: IForgotCampsValidation;
    }
}

export default function ThirdStep(props: IThirdStepProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
    const { formFields, setFormFields, forgotCampsValidation } = props.thirdStepProps;
    return (
        <>
            <FormControl mb={["1rem", "1rem", "1.5rem"]}  isInvalid={!forgotCampsValidation.password}>
                <FormLabel fontWeight={500}>Nova senha</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        onChange={(e) => setFormFields({...formFields, password: e.target.value})}
                        value={formFields.password}
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
                {!forgotCampsValidation.password && (
                    <FormErrorMessage>Senha inválida.</FormErrorMessage>
                )}
            </FormControl>
            <FormControl mb={["1rem", "1rem", "1.5rem"]}  isInvalid={!forgotCampsValidation.confirmationPassword}>
                <FormLabel fontWeight={500}>Confirme sua nova senha</FormLabel>
                <InputGroup size="md">
                    <Input
                        type={showConfirmationPassword ? "text" : "password"}
                        placeholder="********"
                        onChange={(e) => setFormFields({...formFields, confirmationPassword: e.target.value})}
                        value={formFields.confirmationPassword}
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
                {!forgotCampsValidation.token && (
                    <FormErrorMessage>A senha de confirmação está diferente da senha.</FormErrorMessage>
                )}
            </FormControl>
        </>
    );
}
