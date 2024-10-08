import React from "react";
import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";
import {
    IForgotCamps,
    IForgotCampsValidation,
} from "../../../interfaces/auth/auth.interface";

interface IFirstStepProps {
    firstStepProps: {
        formFields: IForgotCamps;
        setFormFields: React.Dispatch<React.SetStateAction<IForgotCamps>>;
        forgotCampsValidation: IForgotCampsValidation;
    }
}

export default function FirstStep(props: IFirstStepProps) {
    const { formFields, setFormFields, forgotCampsValidation } = props.firstStepProps;

    return (
        <>
            <FormControl mb={"1rem"} isInvalid={!forgotCampsValidation.email}>
                <FormLabel fontWeight={500}>Email</FormLabel>
                <Input
                    type="email"
                    placeholder="examplemail@example.com"
                    value={formFields.email}
                    onChange={(e) =>
                        setFormFields({
                            ...formFields,
                            email: e.target.value,
                        })
                    }
                />
                {!forgotCampsValidation.email && (
                    <FormErrorMessage>Insira um email valido.</FormErrorMessage>
                )}
            </FormControl>
        </>
    );
}
