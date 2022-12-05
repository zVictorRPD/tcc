import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tooltip, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { validateSubjectCode } from '../../../functions/validation';
import { api } from '../../../services/api';
import { CurriculumContext } from './curriculumContext';

function AddSubjectModal() {
    const { addSubjectModalIsOpen, addSubjectModalOnClose, periods, setPeriods, subjects, setSubjects, curriculumDrawerOnClose } = useContext(CurriculumContext);
    const [code, setCode] = useState("");
    const [onLoad, setOnLoad] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const [subjectType, setSubjectType] = useState<string>("");
    const toast = useToast();

    const handleAddSubject = async (e: any) => {
        e.preventDefault();
        if (code === "" || selectedPeriod === "" || subjectType === "") {
            toast({
                title: 'Insira um código e selecione um período.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        if (!validateSubjectCode(code)) {
            toast({
                title: "Código inválido",
                description: "O código deve conter 2 letras seguidas de 3 números",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        setOnLoad(true);
        try {
            const response = await api.post('/curriculum/subject/createSubject', {
                subjectCode: code,
                periodId: selectedPeriod,
                subjectType
            });
            if (!response.data.id) throw new Error('Erro ao adicionar matéria.');

            const newSubjects = {
                ...subjects,
                [response.data.id]: response.data
            }
            const newPeriods = {
                ...periods,
                [selectedPeriod]: {
                    ...periods[selectedPeriod],
                    subjectIds: [...periods[selectedPeriod].subjectIds, response.data.id]
                }
            }
            setSubjects(newSubjects);
            setPeriods(newPeriods);
            setCode("");
            setSelectedPeriod("");
            addSubjectModalOnClose();
            curriculumDrawerOnClose();
            toast({
                title: 'Matéria adicionada com sucesso.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } catch (error) {
            toast({
                title: 'Erro ao adicionar matéria.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
        } finally {
            setOnLoad(false);
        }

    }

    return (
        <Modal isOpen={addSubjectModalIsOpen} onClose={addSubjectModalOnClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={(e) => handleAddSubject(e)}>
                    <ModalHeader>Adicionar matéria</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        px={{
                            base: '0',
                            md: '4'
                        }}
                    >

                        <FormControl mb={3}>
                            <FormLabel
                                display={'flex'}
                                alignItems={'center'}
                            >
                                Código da matéria
                                <Tooltip
                                    label='Caso não saiba o código, clique aqui para pesquisar.'
                                    placement='top'
                                    hasArrow

                                >
                                    <a
                                        style={{ marginLeft: '.375rem' }}
                                        href={'/ambiente-logado/materias'}
                                        target={'_blank'}
                                        rel="noreferrer"
                                    >
                                        <FaRegQuestionCircle />
                                    </a>
                                </Tooltip>
                            </FormLabel>
                            <Input
                                placeholder='XX999'
                                value={code}
                                onChange={e => setCode(e.target.value.toUpperCase())}
                                maxLength={5}
                            />
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Tipo de matéria</FormLabel>
                            <Select
                                value={subjectType}
                                onChange={e => setSubjectType(e.target.value)}
                            >
                                <option value={''}>Selecione o tipo</option>
                                <option value={'false'}>Obrigatória</option>
                                <option value={'true'}>Optativa</option>

                            </Select>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Período</FormLabel>
                            <Select
                                value={selectedPeriod}
                                onChange={e => setSelectedPeriod(e.target.value)}
                            >
                                <option value={''}>Selecione o período</option>
                                {periods && Object.values(periods).map(period =>
                                    <option key={period.id} value={period.id}>{period.name}</option>
                                )}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='outline' mr={3} onClick={addSubjectModalOnClose}>
                            Cancelar
                        </Button>
                        <Button
                            variant='blue-800'
                            type='submit'
                            isLoading={onLoad}
                        >
                            Adicionar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default AddSubjectModal