import { Box, Button, HStack, Input, Stack, Text } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { CurriculumContext } from './curriculumContext';

function AddPeriodColumn() {
    const [addingPeriod, setAddingPeriod] = React.useState(false);
    const [periodName, setPeriodName] = React.useState('');
    const toast = useToast();
    const { setPeriods, periods, periodOrder, setPeriodOrder } = useContext(CurriculumContext);

    const handleAddPeriod = () => {
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
        const newPeriod = {
            id: `${periodOrder.length + 1}`,
            name: periodName,
            subjectIds: []
        }
        const newPeriods = {
            ...periods,
            [newPeriod.id]: newPeriod
        }
        setPeriods(newPeriods);
        setPeriodOrder([...periodOrder, newPeriod.id]);
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
                            onClick={handleAddPeriod}
                        >
                            Adicionar
                        </Button>
                    </HStack>

                </Box>
            )}

        </Stack>
    )
}

export default AddPeriodColumn