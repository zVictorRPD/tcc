import React, { useContext } from 'react'
import { Badge, Box, Button, Flex, GridItem, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, SkeletonText, Text } from '@chakra-ui/react'
import { DashboardContext } from './DashboardContext';

export default function Subjects() {
    const { onLoad, subjects, setSelectedSubject, subjectModalOnOpen } = useContext(DashboardContext);
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
            colSpan={{
                base: 1,
                lg: 2,
                xl: 2,
            }}
        >
            <Text
                fontSize={{
                    base: '1rem',
                    md: '1.25rem',
                }}
                fontWeight={'400'}
                mb={'1rem'}
            >
                Matérias sendo feitas
            </Text>
            {!onLoad ? (
                <Box
                    maxH={{
                        base: '680px',
                        lg: '290px',
                    }}
                    overflowY={'auto'}
                >
                    {Object.values(subjects).map((subject, index) => {
                        if(subject.status !== 'doing') return;
                        return (
                            <Flex
                                key={subject.code}
                                direction={{
                                    base: 'column',
                                    md: 'row',
                                }}
                                alignItems={'center'}
                                justifyContent={'start'}
                                p={'.5rem'}
                                borderBottom={'1px solid #E2E8F0'}
                                cursor={'pointer'}
                                gap={'1rem'}
                                onClick={() => {
                                    setSelectedSubject(subject);
                                    subjectModalOnOpen();
                                }}
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
                                >
                                    {subject.code}
                                </Text>
                                <Text
                                    fontSize={{
                                        base: '.875rem',
                                        md: '1rem',
                                    }}
                                    fontWeight={'400'}
                                    textAlign={{
                                        base: 'center',
                                        md: 'left',
                                    }}
                                >
                                    {subject.name}
                                </Text>
                                <Badge
                                    colorScheme='blue'
                                    ml={{
                                        base: '0',
                                        md: 'auto',
                                    }}
                                >
                                    {subject.isOptional ? 'Optativa' : 'Obrigatória'}
                                </Badge>
                                {/* <Popover>
                                    <PopoverTrigger>
                                        <Button
                                            variant='blue-800'
                                            size={'xs'}
                                        >
                                            {subject.time}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Horário traduzido</PopoverHeader>
                                        <PopoverBody>
                                            Sexta feita às 23:45
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover> */}

                            </Flex>
                        )
                    })}
                </Box>
            ) : (
                <SkeletonText mt='4' noOfLines={6} spacing='4' />
            )}

        </GridItem>
    )
}
