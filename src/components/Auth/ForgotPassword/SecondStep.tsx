import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface ISecondStepProps {
    setToken: (token: number) => void;
}

export default function SecondStep(props: ISecondStepProps) {
    return (
        <>
            <FormControl mb={"1rem"}>
                <FormLabel fontWeight={500}>Token</FormLabel>
                <Input type="text" placeholder="token" />
            </FormControl>
        </>
    );
}
