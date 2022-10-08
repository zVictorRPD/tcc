import { Button, Checkbox, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tooltip, useToast } from '@chakra-ui/react'
import Link from 'next/link';
import React, { useContext } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { TagsInput } from 'react-tag-input-component';
import { TimetableContext } from './TimetableContext';
import styles from './style.module.scss';

function AddSubjectModal() {
    const { addSubjectModalIsOpen, addSubjectModalOnClose } = useContext(TimetableContext);
    const toast = useToast()
    const [addSubjectModalData, setAddSubjectModalData] = React.useState<IAddSubjectModalTimetable>(
        {
            period: '',
            subject: '',
            defaultTimeType: true,
            times: [],
        }
    );

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

    const validateTime = (input: string) => {
        const time = input.toUpperCase();

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
            if (parseInt(weekdays[i]) < 1 || parseInt(weekdays[i]) > 7) {
                createToast('Os dias da semana devem conter apenas números entre 1 e 7');
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
        

        // if(timeAlreadyInList.length > 0){
        //     createToast('O horário já está na lista');
        //     return false;
        // }

        setAddSubjectModalData({ ...addSubjectModalData, times: [...addSubjectModalData.times, finalTime] });

        return true;
    }

    const removeTime = (time: string) => {
        const times = addSubjectModalData.times.filter(t => t != time.toUpperCase());
        setAddSubjectModalData({ ...addSubjectModalData, times: times });
    }

    const createTranslatedTime = (times: string[]) => {
        return (
            <>
                {times.map((time, index) => {
                    const period = time.includes('M') ? 'M' : time.includes('T') ? 'T' : 'N';
                    const weekdays = time.split(`${period}`)[0];
                    const hours = time.split(`${period}`)[1];

                    let weekdaysTranslated = '';

                    return (
                        <div key={index}>
                            <p>{time.toUpperCase()} = {weekdaysTranslated}</p>
                        </div>
                    )
                })}
            </>
        )

    }
    console.log(addSubjectModalData.times);


    return (
        <Modal isOpen={addSubjectModalIsOpen} onClose={addSubjectModalOnClose} size={"lg"}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Adicionar horário</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <FormControl mb={3}>
                        <FormLabel>Período</FormLabel>
                        <Select onChange={e => setAddSubjectModalData({ ...addSubjectModalData, period: e.target.value })}>
                            <option value={''}>Selecione o período</option>
                            <option value={'m_1'}>Valor 1</option>
                            <option value={'m_2'}>Valor 2</option>
                        </Select>
                    </FormControl>
                    <FormControl mb={3}>
                        <FormLabel>Matéria</FormLabel>
                        <Select onChange={e => setAddSubjectModalData({ ...addSubjectModalData, subject: e.target.value })}>
                            <option value={''}>Selecione a matéria</option>
                            <option value={'s_1'}>Valor 1</option>
                            <option value={'s_2'}>Valor 2</option>
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
                        <TagsInput
                            classNames={{
                                tag: styles.taginput_tag,
                                input: styles.taginput_input,
                            }}
                            value={addSubjectModalData.times}
                            beforeAddValidate={(tag: string) => validateTime(tag)}
                            onRemoved={(tag: string) => removeTime(tag)}
                            // onChange={value => setAddSubjectModalData({ ...addSubjectModalData, times: value })}
                            placeHolder="1234567T12345"
                        />
                    </FormControl>
                    {addSubjectModalData.times.length > 0 && createTranslatedTime(addSubjectModalData.times)}
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' mr={3} onClick={addSubjectModalOnClose}>
                        Cancelar
                    </Button>
                    <Button variant='blue-800'>Salvar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddSubjectModal