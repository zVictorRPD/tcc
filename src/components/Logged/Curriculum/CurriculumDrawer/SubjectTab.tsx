import { TableContainer, Table, Tbody, Tr, Th, Td, Tooltip, Box, Text, Switch, useToast, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import style from '../style.module.scss';
import { CurriculumContext } from '../curriculumContext';
import { handleMainTeacher, handleNumberLinks, handleNumberNotes, handleSubjectCount, handleSubjectGrade } from '../../../../functions/curriculum';
import { api } from '../../../../services/api';

function SubjectTab() {
    const theme = useColorModeValue("light", "dark");
	const { subjects, subjectsFilter, setSubjectsFilter } = useContext(CurriculumContext);
	const toast = useToast();
	const [onLoad, setOnLoad] = useState(false);
	
	const handleFilter = async (filter: string) => {
		const newFilter = {
			...subjectsFilter,
			[filter]: !subjectsFilter[filter]
		}
		try {
			setOnLoad(true);
			const response = await api.post('/curriculum/updateFilter', {
				filter: newFilter
			});
			if (!response.data.id) throw new Error('Erro ao atualizar o filtro de matérias');
			setSubjectsFilter(newFilter);
		} catch (err) {
			toast({
				title: "Erro ao atualizar",
				description: "Não foi possível atualizar o filtro de matérias",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top-right"
			});
		} finally {
			setOnLoad(false);
		}
	}
	return (
		<>
			<Text
				fontSize={'lg'}
				fontWeight={600}
				textAlign={'center'}
				mb={3}
			>
				Sobre as matérias
			</Text>
			<Box
				borderWidth={'1px'}
				borderRadius={'lg'}
				padding={3}
			>
				<TableContainer
					className={style.drawer_table_scrollbar}
				>
					<Table size='sm'>
						<Tbody>
							<Tr>
								<Th>N° total</Th>
								<Td isNumeric>{Object.keys(subjects).length}</Td>
							</Tr>
							<Tr>
								<Th>Pendente</Th>
								<Td isNumeric>{handleSubjectCount(subjects, 'todo')}</Td>
							</Tr>
							<Tr>
								<Th>Cursando</Th>
								<Td isNumeric>{handleSubjectCount(subjects, 'doing')}</Td>
							</Tr>
							<Tr>
								<Th>Aprovado</Th>
								<Td isNumeric>{handleSubjectCount(subjects, 'done')}</Td>
							</Tr>
							<Tr>
								<Th>
									Nota média
									<Tooltip
										label='É a média aritmética das notas das matérias aprovadas, cabe ressaltar que não tem relação com o Índice de Rendimento Acadêmico (IRA/CR).'
										placement='top'
									>
										<span>
											<FaRegQuestionCircle
												style={{ marginLeft: '.375rem', display: 'inline-block' }}
											/>
										</span>
									</Tooltip>
								</Th>
								<Td isNumeric>
									{handleSubjectGrade(subjects, false).toFixed(2)}
								</Td>
							</Tr>
							<Tr>
								<Th>
									Nota média futura
									<Tooltip
										label='É a média aritmética das notas de matérias aprovadas e de matérias que estão sendo cursadas, cabe ressaltar que não tem relação com o Índice de Rendimento Acadêmico (IRA/CR).'
										placement='top'
									>
										<span>
											<FaRegQuestionCircle
												style={{ marginLeft: '.375rem', display: 'inline-block' }}
											/>
										</span>
									</Tooltip>
								</Th>
								<Td isNumeric>
									{handleSubjectGrade(subjects, true).toFixed(2)}
								</Td>
							</Tr>
							<Tr>
								<Th>Professor mais atribuído</Th>
								<Td isNumeric>{handleMainTeacher(subjects)}</Td>
							</Tr>
							<Tr>
								<Th>Número de anotações</Th>
								<Td isNumeric>{handleNumberNotes(subjects)}</Td>
							</Tr>
							<Tr>
								<Th>Número de links</Th>
								<Td isNumeric>{handleNumberLinks(subjects)}</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
			<Text
				fontSize={'lg'}
				fontWeight={600}
				textAlign={'center'}
				my={3}
			>
				Exibir as matérias
			</Text>
			<Box
				borderWidth={'1px'}
				borderRadius={'lg'}
				padding={3}
				className={`${style.drawer_table_scrollbar} ${onLoad ? style.on_load : ''}`}
                data-theme={theme}
			>
				<TableContainer
					className={style.drawer_table_scrollbar}
				>
					<Table size='sm'>
						<Tbody>
							<Tr>
								<Th py={'7px'}>
									<Switch
										isChecked={subjectsFilter.obligatory}
										size='sm'
										mr={3}
										onChange={() => handleFilter('obligatory')}
									/>
									<Text display={'inline'}>Obrigatórias</Text>
								</Th>
							</Tr>
							<Tr>
								<Th py={'7px'}>
									<Switch
										isChecked={subjectsFilter.optional}
										size='sm'
										mr={3}
										onChange={() => handleFilter('optional')}
									/>
									<Text display={'inline'}>Optativas</Text>
								</Th>
							</Tr>
							<Tr>
								<Th py={'7px'}>
									<Switch
										isChecked={subjectsFilter.todo}
										size='sm'
										mr={3}
										onChange={() => handleFilter('todo')}
									/>
									<Text display={'inline'}>Pendentes</Text>
								</Th>
							</Tr>
							<Tr>
								<Th py={'7px'}>
									<Switch
										isChecked={subjectsFilter.doing}
										size='sm'
										mr={3}
										onChange={() => handleFilter('doing')}
									/>
									<Text display={'inline'}>Cursando</Text>
								</Th>
							</Tr>
							<Tr>
								<Th py={'7px'}>
									<Switch
										isChecked={subjectsFilter.done}
										size='sm'
										mr={3}
										onChange={() => handleFilter('done')}
									/>
									<Text display={'inline'}>Aprovadas</Text>
								</Th>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}

export default SubjectTab