import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tooltip, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { TimetableContext } from './TimetableContext';
import { toCapitalize } from '../../../functions/toCapitalize';
import { api } from '../../../services/api';

function AddSubjectModal() {
    const toast = useToast();
    const { addSubjectModalIsOpen, addSubjectModalOnClose, subjects, periods, setTimetableSubjects, timetableSubjects } = useContext(TimetableContext);
    const [addSubjectModalData, setAddSubjectModalData] = useState<IAddSubjectModalTimetable>(
        {
            period: '',
            subject: '',
            color: 'blackAlpha.900',
            time: '',
        }
    );
    const [onLoad, setOnLoad] = useState(false);

    const createToast = (msg: string) => {
        toast({
            title: "Erro",
            position: "top-right",
            description: msg,
            status: "error",
            duration: 3000,
            isClosable: true,
        });
    }

    const getSubjectsOptions = () => {
        if (Object.keys(periods[addSubjectModalData.period].subjectIds).length > 0) {
            return periods[addSubjectModalData.period].subjectIds.map((subjectId, index) => <option key={index} value={subjectId}>{toCapitalize(subjects[subjectId].name)}</option>)
        }
        return (
            <option value="">Nenhuma matéria disponível</option>
        )
    }

    const validateTime = () => {
        const time = addSubjectModalData.time.toUpperCase();

        //check how many letter are in the time
        const letters = time.match(/[A-Z]/g) || [];

        //check if has a  m,t or n
        if (letters.length > 1 || !time.includes('M') && !time.includes('T') && !time.includes('N')) {
            createToast('O campo deve conter um identificador de turno (M, N, ou T)');
            return false;
        }

        //check if has more than one letter
        if (time.includes('M') && time.includes('T') || time.includes('M') && time.includes('N') || time.includes('T') && time.includes('N')) {
            createToast('O campo deve conter apenas um identificador de turno (M, N, ou T)');
            return false;
        }

        //check what is the turn
        let period = '';
        period = time.includes('M') ? 'M' : time.includes('T') ? 'T' : 'N'


        //spliting the time
        const weekdays = time.split(`${period}`)[0];
        const hours = time.split(`${period}`)[1];

        //check if has a value after and before the period
        if (typeof weekdays == 'undefined' || typeof hours == 'undefined') {
            createToast('O campo deve conter os dias da semana e os horários');
            return false;
        }

        if (weekdays.length == 0 || hours.length == 0) {
            createToast('O campo deve conter os dias da semana e os horários');
            return false;
        }

        //check if has a letter in the weekdays
        for (let i = 0; i < weekdays.length; i++) {
            if (isNaN(parseInt(weekdays[i]))) {
                createToast('O campo deve conter apenas números nos dias da semana');
                return false;
            }
        }

        //check if has a letter in the hours
        for (let i = 0; i < hours.length; i++) {
            if (isNaN(parseInt(hours[i]))) {
                createToast('O campo deve conter apenas números nos horários');
                return false;
            }
        }

        //check if the days are between 1 and 7
        for (let i = 0; i < weekdays.length; i++) {
            if (parseInt(weekdays[i]) < 2 || parseInt(weekdays[i]) > 7) {
                createToast('Os dias da semana devem conter apenas números entre 2 e 7');
                return false;
            }
        }

        //check if the hours are between 1 and 5
        for (let i = 0; i < hours.length; i++) {
            if (parseInt(hours[i]) < 1 || parseInt(hours[i]) > 5) {
                createToast('Os horários devem conter apenas números entre 1 e 5');
                return false;
            }
        }

        //check if has a repeated weekday
        for (let i = 0; i < weekdays.length; i++) {
            for (let j = 0; j < weekdays.length; j++) {
                if (i != j) {
                    if (weekdays[i] == weekdays[j]) {
                        createToast('Não é possível ter dias da semana repetidos');
                        return false;
                    }
                }
            }
        }

        //check if has a repeated hours
        for (let i = 0; i < hours.length; i++) {
            for (let j = 0; j < hours.length; j++) {
                if (i != j) {
                    if (hours[i] == hours[j]) {
                        createToast('Não é possível ter horários repetidos');
                        return false;
                    }
                }
            }
        }
        //order the weekdays
        const orderedWeekdays = weekdays.split('').sort((a, b) => parseInt(a) - parseInt(b)).join('');

        //order the hours
        const orderedHours = hours.split('').sort((a, b) => parseInt(a) - parseInt(b)).join('');

        const finalTime = `${orderedWeekdays}${period}${orderedHours}`;

        //check if the time is already in the list
        try {
            let newTimetableSubjects = timetableSubjects;
            orderedWeekdays.split('').forEach((day, index) => {
                orderedHours.split('').forEach((hour, index) => {
                    if (timetableSubjects[day][period.toLowerCase()][hour] !== '') throw new Error();
                    newTimetableSubjects[day][period.toLowerCase()][hour] = {
                        id: addSubjectModalData.subject,
                        bgColor: addSubjectModalData.color,
                    };
                });
            });
            setTimetableSubjects(newTimetableSubjects);
            return true;
        } catch (err) {
            createToast("Já existe uma matéria nesse horário");
            return false;
        }

    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setOnLoad(true);
        if (addSubjectModalData.period === "" || addSubjectModalData.subject === "" || addSubjectModalData.color === "") {
            createToast("Preencha todos os campos");
            setOnLoad(false);
            return;
        }
        if (!validateTime()) {
            setOnLoad(false);
            return;
        }
        try {
            const response = await api.post('/timetable/updateTimetable', {
                timetable: timetableSubjects,
            });
            if (!response.data.success) throw new Error();
            toast({
                title: "Horário cadastrado com sucesso",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            setOnLoad(false);
            setAddSubjectModalData({
                period: "",
                subject: "",
                color: "blackAlpha.900",
                time: "",
            });
            addSubjectModalOnClose();
        } catch (err) {

            createToast("Erro ao adicionar horário");
        } finally {
            setOnLoad(false);
        }
    }


    return (
        <Modal isOpen={addSubjectModalIsOpen} onClose={addSubjectModalOnClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <ModalHeader>Adicionar horário</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        px={{
                            base: '0',
                            md: '4'
                        }}
                    >

                        <FormControl mb={3}>
                            <FormLabel>Período</FormLabel>
                            <Select onChange={e => setAddSubjectModalData({ ...addSubjectModalData, period: e.target.value })}>
                                <option value={''}>Selecione o período</option>
                                {Object.keys(periods).length > 0 && Object.keys(periods).map((id, index) => {
                                    return (
                                        <option key={index} value={id}>{periods[id].name}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl mb={3}>
                            <FormLabel>Matéria</FormLabel>
                            <Select
                                onChange={e => setAddSubjectModalData({ ...addSubjectModalData, subject: e.target.value })}
                                disabled={addSubjectModalData.period === ''}
                            >
                                <option value={''}>Selecione a matéria</option>
                                {addSubjectModalData.period !== '' && getSubjectsOptions()}
                            </Select>
                        </FormControl>

                        <FormControl mb={3}>
                            <FormLabel
                                display={'flex'}
                                alignItems={'center'}
                            >
                                Cor da matéria
                                <Tooltip label='A cor de fundo que sua matéria terá na grade' placement='top' hasArrow>
                                    <span style={{ marginLeft: '.375rem' }}>
                                        <FaRegQuestionCircle />
                                    </span>
                                </Tooltip>
                            </FormLabel>
                            <Select

                                onChange={e => setAddSubjectModalData({ ...addSubjectModalData, color: e.target.value })}
                            >
                                <option value="blackAlpha.900">Preto</option>
                                <option value="red.500">Vermelho</option>
                                <option value="red.700">Vinho</option>
                                <option value="orange.500">Laranja</option>
                                <option value="green.500">Verde</option>
                                <option value="blue.500">Azul</option>
                                <option value="blue.800">Azul escuro</option>
                                <option value="cyan.600">Ciano</option>
                                <option value="purple.500">Roxo</option>
                                <option value="pink.500">Rosa</option>
                            </Select>
                        </FormControl>

                        <FormControl mb={3}>
                            <FormLabel
                                display={'flex'}
                                alignItems={'center'}
                            >
                                Horário
                                <Tooltip label='Clique para visualizar o modelo' placement='top' hasArrow>
                                    <a
                                        style={{ marginLeft: '.375rem' }}
                                        href={'/assets/images/logged/timetable-translator.jpeg'}
                                        target={'_blank'}
                                        rel="noreferrer"
                                    >
                                        <FaRegQuestionCircle />
                                    </a>
                                </Tooltip>
                            </FormLabel>
                            <Input
                                value={addSubjectModalData.time}
                                onChange={e => setAddSubjectModalData({ ...addSubjectModalData, time: e.target.value.toUpperCase() })}
                                placeholder="234567T12345"
                            />
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