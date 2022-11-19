import { Box, Flex, GridItem, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { DashboardContext } from './DashboardContext';

function Events() {
    const { events, setEventData, eventModalOnOpen } = useContext(DashboardContext);
     
    return (
        <GridItem
            bg={'white'}
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
                                bg: '#F7FAFC',
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
                }) : ('vazio')}
            </Box>
        </GridItem>
    )
}

export default Events