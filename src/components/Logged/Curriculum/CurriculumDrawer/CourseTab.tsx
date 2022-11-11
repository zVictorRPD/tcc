import { Box, Button, Flex, Progress, Table, TableContainer, Tbody, Td, Text, Th, Tooltip, Tr } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { toCapitalize } from '../../../../functions/toCapitalize';
import { CurriculumContext } from '../curriculumContext';
import { RiArrowLeftRightLine } from 'react-icons/ri'
import style from '../style.module.scss';
import { getDoneWorkload } from '../../../../functions/curriculum';

function CourseTab() {
	const { course, complementary, subjects } = useContext(CurriculumContext);
	const [viewType, setViewType] = useState<"done" | "remains">('done');
	const [doneWorkload, setDoneWorkload] = useState<IWorkload>({} as IWorkload);
	const [totalWorkload, setTotalWorkload] = useState<IWorkload>({
		complementary: course.workload_complementary,
		obrigatory: course.workload_normal_lessons + course.workload_academic_professional_guidance,
		optional: course.workload_optional_lessons,
		total: course.workload_total,
	} as IWorkload);
	const [courseProgress, setCourseProgress] = useState(0);

	useEffect(() => {
		setDoneWorkload(() => {
			const data = getDoneWorkload(subjects, complementary, false, totalWorkload);
			setCourseProgress(parseFloat(((data.total / totalWorkload.total) * 100).toFixed(2)));
			return data;
		});
	}, [course, complementary]);

	return (
		<>
			<Text
				fontSize={'lg'}
				fontWeight={600}
				textAlign={'center'}
				mb={3}
			>
				Sobre o curso
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
								<Th>Nome</Th>
								<Td>{toCapitalize(course.name)}</Td>
							</Tr>
							<Tr>
								<Th>Código</Th>
								<Td>{course.code}</Td>
							</Tr>
							<Tr>
								<Th>Criação da grade</Th>
								<Td>{course.period_emergence}</Td>
							</Tr>
							<Tr>
								<Th>CH. obrigatória
									<Tooltip
										label='Inclui todas as matérias obrigatórias e orientação Acadêmica/Profissional'
										placement='top'
									>
										<span>
											<FaRegQuestionCircle
												style={{ marginLeft: '.375rem', display: 'inline-block' }}
											/>
										</span>

									</Tooltip>
								</Th>
								<Td>{totalWorkload.obrigatory} horas</Td>
							</Tr>
							<Tr>
								<Th>CH. optativa</Th>
								<Td>{totalWorkload.optional} horas</Td>
							</Tr>
							<Tr>
								<Th>CH. complementar</Th>
								<Td>{totalWorkload.complementary} horas</Td>
							</Tr>
							<Tr>
								<Th>CH. total</Th>
								<Td>{totalWorkload.total} horas</Td>
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
				{viewType === 'done' ? 'Horas realizadas' : 'Horas restantes'}
			</Text>
			<Box
				borderWidth={'1px'}
				borderRadius={'lg'}
				padding={3}
			>
				<Flex
					justifyContent={'end'}
					mb={2}
				>
					<Button
						variant={'blue-800'}
						size='xs'
						onClick={() => setViewType(viewType === 'done' ? 'remains' : 'done')}
					>
						<RiArrowLeftRightLine />
					</Button>
				</Flex>
				<TableContainer
					className={style.drawer_table_scrollbar}
				>
					<Table size='sm'>
						<Tbody>
							<Tr>
								<Th>CH. obrigatória
									<Tooltip
										label='Inclui todas as matérias obrigatórias e orientação Acadêmica/Profissional'
										placement='top'
									>
										<span>
											<FaRegQuestionCircle
												style={{ marginLeft: '.375rem', display: 'inline-block' }}
											/>
										</span>

									</Tooltip>
								</Th>
								<Td>{viewType === 'done' ? doneWorkload.obrigatory : totalWorkload.obrigatory - doneWorkload.obrigatory} horas</Td>
							</Tr>
							<Tr>
								<Th>CH. optativa</Th>
								<Td>{viewType === 'done' ? doneWorkload.optional : totalWorkload.optional - doneWorkload.optional} horas</Td>
							</Tr>
							<Tr>
								<Th>CH. complementar</Th>
								<Td>{viewType === 'done' ? doneWorkload.complementary : totalWorkload.complementary - doneWorkload.complementary} horas</Td>
							</Tr>
							<Tr>
								<Th>CH. total</Th>
								<Td>{viewType === 'done' ? doneWorkload.total : totalWorkload.total - doneWorkload.total} horas</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
				<Text
					mb={2}
					mt={3}
					fontWeight={600}
					textAlign={'center'}
				>
					{viewType === 'done' ? `Você já fez ${courseProgress}` : `Falta você fazer ${(100 - courseProgress).toFixed(2)}`}% do curso
				</Text>
				<Progress
					colorScheme='whatsapp'
					size='md'
					value={courseProgress}
					hasStripe
					isAnimated
					mb={3}
				/>

			</Box>
		</>
	)
}

export default CourseTab