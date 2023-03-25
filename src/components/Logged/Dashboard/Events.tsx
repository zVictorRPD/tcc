import { Box, Flex, GridItem, SkeletonText, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { DashboardContext } from './DashboardContext';

function Events() {
    const { events, setEventData, eventModalOnOpen, onLoad } = useContext(DashboardContext);

    return (
        <GridItem
            bg={useColorModeValue("white", "gray.900")}
            p={{
                base: '.75rem',
                md: '1rem',
                lg: '1.5rem',
            }}
            borderRadius={'8px'}
            boxShadow={'md'}
        >
            <Text
                fontSize={{
                    base: '1rem',
                    md: '1.25rem',
                }}
                fontWeight={'400'}
                mb={'1rem'}
            >
                Próximos eventos
            </Text>
            <Box>
                {!onLoad ? (
                    <>
                        {events.length > 0 ? events.map((event, index) => {
                            return (
                                <Flex
                                    key={index}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    p={'.5rem'}
                                    borderBottom={'1px solid #E2E8F0'}
                                    cursor={'pointer'}
                                    _hover={{
                                        bg: useColorModeValue("gray.50", "gray.700"),
                                    }}
                                    onClick={() => {
                                        setEventData(event);
                                        eventModalOnOpen();
                                    }}
                                >
                                    <Text
                                        fontSize={{
                                            base: '.875rem',
                                            md: '1rem',
                                        }}
                                        fontWeight={'400'}
                                        w={'200px'}
                                        textOverflow={'ellipsis'}
                                        overflow={'hidden'}
                                        whiteSpace={'nowrap'}
                                    >
                                        {event.title}
                                    </Text>
                                    <Text
                                        fontSize={{
                                            base: '.875rem',
                                            md: '1rem',
                                        }}
                                        fontWeight={'400'}

                                    >
                                        {new Date(event.start).toLocaleDateString().slice(0, 5)}
                                    </Text>
                                </Flex>
                            )
                        }) : (
                            <Text
                                fontSize={'1rem'}
                                fontWeight={'400'}
                            >
                                Você não tem eventos marcados.
                            </Text>
                        )}
                    </>
                ) : (
                    <SkeletonText mt='4' noOfLines={6} spacing='4' />
                )}
            </Box>
        </GridItem>
    )
}

export default Events