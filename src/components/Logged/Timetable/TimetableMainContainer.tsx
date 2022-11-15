import { Flex, Image, Stack } from '@chakra-ui/react'
import React, { useContext } from 'react'
import SubjectGrid from './SubjectGrid'
import { TimetableContext } from './TimetableContext'
import { timeTableSchedule } from './timeTableObject'
import WeekdaysGrid from './WeekdaysGrid'

function TimetableMainContainer() {
    const { onLoad } = useContext(TimetableContext);
    return (
        <>
            {!onLoad ? (
                <Stack 
                p={{ base: '.5rem', md: '2rem' }} 
                mx={{ base: '.5rem', md: '0' }} 
                h={'100%'}
                overflow={'auto'}
                >
                    <WeekdaysGrid />
                    {timeTableSchedule.map((timeTable, index) => {
                        return <SubjectGrid key={index} type={timeTable} index={index} />
                    })}
                </Stack>
            ) : (
                <Flex
                    h={'72vh'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Image src="/assets/images/loading-spinner.svg" w={'200px'} h={'200px'} alt="Carregando..." margin={'0 auto'} />
                </Flex>
            )
            }
        </>


    )
}

export default TimetableMainContainer