import { Flex, GridItem, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface IDateCardProps {
    date: ICalendarAcademicDate;
}

function DateCard(props: IDateCardProps) {
    const bg = useColorModeValue("white", "gray.900");
    const dateObj = props.date;
    const getFormatedDate = () => {
        const day = dateObj.date.getDate();
        const month = dateObj.date.toLocaleString("default", { month: "long" });
        return `${day} de ${month}`;
    };
    const getFormatedTime = () => {
        if(dateObj.hoursLeft < 0) {
            const days = (dateObj.daysLeft + 1) * -1;
            const hours = dateObj.hoursLeft * -1;
            return `${days} dias e ${hours} horas`
        } 

        return `${dateObj.daysLeft} dias e ${dateObj.hoursLeft} horas`
    }
    return (
        <GridItem
            bg={bg}
            p={{
                base: ".75rem",
                md: "1rem",
            }}
            borderRadius={"8px"}
            boxShadow={"md"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Text textAlign={"center"} fontSize={"1.5rem"}>
                {getFormatedDate()}
            </Text>
            <Text textAlign={"center"} fontWeight={"bold"} fontSize={"2rem"}>
                {props.date.name}
            </Text>
            <Text textAlign={"center"} fontSize="1.75rem">{dateObj.hoursLeft < 0 ? 'Foi há' : 'Restam'}</Text>
            <Flex justifyContent={'center'} alignItems={'start'} gap={'1rem'}>
                <Flex flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                    <Text textAlign={"center"} fontSize="1.75rem" fontWeight={"light"}>
                        {getFormatedTime()}
                    </Text>
                </Flex>
            </Flex>
        </GridItem>
    );
}

export default DateCard;
