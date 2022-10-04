import React from "react";
import type { NextPage } from "next";
import styles from "./style.module.scss"
import {
    Box,
    Button,
    Editable,
    EditableInput,
    EditablePreview,
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
    Select
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaEnvelope, FaFilter } from "react-icons/fa";

const Teachers: NextPage = () => {
    const [page, setPage] = React.useState(1);
    const [onLoad, setOnLoad] = React.useState(false);
    const [filterCamps, setFilterCamps] = React.useState({
        name: "",
        departament: "",
    });
    const changePage = (page: number) => {
        if (Number(page) > 0 && Number(page) < 100) {
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
        setOnLoad(true);
        console.log(filterCamps);
        setOnLoad(false);
    }

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
                        <Popover placement='bottom-start'>
                            <PopoverTrigger>
                                <Button variant={"blue-800"} size="md" mb={'1rem'} leftIcon={<FaFilter />}>
                                    Filtros
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverHeader fontWeight='semibold'>Filtro</PopoverHeader>
                                <PopoverArrow />
                                <PopoverCloseButton />
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
                                            <option value='option1'>Option 1</option>
                                            <option value='option2'>Option 2</option>
                                            <option value='option3'>Option 3</option>
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
                        <table className={styles.custom_table}>
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
                                    [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    <Image src="/assets/images/logged/user-default-image.webp" alt="Foto do professor" boxSize="57px" />
                                                </td>
                                                <td>Victor de Oliveira Martins Azevedo</td>
                                                <td>DCOMP - DEPARTAMENTO DE COMPUTAÇÃO</td>
                                                <td>
                                                    <HStack columnGap={'8px'}>
                                                        <Button
                                                            variant={'outline'}
                                                            leftIcon={<FaEnvelope />}
                                                        >
                                                            <a href="mailto:victor2007azevedo@hotmail.com">
                                                                Email
                                                            </a>
                                                        </Button>
                                                        <Button
                                                            variant={'outline'}
                                                            leftIcon={
                                                                <Image src="/assets/images/logged/lattes.svg"
                                                                    alt="Lattes"
                                                                    w={'15px'}
                                                                    h={'18px'}
                                                                />}
                                                        >
                                                            <a href="https://lattes.com" target={'_blank'} rel="noreferrer">
                                                                Lattes
                                                            </a>
                                                        </Button>
                                                    </HStack>
                                                </td>
                                            </tr>
                                        )
                                    })
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
                                            <Editable
                                                value={page.toString()}
                                                onChange={value => setPage(parseInt(value))}
                                                onSubmit={(value) => changePage(parseInt(value))}
                                            >

                                                <Button variant={'outline'} px='0'>
                                                    <EditablePreview w="100%" />
                                                    <EditableInput w='20px' />
                                                </Button>
                                            </Editable>
                                            <Button
                                                variant={'outline'}
                                                onClick={() => changePage(page + 1)}
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
