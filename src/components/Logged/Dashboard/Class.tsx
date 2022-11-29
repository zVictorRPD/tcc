import { Flex, GridItem, Skeleton, SkeletonText, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { getNextClass } from '../../../functions/dashboard';
import { getDashbordData } from '../../../functions/timetable';
import { toCapitalize } from '../../../functions/toCapitalize';
import { DashboardContext } from './DashboardContext';

function Class() {
    const { onLoad, timetable, subjects } = useContext(DashboardContext);
    const [nextClass, setNextClass] = useState<INextClass | null>(null);
    useEffect(() => {
        if (subjects !== undefined && timetable !== undefined) {
            setNextClass(getNextClass(getDashbordData(timetable, subjects)));
        }
    }, [timetable, subjects]);

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
                    {nextClass !== null ? (
                        <>
                            <Text
                                fontSize={{
                                    base: '1.5rem',
                                    md: '1.875rem',
                                }}
                                fontWeight={'400'}
                            >
                                {toCapitalize(nextClass.subject.name)}
                            </Text>
                            <Text
                                fontSize={{
                                    base: '1rem',
                                    md: '1.25rem',
                                }}
                                fontWeight={'400'}
                                mb={'1rem'}
                            >
                                {nextClass.day}, {nextClass.hour}
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
                                {nextClass.subject.note || 'Você não tem anotações para essa matéria.'}
                            </Text>
                            <Flex>
                                <Text display={'inline'} fontWeight={'600'}>Seus links: </Text>
                                {nextClass.subject.links && nextClass.subject.links.length > 0 ? (
                                    nextClass.subject.links.map((link, index, array) => {
                                        return (
                                            <Text
                                                key={link.url}
                                                fontWeight={600}
                                                color='blue.500'
                                                fontSize={{
                                                    base: '.875rem',
                                                    md: '1rem',
                                                }}
                                                ml={'.5rem'}

                                                cursor={'pointer'}
                                            >
                                                {link.name + (index !== array.length - 1 ? ', ' : '')}
                                            </Text>
                                        )
                                    })

                                ) : (
                                    <Text
                                        fontWeight={600}
                                        color='blue.500'
                                        fontSize={{
                                            base: '.875rem',
                                            md: '1rem',
                                        }}
                                        ml={'.5rem'}
                                    >
                                        Você não tem links para essa matéria.
                                    </Text>
                                )}
                            </Flex>
                        </>
                    ) : (
                        <Text
                            fontSize={'1rem'}
                            fontWeight={'400'}
                            mt={'1rem'}
                        >
                            Sua grade horária está vazia.
                        </Text>
                    )}
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