import { Box, Button, Flex, GridItem, Progress, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Tooltip, Tr } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { RiArrowLeftRightLine } from 'react-icons/ri'
import { DashboardContext } from './DashboardContext'
import style from './style.module.scss'

function Status() {
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
            rowEnd={{
                base: 6,
                lg: 4,
                xl: 'auto'
            }}
        >
            {!onLoad ? (
                <>
                    <Text
                        fontSize={{
                            base: '1rem',
                            md: '1.25rem',
                        }}
                        fontWeight={'400'}
                        mb={'1rem'}
                    >
                        Sistemas de Informação - Seropédica - Bacharelado - Presencial - T
                    </Text>
                    <Box
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        padding={{
                            base: 1,
                            md: 3,
                        }}
                    >
                        <Flex
                            justifyContent={'end'}
                            mb={2}
                        >
                            <Button
                                variant={'blue-800'}
                                size='xs'
                            >
                                <RiArrowLeftRightLine />
                            </Button>
                        </Flex>
                        <TableContainer
                            className={style.drawer_table_scrollbar}
                        >
                            <Table size='sm'>
                                <Tbody>
                                    <Tr>
                                        <Th>CH. obrigatória
                                            <Tooltip
                                                label='Inclui todas as matérias obrigatórias e orientação Acadêmica/Profissional'
                                                placement='top'
                                            >
                                                <span>
                                                    <FaRegQuestionCircle
                                                        style={{ marginLeft: '.375rem', display: 'inline-block' }}
                                                    />
                                                </span>

                                            </Tooltip>
                                        </Th>
                                        <Td>10  horas</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>CH. optativa</Th>
                                        <Td>10 horas</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>CH. complementar</Th>
                                        <Td>10  horas</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>CH. total</Th>
                                        <Td>10  horas</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Text
                            mb={2}
                            mt={3}
                            fontWeight={600}
                            textAlign={'center'}
                        >
                            10% do curso
                        </Text>
                        <Progress
                            colorScheme='whatsapp'
                            size='md'
                            value={10}
                            hasStripe
                            isAnimated
                            mb={3}
                        />
                    </Box>
                </>
            ) : (
                <>
                    <Skeleton height='30px' mb={'1rem'} />
                    <Skeleton height='180px' />
                </>
            )}

        </GridItem>
    )
}

export default Status