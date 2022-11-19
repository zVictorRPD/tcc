import { Flex, GridItem, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { DashboardContext } from './DashboardContext';

function Class() {
    const { onLoad } = useContext(DashboardContext);
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
            >
                Próxima aula
            </Text>
            {!onLoad ? (
                <>
                    <Text
                        fontSize={{
                            base: '1.5rem',
                            md: '2rem',
                        }}
                        fontWeight={'400'}
                    >
                        Matemática
                    </Text>
                    <Text
                        fontSize={{
                            base: '1rem',
                            md: '1.25rem',
                        }}
                        fontWeight={'400'}
                        mb={'1rem'}
                    >
                        10:00 - 11:00
                    </Text>
                    <Text
                        fontSize={{
                            base: '.875rem',
                            md: '1rem',
                        }}
                        fontWeight={'400'}
                        pb={'.5rem'}
                        mb={'.5rem'}
                        borderBottom={'1px solid #e2e8f0'}
                    >
                        <Text display={'inline'} fontWeight={'600'}>Suas anotações: </Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint totam laboriosam ipsum ullam tempora similique temporibus, aliquam sequi consectetur!
                    </Text>
                    <Flex>
                        <Text display={'inline'} fontWeight={'600'}>Seus links: </Text>
                        <Text
                            fontWeight={600}
                            color='blue.500'
                            fontSize={{
                                base: '.875rem',
                                md: '1rem',
                            }}
                            ml={'.5rem'}

                            cursor={'pointer'}
                        >
                            Link 1,
                        </Text>
                        <Text
                            fontWeight={600}
                            color='blue.500'
                            fontSize={{
                                base: '.875rem',
                                md: '1rem',
                            }}
                            ml={'.5rem'}

                            cursor={'pointer'}
                        >
                            Link 1,
                        </Text>
                        <Text
                            fontWeight={600}
                            color='blue.500'
                            fontSize={{
                                base: '.875rem',
                                md: '1rem',
                            }}
                            ml={'.5rem'}

                            cursor={'pointer'}
                        >
                            Link 1
                        </Text>
                    </Flex>
                </>
            ) : (
                <>
                    <Skeleton height='30px' mt={'1rem'} />
                    <SkeletonText mt='4' noOfLines={5} spacing='4' />
                </>

            )}
        </GridItem>
    )
}

export default Class