import React from "react";
import type { NextPage } from "next";
import styles from "./style.module.scss"
import { Box, Button, Container, Editable, EditableInput, EditablePreview, FormControl, FormLabel, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Select, Stack, Text } from "@chakra-ui/react";
import { FaAngleRight, FaChevronLeft, FaChevronRight, FaChevronDown, FaFilter } from "react-icons/fa";

const Subject: NextPage = () => {
    const [page, setPage] = React.useState(1);
    const [onLoad, setOnLoad] = React.useState(false);
    const [filterCamps, setFilterCamps] = React.useState({
        code: "",
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
            code: "",
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
                                        <FormLabel fontWeight={500}>Código</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="IC856"
                                            value={filterCamps.code}
                                            onChange={(e) => setFilterCamps({ ...filterCamps, code: e.target.value })}
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
                                    <th>Código</th>
                                    <th>Nome</th>
                                    <th>Departamento</th>
                                    <th>Horário</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>123</td>
                                                <td>Matemática</td>
                                                <td>Matemática</td>
                                                <td>Segunda, 8:00 - 10:00</td>
                                                <td>
                                                    <Menu>
                                                        <MenuButton size={'sm'} as={Button} rightIcon={<FaChevronDown />}>
                                                            Ações
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem>Download</MenuItem>
                                                            <MenuItem>Create a Copy</MenuItem>
                                                            <MenuItem>Mark as Draft</MenuItem>
                                                            <MenuItem>Delete</MenuItem>
                                                            <MenuItem>Attend a Workshop</MenuItem>
                                                        </MenuList>
                                                    </Menu>
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

export default Subject;
