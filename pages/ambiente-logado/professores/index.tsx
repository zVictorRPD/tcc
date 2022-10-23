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
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Select,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaEnvelope, FaFilter } from "react-icons/fa";
import { api } from "../../../src/services/api";
import { toCapitalize } from "../../../src/functions/toCapitalize";
const Teachers: NextPage = () => {
    const [teachers, setTeachers] = useState<ITeacher[]>([]);
    const [departaments, setDepartaments] = useState<IDepartament[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [onLoad, setOnLoad] = useState(false);
    const { isOpen, onToggle, onClose } = useDisclosure();
    const toast = useToast();
    const [filterCamps, setFilterCamps] = useState({
        name: "",
        departament: "",
    });
    const getDepartaments = async () => {
        try {
            const response = await api.get("/departament/getDepartament");
            setDepartaments(response.data);
        } catch {
            toast({
                title: "Erro ao buscar departamentos",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    }

    const getTeachers = async (filtering: boolean = false) => {
        setOnLoad(true);
        try {
            const response = await api.get('/teacher/getTeacher', {
                params: {
                    page: page,
                    name: filterCamps.name,
                    departament_code: filterCamps.departament
                }
            });
            setTeachers(response.data.teachers);
            setTotalPages(response.data.totalPages);
            if (filtering) {
                toast({
                    title: "Filtro aplicado",
                    description: `Foram encontrados ${response.data.total} professores`,
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top-right",
                });
            }
        } catch {
            console.log("Erro ao buscar professores");
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
            name: "",
            departament: "",
        });
    }

    const submitFilter = () => {
        getTeachers(true);
        setPage(1);
        onClose();
    }

    useEffect(() => {
        getDepartaments();
    }, []);

    useEffect(() => {
        getTeachers();
    }, [page]);

    return (
        <>
            <Box p={{ base: '.5rem', md: '2rem' }}>
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
                                        <FormLabel fontWeight={500}>Nome</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Victor"
                                            value={filterCamps.name}
                                            onChange={(e) => setFilterCamps({ ...filterCamps, name: e.target.value })}
                                        />
                                    </FormControl>
                                    <FormControl mb={"1.5rem"}>
                                        <FormLabel fontWeight={500}>Departamento</FormLabel>
                                        <Select
                                            value={filterCamps.departament}
                                            onChange={(e) => setFilterCamps({ ...filterCamps, departament: e.target.value })}
                                        >
                                            <option value=''>Selecione um departamento</option>
                                            {departaments.map((departament) => (
                                                <option
                                                    key={departament.departament_code}
                                                    value={departament.departament_code}
                                                >
                                                    {toCapitalize(departament.departament_name)}
                                                </option>
                                            ))}
                                        </Select>
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
                            {...(teachers.length === 0 && { style: { minWidth: '0 !important' } })}
                        >
                            <thead>
                                <tr>
                                    <th>Foto</th>
                                    <th>Nome</th>
                                    <th>Departamento</th>
                                    <th>Links</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    teachers.length > 0 ? (
                                        teachers.map((teacher, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <Image
                                                            src={teacher.avatar}
                                                            alt="Foto do professor"
                                                            onError={(e) => {
                                                                e.currentTarget.src = '/assets/images/logged/user-default-image.webp';
                                                            }}
                                                            w={'46px'}
                                                            h={'57px'}
                                                            objectFit={'contain'}
                                                        />
                                                    </td>
                                                    <td>{toCapitalize(teacher.name)}</td>
                                                    <td>
                                                        {`${teacher.departament_code} - ${toCapitalize(teacher.departament_name)}`}
                                                    </td>
                                                    <td>
                                                        <HStack columnGap={'8px'}>
                                                            {
                                                                teacher.email && (
                                                                    <a href={`mailto:${teacher.email}`}>
                                                                        <Button
                                                                            variant={'outline'}
                                                                            leftIcon={<FaEnvelope />}
                                                                        >
                                                                            Email
                                                                        </Button>
                                                                    </a>
                                                                )
                                                            }
                                                            {
                                                                teacher.lattes && (
                                                                    <Button
                                                                        variant={'outline'}
                                                                        leftIcon={
                                                                            <Image src="/assets/images/logged/svgs/lattes.svg"
                                                                                alt="Lattes"
                                                                                w={'15px'}
                                                                                h={'18px'}
                                                                            />}
                                                                    >
                                                                        <a href={teacher.lattes} target={'_blank'} rel="noreferrer">
                                                                            Lattes
                                                                        </a>
                                                                    </Button>
                                                                )
                                                            }
                                                        </HStack>
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
                                                            Nenhum professor encontrado
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
                                    )}
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
        </>

    );
};

export default Teachers;
