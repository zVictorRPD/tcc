import { Box, Flex, GridItem, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { toCapitalize } from '../../../functions/toCapitalize'

function Events() {
    const events = [
        {
            title: 'Evento 1',
            description: 'Descrição do evento 1',
            date: '2021-10-10',
        },
        {
            title: 'Evento 1',
            description: 'Descrição do evento 1',
            date: '2021-10-10',
        },
        {
            title: 'Evento 1',
            description: 'Descrição do evento 1',
            date: '2021-10-10',
        },
    ]
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
                {events.map((event, index) => {
                    return (
                        <Flex
                            key={index}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            py={'.5rem'}
                            borderBottom={'1px solid #E2E8F0'}
                            cursor={'pointer'}
                            _hover={{
                                bg: '#F7FAFC',
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
                                {new Date(event.date).toLocaleDateString().slice(0, 5)}
                            </Text>
                        </Flex>
                    )
                })}
                {events.map((event, index) => {
                    return (
                        <Flex
                            key={index}
                            alignItems={'center'}
                            justifyContent={'space-between'}
                            py={'.5rem'}
                            borderBottom={'1px solid #E2E8F0'}
                            cursor={'pointer'}
                            _hover={{
                                bg: '#F7FAFC',
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
                                {new Date(event.date).toLocaleDateString().slice(0, 5)}
                            </Text>
                        </Flex>
                    )
                })}
            </Box>
        </GridItem>
    )
}

export default Events