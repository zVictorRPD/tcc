import { Box, Button, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import React, { useContext, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { api } from '../../../services/api';
import { CurriculumContext } from './curriculumContext';

function AddPeriodColumn() {
    const [addingPeriod, setAddingPeriod] = useState(false);
    const [periodName, setPeriodName] = useState('');
    const [onLoad, setOnLoad] = useState(false);
    const toast = useToast();
    const { setPeriods, periods, periodOrder, setPeriodOrder } = useContext(CurriculumContext);

    const handleAddPeriod = async (e: any) => {
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
        setOnLoad(true);
        try {
            const response = await api.post('/curriculum/period/createPeriod', {
                periodName
            });
            if (!response.data.id) throw new Error('Erro ao criar período.');

            const newPeriods = {
                ...periods,
                [response.data.id]: response.data
            }
            setPeriods(newPeriods);
            setPeriodOrder([...periodOrder, response.data.id]);

            toast({
                title: 'Período criado com sucesso.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });

        } catch (error) {
            toast({
                title: 'Erro ao adicionar período.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } finally {
            setOnLoad(false);
        }
        setPeriodName('');
        setAddingPeriod(false);
    }

    return (
        <Stack
            bg={'gray.300'}
            borderWidth='1px'
            borderColor='gray.400'
            maxH={'85vh'}
            minW={'300px'}
            borderRadius={'1rem'}
        >
            {/* Header */}
            {!addingPeriod ? (
                <Box
                    w={'100%'}
                    py={2}
                    px={4}
                    bg={'white'}
                    borderRadius={'1rem'}
                    cursor={'pointer'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    onClick={() => setAddingPeriod(true)}
                    opacity=".6"
                >
                    <FaPlus
                        size={18}
                        color={'gray.800'}
                        style={{ marginRight: '0.5rem' }}
                    />
                    <Text
                        fontWeight={400}
                        color='gray.800'
                        fontSize={'2xl'}
                        textAlign={'center'}
                    >
                        Adicionar período
                    </Text>
                </Box>
            ) : (
                <form onSubmit={(e) => handleAddPeriod(e)}>
                    <Box
                        w={'100%'}
                        py={2}
                        px={4}
                        bg={'white'}
                        borderRadius={'1rem'}
                        cursor={'pointer'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection={'column'}
                    >
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
                                onClick={() => setAddingPeriod(false)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                size={'sm'}
                                variant='blue-800'
                                type='submit'
                                isLoading={onLoad}
                            >
                                Adicionar
                            </Button>
                        </HStack>

                    </Box>
                </form>
            )}

        </Stack>
    )
}

export default AddPeriodColumn