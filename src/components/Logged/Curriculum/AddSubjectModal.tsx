import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tooltip, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { CurriculumContext } from './curriculumContext';

function AddSubjectModal() {
    const { addSubjectModalIsOpen, addSubjectModalOnClose, periods, setPeriods, subjects, setSubjects } = useContext(CurriculumContext);
    const [code, setCode] = useState("");
    const [selectedPeriod, setSelectedPeriod] = useState("");
    const toast = useToast();

    const handleAddSubject = () => {
        if (code === "") {
            toast({
                title: 'Insira um código para a matéria.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        if (selectedPeriod === "") {
            toast({
                title: 'Selecione um período para a matéria.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        const newSubject = {
            id: `${Math.floor(Math.random() * 100)}`,
            code,
            name: 'false name',
            period: periods[selectedPeriod].name,
            time: '09:00 - 10:00',
            type: 'Teórica',
            status: 'todo'
        }
        const newSubjects = {
            ...subjects,
            [newSubject.id]: newSubject
        }
        const newPeriods = {
            ...periods,
            [selectedPeriod]: {
                ...periods[selectedPeriod],
                subjectIds: [...periods[selectedPeriod].subjectIds, newSubject.id]
            }
        }
        
        setSubjects(newSubjects);
        setPeriods(newPeriods);
        setCode("");
        setSelectedPeriod("");
        addSubjectModalOnClose();
    }

    return (
        <Modal isOpen={addSubjectModalIsOpen} onClose={addSubjectModalOnClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar matéria</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

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
                        <Input placeholder='IC856' value={code} onChange={e => setCode(e.target.value)} />
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
                    <Button variant='blue-800' onClick={handleAddSubject}>Adicionar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddSubjectModal