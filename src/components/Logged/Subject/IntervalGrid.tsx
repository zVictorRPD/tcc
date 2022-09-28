import { Box, Grid, GridItem, Text, VStack } from '@chakra-ui/react';
import React from 'react'
import { timeTableTranslation } from "../../../../pages/ambiente-logado/grade-horaria/timeTableObject";

interface IIntervalGridProps {
    type: string,
}

function IntervalGrid(props: IIntervalGridProps) {
    const { type } = props;

    return (
        <Grid templateColumns='62px repeat(5, 1fr)' gap={3}>
            <GridItem w='100%'>
                <VStack justifyContent={'center'} h={'100%'}>
                    <Text fontWeight={600}>{timeTableTranslation[type]}</Text>
                </VStack>
            </GridItem>
            {Array(5).fill(0).map((_, index) => {
                return (
                    <GridItem key={index} w='100%'>
                        <Box
                            p={{ base: '.5rem' }}
                            bg="gray.300"
                            color={'black'}
                            borderRadius={'12px'}
                            borderWidth="1px"
                            borderColor={'gray.300'}
                            h={'50px'}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Text>{type}</Text>
                        </Box>
                    </GridItem>
                )
            })}

        </Grid>
    );

}

export default IntervalGrid