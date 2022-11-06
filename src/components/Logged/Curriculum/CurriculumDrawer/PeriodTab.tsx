import { TableContainer, Table, Tbody, Tr, Th, Td, Tooltip, Text, Box, Thead, Switch, Button, Flex, useToast } from '@chakra-ui/react'
import React, { ChangeEvent, useContext, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { RiArrowLeftRightLine } from 'react-icons/ri';
import { periodTotalTime } from '../../../../functions/curriculum';
import { api } from '../../../../services/api';
import { CurriculumContext } from '../curriculumContext';
import style from '../style.module.scss';

function PeriodTab() {
	const { setPeriods, periods, subjects } = useContext(CurriculumContext);
	const [viewType, setViewType] = useState<"todo" | "doing" | "done" | "total">('todo');
	const [onLoad, setOnLoad] = useState(false);
	const toast = useToast();
	const handleViewType = () => {
		return viewType === 'todo' ? 'doing' : viewType === 'doing' ? 'done' : viewType === 'done' ? 'total' : 'todo'
	}
	const handleTableTitle = () => {
		return viewType === 'todo' ? 'Pendente' : viewType === 'doing' ? 'Cursando' : viewType === 'done' ? 'Aprovado' : 'Total'
	}

	const handlePeriodVisibility = async (periodId: string) => {
		setOnLoad(true);
		try {
			const response = await api.post('/curriculum/period/updateVisibility', {
				periodId,
				visibility: !periods[periodId].visible
			});
			if (!response.data.id) throw new Error('Erro ao atualizar visibilidade do período');
			const newPeriods = {
				...periods,
				[periodId]: {
					...periods[periodId],
					visible: !periods[periodId].visible
				}
			};
			setPeriods(newPeriods);
		} catch (err) {
			toast({
				title: "Erro ao atualizar",
				description: "Não foi possível atualizar a visibilidade do período",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top-right"
			});
		} finally {
			setOnLoad(false);
		}

	};

	return (
		<>
			<Text
				fontSize={'lg'}
				fontWeight={600}
				textAlign={'center'}
				mb={3}
			>
				Sobre os períodos
			</Text>
			<Box
				borderWidth={'1px'}
				borderRadius={'lg'}
				padding={2}
				className={`${style.drawer_table_scrollbar} ${onLoad ? style.on_load : ''}`}
			>
				<Flex
					justifyContent={'end'}
					mb={2}
				>
					<Button
						variant={'blue-800'}
						size='xs'
						onClick={() => setViewType(handleViewType)}
					>
						<RiArrowLeftRightLine />
					</Button>
				</Flex>
				<TableContainer>
					<Table size='sm'>
						<Thead>
							<Tr>
								<Th>Exibir</Th>
								<Th>Nome</Th>
								<Th isNumeric>N° de mat.</Th>
								<Th isNumeric>CH. {handleTableTitle()}</Th>
							</Tr>
						</Thead>
						<Tbody>
							{periods && Object.keys(periods).map((period, index) => (
								<Tr key={index}>
									<Td textAlign={'center'}>
										<Switch
											isChecked={periods[period].visible}
											size='sm'
											onChange={() => handlePeriodVisibility(period)}
										/>
									</Td>
									<Td>
										{periods[period].name}
									</Td>
									<Td isNumeric>
										{periods[period].subjectIds.length}
									</Td>
									<Td isNumeric>
										{periodTotalTime(periods[period].subjectIds, subjects, viewType)}
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}

export default PeriodTab