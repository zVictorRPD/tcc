import { TableContainer, Table, Tbody, Tr, Th, Td, Tooltip, Box, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import style from '../style.module.scss';
import { CurriculumContext } from '../curriculumContext';
import { handleMainTeacher, handleNumberLinks, handleNumberNotes, handleSubjectCount, handleSubjectGrade } from '../../../../functions/curriculum';

function SubjectTab() {
	const { subjects } = useContext(CurriculumContext);

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
		</>
	)
}

export default SubjectTab