import React from "react";
import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    NumberInput,
    NumberInputField,
} from "@chakra-ui/react";
import {
    IForgotCamps,
    IForgotCampsValidation,
} from "../../../interfaces/auth/auth.interface";

interface ISecondStepProps {
    secondStepProps: {
        formFields: IForgotCamps;
        setFormFields: React.Dispatch<React.SetStateAction<IForgotCamps>>;
        forgotCampsValidation: IForgotCampsValidation;
    };
}

export default function SecondStep(props: ISecondStepProps) {
    const { formFields, setFormFields, forgotCampsValidation } =
        props.secondStepProps;
    return (
        <>
            <FormControl mb={"1rem"} isInvalid={!forgotCampsValidation.token}>
                <FormLabel fontWeight={500}>Token</FormLabel>
                {/* <Input
                    type="number"
                    onChange={(e) => setToken(parseInt(e.target.value))}
                    placeholder="token"
                /> */}
                <NumberInput
                    onChange={(valueString) =>
                        setFormFields({
                            ...formFields,
                            token: valueString,
                        })
                    }
                    value={formFields.token}
                    min={0}
                >
                    <NumberInputField />
                </NumberInput>
                {!forgotCampsValidation.token && (
                    <FormErrorMessage>Insira um token valido.</FormErrorMessage>
                )}
            </FormControl>
        </>
    );
}
