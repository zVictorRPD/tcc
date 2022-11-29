import { Box, Button, Flex, GridItem, Progress, Skeleton, Table, TableContainer, Tbody, Td, Text, Th, Tooltip, Tr, VisuallyHidden } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { RiArrowLeftRightLine } from 'react-icons/ri'
import { getDoneWorkload } from '../../../functions/dashboard'
import { toCapitalize } from '../../../functions/toCapitalize'
import { DashboardContext } from './DashboardContext'
import style from './style.module.scss'

function Status() {
    const initialState = {
        complementary: 0,
        obrigatory: 0,
        optional: 0,
        total: 0,
    }
    const { onLoad, course, complementary, subjects } = useContext(DashboardContext);
    const [viewType, setViewType] = useState<"done" | "remains">('done');
    const [doneWorkload, setDoneWorkload] = useState<IWorkload>(initialState);
    const [totalWorkload, setTotalWorkload] = useState<IWorkload>(initialState);
    const [courseProgress, setCourseProgress] = useState(0);

    useEffect(() => {
        if (course && subjects && complementary) {
            const totalWorkLoadObject = {
                complementary: course.workload_complementary,
                obrigatory: course.workload_normal_lessons + course.workload_academic_professional_guidance,
                optional: course.workload_optional_lessons,
                total: course.workload_total,
            }
            setTotalWorkload(totalWorkLoadObject);
            setDoneWorkload(() => {
                const data = getDoneWorkload(subjects, complementary, false, totalWorkLoadObject);
                setCourseProgress(parseFloat(((data.total / totalWorkLoadObject.total) * 100).toFixed(2)));
                return data;
            });
        }

    }, [course, complementary]);

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
                        {toCapitalize(course.name)}
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
                            justifyContent={'space-between'}
                            alignItems={'center'}
                            mb={2}
                        >
                            <VisuallyHidden position={'initial'}></VisuallyHidden>
                            <Text
                                fontSize={{
                                    base: '1rem',
                                    md: '1.25rem',
                                }}
                                fontWeight={'400'}
                            >
                                {viewType === 'done' ? 'Horas realizadas' : 'Horas restantes'}
                            </Text>
                            <Button
                                variant={'blue-800'}
                                size='xs'
                                onClick={() => setViewType(viewType === 'done' ? 'remains' : 'done')}
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
                                        <Td>{viewType === 'done' ? doneWorkload.obrigatory : totalWorkload.obrigatory - doneWorkload.obrigatory} horas</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>CH. optativa</Th>
                                        <Td>{viewType === 'done' ? doneWorkload.optional : totalWorkload.optional - doneWorkload.optional} horas</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>CH. complementar</Th>
                                        <Td>{viewType === 'done' ? doneWorkload.complementary : totalWorkload.complementary - doneWorkload.complementary} horas</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>CH. total</Th>
                                        <Td>{viewType === 'done' ? doneWorkload.total : totalWorkload.total - doneWorkload.total} horas</Td>
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
                            {viewType === 'done' ? `Você já fez ${courseProgress}` : `Falta você fazer ${(100 - courseProgress).toFixed(2)}`}% do curso
                        </Text>
                        <Progress
                            colorScheme='whatsapp'
                            size='md'
                            value={courseProgress}
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