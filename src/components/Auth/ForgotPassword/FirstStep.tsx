import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface IFirstStepProps {
    setEmail: (email:string) => void;
}

export default function FirstStep(props: IFirstStepProps) {
    return (
        <>
            <FormControl mb={"1rem"}>
                <FormLabel fontWeight={500}>Email</FormLabel>
                <Input type="email" placeholder="examplemail@example.com" />
            </FormControl>
        </>
    );
}
