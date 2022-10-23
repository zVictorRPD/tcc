import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { abbreviateCourseName } from '../../../functions/abbreviateText';
import { api } from '../../../services/api';
import { CurriculumContext } from './curriculumContext';

function SelectCurriculumModal() {
    const { selectCurriculumModalIsOpen, selectCurriculumModalOnClose, courses, onLoad, setOnLoad, userId, setHasCurriculum } = useContext(CurriculumContext);
    const [selectedCourse, setSelectedCourse] = useState("");
    const toast = useToast();

    const handleSelectCourse = async () => {
        setOnLoad(true);
        if (selectedCourse === "") {
            toast({
                title: 'Selecione um curso.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            });
            return;
        }
        try {
            const response = await api.post('/curriculum/createCurriculum', {
                userId,
                courseCode: selectedCourse
            });
            if (response.status === 201) {
                toast({
                    title: 'Grade criada com sucesso.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
                setHasCurriculum(true);
                selectCurriculumModalOnClose();
            }else {
                toast({
                    title: 'Erro ao criar grade.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setOnLoad(false);
        }
    }

    return (
        <Modal isOpen={selectCurriculumModalIsOpen} onClose={selectCurriculumModalOnClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Selecione seu curso</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl mb={3}>
                        <FormLabel>Curso</FormLabel>
                        <Select
                            value={selectedCourse}
                            onChange={e => setSelectedCourse(e.target.value)}
                        >
                            <option value={''}>Selecione o curso</option>
                            {
                                courses.map((course: any) => (
                                    <option key={course.code} value={course.code}>
                                        {abbreviateCourseName(course.name)}
                                    </option>
                                ))
                            }
                        </Select>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' mr={3} onClick={selectCurriculumModalOnClose}>
                        Cancelar
                    </Button>
                    <Button
                        variant='blue-800'
                        onClick={handleSelectCourse}
                        isLoading={onLoad}
                        loadingText='Enviando'
                    >
                        Enviar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SelectCurriculumModal