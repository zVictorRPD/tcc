import { Grid, GridItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { weekDays } from './timeTableObject'


function WeekdaysGrid() {
    return (
        <Grid templateColumns='62px repeat(6, 1fr)' gap={3}>
            <GridItem w='100%'>
                <VStack justifyContent={'center'} h={'100%'}>
                    <Text fontWeight={600}></Text>
                </VStack>
            </GridItem>
            {
                weekDays.map((day, index) => {
                    return (
                        <GridItem
                            key={index}
                            maxW='100%'
                            minW={'240px'}
                        >
                            <VStack justifyContent={'center'} h={'100%'}>
                                <Text fontWeight={600}>{day}</Text>
                            </VStack>
                        </GridItem>
                    )
                })
            }

        </Grid>
    )
}

export default WeekdaysGrid