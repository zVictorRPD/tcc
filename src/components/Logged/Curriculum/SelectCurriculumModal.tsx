import { Button, FormControl, FormLabel, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { abbreviateCourseName } from '../../../functions/abbreviateText';
import { api } from '../../../services/api';
import { CurriculumContext } from './curriculumContext';
import { filterAndExtractNames, getPeriodsOfTheSelectedCourse } from '../../../functions/curriculum';
interface course {
    code: string;
    name: string;
    period_emergence: string;
}

function SelectCurriculumModal() {
    const { selectCurriculumModalIsOpen, selectCurriculumModalOnClose, courses, onLoad, setOnLoad, setHasCurriculum } = useContext(CurriculumContext);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedCode, setSelectedCode] = useState("");
    const toast = useToast();
    const filteredCoursesByName = filterAndExtractNames(courses);

    const handleSelectCourse = async (e: any) => {
        e.preventDefault();
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
        setOnLoad(true);
        try {
            const response = await api.post('/curriculum/createCurriculum', {
                courseCode: selectedCode
            });
            if (response.data.status === 'success') {
                toast({
                    title: 'Grade criada com sucesso.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top-right'
                });
                setHasCurriculum(true);
                selectCurriculumModalOnClose();
            } else {
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
                <form onSubmit={(e) => handleSelectCourse(e)}>
                    <ModalHeader>Selecione seu curso</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        px={{
                            base: '0',
                            md: '4'
                        }}
                    >
                        <FormControl mb={3}>
                            <FormLabel>Curso</FormLabel>
                            <Select
                                value={selectedCourse}
                                onChange={e => setSelectedCourse(e.target.value)}
                            >
                                <option value={''}>Selecione o curso</option>
                                {
                                    filteredCoursesByName.map((course: any) => (
                                        <option key={course} value={course}>
                                            {abbreviateCourseName(course)}
                                        </option>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Ano-Período da grade do curso</FormLabel>
                            <Select
                                value={selectedCode}
                                onChange={e => setSelectedCode(e.target.value)}
                                disabled={!selectedCourse}
                            >
                                <option value={''}>Selecione o período</option>
                                {
                                    selectedCourse && getPeriodsOfTheSelectedCourse(courses, selectedCourse).map((course: course) => (
                                        <option key={course.name + course.period_emergence} value={course.code}>
                                            {course.period_emergence}
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
                            type='submit'
                            isLoading={onLoad}
                            loadingText='Enviando'
                            disabled={!selectedCourse || !selectedCode}
                        >
                            Enviar
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}

export default SelectCurriculumModal