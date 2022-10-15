import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, HStack, IconButton, Input, Menu, MenuButton, MenuItem, MenuList, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { FaEdit, FaEllipsisV, FaTrash } from 'react-icons/fa';
import Subject from './Subject';
import { Droppable } from 'react-beautiful-dnd';
import styles from './style.module.scss';
import { CurriculumContext } from './curriculumContext';

interface IPeriodColumnProps {
    period: IPeriods[number];
    subjects: ISubjects[string][];
}

function PeriodColumn(props: IPeriodColumnProps) {
    const cancelRef: any = React.useRef()
    const { period } = props;
    const { setPeriods, periods, setPeriodOrder, periodOrder, setSubjects, subjects } = useContext(CurriculumContext);
    const [editingPeriod, setEditingPeriod] = useState(false);
    const [periodName, setPeriodName] = useState(period.name);
    const {
        isOpen: alertIsOpen,
        onOpen: alertOnOpen,
        onClose: alertOnClose
    } = useDisclosure()

    const handleEditPeriod = () => {
        const newPeriods = {
            ...periods,
            [period.id]: {
                ...period,
                name: periodName
            }
        }
        setPeriods(newPeriods);
        setEditingPeriod(false);
    }
    const handleDeletePeriod = () => {
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

        alertOnClose();
    }

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
                                    <MenuItem icon={<FaEdit />} onClick={() => setEditingPeriod(true)}>
                                        Editar nome
                                    </MenuItem>
                                    <MenuItem icon={<FaTrash />} onClick={alertOnOpen}>
                                        Excluir
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <Input
                                placeholder="Nome do período"
                                value={periodName}
                                onChange={(e) => setPeriodName(e.target.value)}
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
                                    onClick={handleEditPeriod}
                                >
                                    Editar
                                </Button>
                            </HStack>
                        </>
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
                            {Object.keys(props.subjects).map((key: any, index) => {
                                return <Subject key={index} index={index} subjectData={props.subjects[key]} />
                            })}
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
                            <Button colorScheme='red' onClick={handleDeletePeriod} ml={3}>
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