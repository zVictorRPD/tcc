import { TableContainer, Table, Tbody, Tr, Th, Td, Text, Box, Thead, Button, Flex, useToast, HStack, Input, NumberInput, NumberInputField, NumberDecrementStepper, NumberIncrementStepper, NumberInputStepper } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { api } from '../../../../services/api';
import { CurriculumContext } from '../curriculumContext';
import style from '../style.module.scss';

function PeriodTab() {
    const { complementary, setComplementary, userId } = useContext(CurriculumContext);
    const [onLoad, setOnLoad] = useState(false);
    const toast = useToast();
    const [newComplementary, setNewComplementary] = useState<IComplementary>({
        name: '',
        time: 0
    });
    const [addingComplementary, setAddingComplementary] = useState(false);
    const handleAddComplementary = async () => {
        setOnLoad(true);
        try {
            const response = await api.post('/curriculum/complementary/createComplementary', {
                name: newComplementary.name,
                time: newComplementary.time,
                userId
            });
            if(!response.data.name) throw new Error('Erro ao adicionar complementar');
            setComplementary([...complementary, response.data]);
            toast({
                title: "Atividade complementar adicionada com sucesso.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } catch (error) {
            toast({
                title: "Erro ao adicionar atividade complementar",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } finally {
            setNewComplementary({
                name: '',
                time: 0
            });
            setAddingComplementary(false);
            setOnLoad(false);
        }
    }
    return (
        <>
            <Text
                fontSize={'lg'}
                fontWeight={600}
                textAlign={'center'}
                mb={3}
            >
                Sobre as horas complementares
            </Text>
            <Box
                borderWidth={'1px'}
                borderRadius={'lg'}
                padding={2}
                className={`${style.drawer_table_scrollbar} ${onLoad ? style.on_load : ''}`}
            >
                <TableContainer mb={'3rem'}>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th isNumeric>Horas</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {complementary.length > 0 ? (
                                complementary.map((complementary, index) => (
                                    <Tr key={index}>
                                        <Td>{complementary.name}</Td>
                                        <Td isNumeric>{complementary.time}</Td>
                                    </Tr>
                                ))
                            ) : (
                                <Tr>
                                    <Td colSpan={2} textAlign={'center'}>Nenhuma hora complementar cadastrada</Td>
                                </Tr>
                            )}

                        </Tbody>
                    </Table>
                </TableContainer>
                {addingComplementary ? (
                    <>
                        <Flex>
                            <Input
                                placeholder="Curso da Udemy"
                                type={'text'}
                                value={newComplementary.name}
                                onChange={(e) => setNewComplementary({ ...newComplementary, name: e.target.value })}
                                my={'.5rem'}
                            />
                            <NumberInput
                                defaultValue={0}
                                precision={0}
                                step={1}
                                min={0}
                                max={1000}
                                size={'md'}
                                ml={'.5rem'}
                                my={'.5rem'}
                                allowMouseWheel={true}
                                onChange={(valueAsString: string, valueAsNumber: number) => setNewComplementary({ ...newComplementary, time: valueAsNumber })}
                            >
                                <NumberInputField value={newComplementary.time} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Flex>
                        <HStack
                            mt={2}
                            w={'100%'}
                            justifyContent={'end'}
                        >
                            <Button
                                size={'sm'}
                                variant='outline'
                                mr={1}
                                onClick={() => setAddingComplementary(false)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                size={'sm'}
                                variant='blue-800'
                                onClick={handleAddComplementary}
                            >
                                Salvar
                            </Button>
                        </HStack>
                    </>
                ) : (
                    <Flex
                        justifyContent={'end'}
                    >
                        <Button
                            variant={'blue-800'}
                            size={'sm'}
                            rightIcon={<FaPlus />}
                            onClick={() => setAddingComplementary(true)}
                            isLoading={onLoad}
                        >
                            Adicionar
                        </Button>
                    </Flex >
                )}
            </Box>
        </>
    )
}

export default PeriodTab