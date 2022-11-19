import { Box, Button, Flex, GridItem, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { FaEnvelope, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { toCapitalize } from '../../../functions/toCapitalize'

function Teachers() {
    const teachers = [
        {
            name: 'João da Silva',
            email: 'email',
            avatar: 'https://bit.ly/sage-adebayo',
            lattes: 'ss'
        },
        {
            name: 'João da Silva',
            email: 'email',
            avatar: 'https://bit.ly/sage-adebayo',
            lattes: 'ss'
        },
        {
            name: 'João da Silva',
            email: 'email',
            avatar: 'https://bit.ly/sage-adebayo',
            lattes: 'ss'
        },
        {
            name: 'João da Silva',
            email: 'email',
            avatar: 'https://bit.ly/sage-adebayo',
            lattes: 'ss'
        },
        {
            name: 'João da Silva',
            email: 'email',
            avatar: 'https://bit.ly/sage-adebayo',
            lattes: 'ss'
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
                mb={'1rem'}
                fontWeight={'400'}
            >
                Seus Professores
            </Text>
            <Box
                maxH={'300px'}
                overflowY={'auto'}
            >
                {teachers.map((teacher, index) => {
                    return (
                        <Flex
                            key={index}
                            alignItems={'center'}
                            justifyContent={'start'}
                            p={'.5rem'}
                            borderBottom={'1px solid #E2E8F0'}
                        >

                            <Image
                                src={teacher.avatar}
                                alt={teacher.name}
                                borderRadius={'full'}
                                boxSize={'2.5rem'}
                                mr={'.75rem'}
                            />
                            <Text
                                fontSize={{
                                    base: '1rem',
                                    md: '1.25rem',
                                }}
                                fontWeight={'400'}
                            >
                                {toCapitalize(teacher.name)}
                            </Text>
                            <IconButton
                                aria-label="Enviar email"
                                ml={'auto'}
                                icon={<FaEnvelope />}
                                size={'sm'}
                                variant={'blue-800'}
                                
                            />
                        </Flex>
                    )
                })}
            </Box>
        </GridItem>
    )
}

export default Teachers