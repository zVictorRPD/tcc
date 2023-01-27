import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import styles from "./style.module.scss"
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Image,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";

import { FaChevronLeft, FaChevronRight, FaChevronDown, FaFilter, FaEye } from "react-icons/fa";
import { api } from "../../../src/services/api";
import { toCapitalize } from "../../../src/functions/toCapitalize";
import { validateSubjectCode } from "../../../src/functions/validation";
import SubjectModal from "../../../src/components/Logged/Subject/SubjectModal/SubjectModal";

const Subjects: NextPage = () => {
    const [subjects, setSubjects] = useState<ISubjectList[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<ISubjectList>({} as ISubjectList);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [onLoad, setOnLoad] = useState(false);
    const { isOpen, onToggle, onClose } = useDisclosure();
    const {
        isOpen: modalIsOpen,
        onOpen: modalOnOpen,
        onClose: modalOnClose
    } = useDisclosure();
    const toast = useToast();
    const [filterCamps, setFilterCamps] = useState({
        code: "",
        name: "",
        time: "",
    });

    const getSubjects = async (filtering: boolean = false) => {
        setOnLoad(true);
        try {
            const response = await api.get('/subject/getSubject', {
                params: {
                    page: page,
                    code: filterCamps.code,
                    name: filterCamps.name,
                    time: filterCamps.time
                }
            });

            setSubjects(response.data.subjects);
            setTotalPages(response.data.totalPages);
            if (filtering) {
                toast({
                    title: "Filtro aplicado",
                    description: `Foram encontradas ${response.data.total} matérias`,
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        } catch {
            console.log("Erro ao buscar matérias");
        } finally {
            setOnLoad(false);
        }
    };

    const changePage = (page: number) => {
        if (Number(page) > 0 && Number(page) <= totalPages) {
            setPage(page);
        } else {
            setPage(1);
            return;
        }
    }
    const clearFilter = () => {
        setFilterCamps({
            code: "",
            name: "",
            time: "",
        });
    }

    const submitFilter = () => {
        if (!validateSubjectCode(filterCamps.code) && filterCamps.code !== "") {
            toast({
                title: "Código inválido",
                description: "O código deve conter 2 letras seguidas de 3 números",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            return;
        }
        getSubjects(true);
        setPage(1);
        onClose();
    }

    useEffect(() => {
        getSubjects();
    }, [page]);

    return (
        <>
            <Box>
                <Box
                    p={{ base: '.5rem', md: '1rem' }}
                    bg="white"
                    borderRadius={'12px'}
                    borderWidth="1px"
                    borderColor={'gray.300'}
                >
                    <Box>
                        <Popover
                            placement='bottom-start'
                            isOpen={isOpen}

                        >
                            <PopoverTrigger>
                                <Button
                                    variant={"blue-800"}
                                    size="md"
                                    mb={'1rem'}
                                    leftIcon={<FaFilter />}
                                    onClick={onToggle}
                                >
                                    Filtros
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverHeader fontWeight='semibold'>Filtro</PopoverHeader>
                                <PopoverArrow />
                                <PopoverCloseButton onClick={onClose} />
                                <PopoverBody p={'1rem'}>
                                    <FormControl mb={"1rem"}>
                                        <FormLabel fontWeight={500}>Código</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="XX999"
                                            value={filterCamps.code}
                                            onChange={(e) => setFilterCamps({ ...filterCamps, code: e.target.value.toUpperCase() })}
                                            maxLength={5}
                                        />
                                    </FormControl>
                                    <FormControl mb={"1rem"}>
                                        <FormLabel fontWeight={500}>Nome</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Cálculo"
                                            value={filterCamps.name}
                                            onChange={(e) => setFilterCamps({ ...filterCamps, name: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl mb={"1.5rem"}>
                                        <FormLabel fontWeight={500}>Carga horária</FormLabel>
                                        <NumberInput
                                            isValidCharacter={char => '0123456789'.includes(char)}
                                            onChange={(value) => setFilterCamps({ ...filterCamps, time: value })}
                                            value={filterCamps.time}

                                        >
                                            <NumberInputField placeholder="60" />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                    <HStack justifyContent={'flex-end'} columnGap={'8px'}>
                                        <Button variant={'outline'} onClick={clearFilter}>Limpar</Button>
                                        <Button variant={'blue-800'} onClick={submitFilter} isLoading={onLoad}>Filtrar</Button>
                                    </HStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                    <Box overflowX={'auto'} className={styles.table_scrollbar}>
                        <table
                            className={`${styles.custom_table} ${onLoad ? styles.on_load : ''}`}
                            {...(subjects.length === 0 && { style: { minWidth: '0 !important' } })}
                        >
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Carga horaria</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subjects.length > 0 ? (
                                        subjects.map((subject: ISubjectList, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{subject.code}</td>
                                                    <td>{toCapitalize(subject.name)}</td>
                                                    <td>{subject.time !== 0 ? `${subject.time} Horas` : 'Desconhecida'}</td>
                                                    <td>
                                                        <Button
                                                            variant={'blue-800'}
                                                            size={'sm'}
                                                            onClick={() => {
                                                                setSelectedSubject(subject);
                                                                modalOnOpen();
                                                            }}
                                                        >
                                                            Ver as avaliações
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan={4}>
                                                {!onLoad ? (
                                                    <>
                                                        <Text
                                                            fontSize={'2xl'}
                                                            fontWeight={600}
                                                            my={2}
                                                            textAlign={'center'}
                                                        >
                                                            Nenhuma matéria encontrada
                                                        </Text>
                                                        <Flex justifyContent={'center'}>
                                                            <Image src="/assets/images/logged/svgs/empty.svg"
                                                                alt="vazio"
                                                                w={{
                                                                    base: '200px',
                                                                    md: '300px',
                                                                    lg: '400px'
                                                                }}
                                                                h={{
                                                                    base: '200px',
                                                                    md: '300px',
                                                                    lg: '400px'
                                                                }}
                                                            />
                                                        </Flex>
                                                    </>
                                                ) : (
                                                    <Box h={'60vh'}></Box>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>
                                        <HStack justifyContent={'flex-end'} columnGap={'8px'} pt={'1rem'}>
                                            <Button
                                                variant={'outline'}
                                                onClick={() => changePage(page - 1)}
                                                disabled={page == 1}
                                            >
                                                <FaChevronLeft />
                                            </Button>
                                            <Button variant={'outline'} px='0'>
                                                {page}
                                            </Button>
                                            <Button
                                                variant={'outline'}
                                                onClick={() => changePage(page + 1)}
                                                disabled={page == totalPages}
                                            >
                                                <FaChevronRight />
                                            </Button>
                                        </HStack>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </Box>

                </Box>
            </Box>
            <SubjectModal modalProps={{
                modalIsOpen,
                modalOnClose,
                selectedSubject,
            }} />
        </>

    );
};

export default Subjects;
