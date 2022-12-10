import { AlertDialog, AlertDialogBody, useToast, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, HStack, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useDisclosure, Tooltip } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react'
import { FaEdit, FaEllipsisV, FaSync, FaTrash } from 'react-icons/fa';
import Subject from './Subject';
import { Droppable } from 'react-beautiful-dnd';
import styles from './style.module.scss';
import { CurriculumContext } from './curriculumContext';
import { api } from '../../../services/api';
import { filterSubject } from '../../../functions/curriculum';

interface IPeriodColumnProps {
    period: IPeriods[number];
    subjects: ISubjects[string][];
}

function PeriodColumn(props: IPeriodColumnProps) {
    const toast = useToast();
    const cancelRef: any = React.useRef();
    const focusField: any = React.useRef(null);
    const { period } = props;
    const { setPeriods, periods, setPeriodOrder, periodOrder, setSubjects, subjects, subjectsFilter } = useContext(CurriculumContext);
    const [onLoading, setOnLoading] = useState(false);
    const [editingPeriod, setEditingPeriod] = useState(false);
    const [periodName, setPeriodName] = useState(period.name);
    const {
        isOpen: alertIsOpen,
        onOpen: alertOnOpen,
        onClose: alertOnClose
    } = useDisclosure()

    const handleEditPeriod = async (e: any) => {
        e.preventDefault();
        if (periodName === '') {
            toast({
                title: 'Insira um nome para o período.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        if (periodName.length > 100) {
            toast({
                title: 'O nome do período deve ter no máximo 100 caracteres.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        setOnLoading(true);
        const newPeriods = {
            ...periods,
            [period.id]: {
                ...period,
                name: periodName
            }
        }
        try {
            const response = await api.post('/curriculum/period/updatePeriod', {
                periodId: period.id,
                name: periodName
            });

            toast({
                title: "Período atualizado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
            setPeriods(newPeriods);
            setEditingPeriod(false);
        } catch (error) {
            toast({
                title: "Erro ao editar período",
                description: "Não foi possível editar o período",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
        } finally {
            setOnLoading(false);
        }
    }

    const handleDeletePeriod = async () => {
        setOnLoading(true);
        try {
            const response = await api.post('/curriculum/period/deletePeriod', {
                periodId: period.id,
            });
            if (!response.data.courseCode) throw new Error('Erro ao deletar período');
            //deleta o periodo
            const newPeriods = {
                ...periods
            }
            delete newPeriods[period.id];
            setPeriods(newPeriods);

            //arruma a ordem dos periodos
            const newPeriodOrder = periodOrder.filter(id => id !== period.id);
            setPeriodOrder(newPeriodOrder);

            //deleta as materias do periodo
            let newSubjects = {
                ...subjects
            }
            period.subjectIds.forEach(subjectId => {
                delete newSubjects[subjectId];
            });
            setSubjects(newSubjects);
            toast({
                title: "Período deletado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });

        } catch (error) {
            toast({
                title: "Erro ao deletar período",
                description: "Não foi possível deletar o período",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
        } finally {
            setOnLoading(false);
            alertOnClose();
        }

    }

    const changeAllStatus = async (type: string) => {
        setOnLoading(true);
        try {
            const response = await api.post('/curriculum/subject/changeAllStatus', {
                periodId: period.id,
                type
            });
            if (!response.data.changed) throw new Error('Erro ao alterar status das matérias');

            const newSubjects = {
                ...subjects
            }
            period.subjectIds.forEach(subjectId => {
                newSubjects[subjectId].status = type;
            });
            setSubjects(newSubjects);
            toast({
                title: "Status alterado com sucesso!",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        } catch (error) {
            toast({
                title: "Erro ao alterar status das matérias",
                description: "Não foi possível alterar o status das matérias",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            })
        } finally {
            setOnLoading(false);
        }
    }

    useEffect(() => {
        if (editingPeriod && focusField.current) {
            focusField.current.focus();
        }
    }, [editingPeriod]);

    return (
        <>
            <Stack
                bg={'gray.300'}
                borderWidth='1px'
                borderColor='gray.400'
                maxH={'83.2vh'}
                minW={'300px'}
                borderRadius={'1rem 1rem 0 0'}
            >
                {/* Header */}
                <Box
                    borderBottomWidth={'1px'}
                    borderBottomColor={'gray.400'}
                    w={'100%'}
                    py={2}
                    px={4}
                    bg={'white'}
                    borderRadius={'1rem 1rem 0 0'}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    flexDirection={!editingPeriod ? 'row' : 'column'}
                >
                    {!editingPeriod ? (
                        <>

                            <Text
                                fontWeight={600}
                                color='gray.800'
                                fontSize={'2xl'}
                                textAlign={'center'}
                                wordBreak={'break-all'}
                            >
                                {period.name}
                            </Text>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    size={'sm'}
                                    aria-label='Options'
                                    icon={<FaEllipsisV />}
                                    variant='outline'
                                />
                                <MenuList>
                                    <MenuItem icon={<FaEdit />} onClick={() => {
                                        setEditingPeriod(true);
                                        setPeriodName(period.name);
                                    }}>
                                        Editar nome
                                    </MenuItem>
                                    <Tooltip
                                        placement='top'
                                        hasArrow
                                        label='Colocar todas as matérias com o estado de pendente?'
                                    >
                                        <MenuItem 
                                        icon={<FaSync color='#718096' />}
                                            onClick={() => changeAllStatus('todo')}
                                        >
                                            Pendente
                                        </MenuItem>
                                    </Tooltip>
                                    <Tooltip
                                        placement='top'
                                        hasArrow
                                        label='Colocar todas as matérias com o estado de cursando?'
                                    >
                                        <MenuItem 
                                        icon={<FaSync color='#3182ce' />}
                                            onClick={() => changeAllStatus('doing')}
                                        >
                                            Cursando
                                        </MenuItem>
                                    </Tooltip>

                                    <Tooltip
                                        placement='top'
                                        hasArrow
                                        label='Colocar todas as matérias com o estado de aprovado?'
                                    >
                                        <MenuItem 
                                        icon={<FaSync color='#38A169' />}
                                            onClick={() => changeAllStatus('done')}
                                        >
                                            Aprovado
                                        </MenuItem>
                                    </Tooltip>

                                    <MenuItem icon={<FaTrash />} onClick={alertOnOpen}>
                                        Excluir
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <form onSubmit={(e) => handleEditPeriod(e)} style={{ width: '100%' }}>
                            <Input
                                placeholder="Nome do período"
                                value={periodName}
                                onChange={(e) => setPeriodName(e.target.value)}
                                ref={focusField}
                            />
                            <HStack
                                mt={2}
                                w={'100%'}
                            >
                                <Button
                                    size={'sm'}
                                    variant='outline'
                                    mr={1}
                                    onClick={() => setEditingPeriod(false)}
                                >
                                    Cancelar
                                </Button>

                                <Button
                                    size={'sm'}
                                    variant='blue-800'
                                    type='submit'
                                    isLoading={onLoading}
                                >
                                    Editar
                                </Button>
                            </HStack>
                        </form>
                    )}
                </Box>
                {/* Body */}
                <Droppable droppableId={period.id}>
                    {(provided, snapshot) => (
                        <Stack
                            {...provided.droppableProps}
                            px={'1rem'}
                            pb={'1rem'}
                            h={'100%'}
                            minH={'100px'}
                            overflowY={'auto'}
                            style={{ margin: 0 }}
                            ref={provided.innerRef}
                            bg={snapshot.isDraggingOver ? 'gray.400' : 'gray.300'}
                            transition={'background-color .3s ease'}
                            className={styles.period_scrollbar}

                        >
                            {
                                props.subjects.length > 0 &&
                                Object.keys(props.subjects).map((key: any, index) => {
                                    return props.subjects[key] && filterSubject(props.subjects[key], subjectsFilter) && <Subject key={index} index={index} subjectData={props.subjects[key]} periodId={period.id} />
                                })
                            }
                            {provided.placeholder}
                        </Stack>
                    )}

                </Droppable>
            </Stack>

            <AlertDialog
                isOpen={alertIsOpen}
                leastDestructiveRef={cancelRef}
                onClose={alertOnClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Deletar período
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Realmente deseja deletar o período <strong>{period.name}</strong>? <br />
                            Todas as matérias do período também serão deletadas.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={alertOnClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme='red' onClick={handleDeletePeriod} isLoading={onLoading} ml={3}>
                                Deletar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>


    )
}

export default PeriodColumn