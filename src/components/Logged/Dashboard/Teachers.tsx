import { Box, Button, Flex, GridItem, HStack, IconButton, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { toCapitalize } from '../../../functions/toCapitalize'
import { DashboardContext } from './DashboardContext';

function Teachers() {
    const { onLoad, subjects } = useContext(DashboardContext);
    const [teachers, setTeachers] = useState<ITeacher[]>([]);

    useEffect(() => {
        let teachers: ITeacher[] = [];
        Object.values(subjects).forEach(subject => {
            if (subject.status !== 'doing' || typeof subject?.teacher === 'undefined' || subject.teacher === null) return;
            if (!teachers.find(t => t.id === subject?.teacher?.id)) {
                teachers.push(subject?.teacher);
            }
        });
        setTeachers(teachers);
    }, [subjects]);

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
                mb={'1rem'}
                fontWeight={'400'}
            >
                Seus Professores
            </Text>
            {!onLoad ? (
                <Box
                    maxH={'300px'}
                    overflowY={'auto'}
                >
                    {teachers.length > 0 ? teachers.map((teacher, index) => {
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
                                    fallbackSrc="/assets/images/logged/user-default-image.webp"
                                    borderRadius={'full'}
                                    boxSize={'2.5rem'}
                                    mr={'.75rem'}
                                    objectFit={'cover'}
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
                                    onClick={() => window.open(`mailto:${teacher.email}`, '_blank')}
                                />
                            </Flex>
                        )
                    })
                        :
                        <Text
                            fontSize={'1rem'}
                            fontWeight={'400'}
                        >
                            Nenhuma matéria que você está fazendo possui um professor cadastrado.
                        </Text>
                    }

                </Box>
            ) : (
                <Flex
                    alignItems={'center'}
                >
                    <SkeletonCircle size="2.5rem" />
                    <Skeleton height={'20px'} ml={'.5rem'} w={'90%'} />
                </Flex>

            )}

        </GridItem>
    )
}

export default Teachers