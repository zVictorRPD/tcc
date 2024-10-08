import { Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormControl, FormLabel, HStack, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Text, Tooltip, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FaBuilding, FaEdit, FaEnvelope, FaPlus, FaRegQuestionCircle } from 'react-icons/fa';
import { updateSubjectColor } from '../../../../functions/timetable';
import { toCapitalize } from '../../../../functions/toCapitalize';
import { api } from '../../../../services/api';
import { TimetableContext } from '../TimetableContext';
import styles from '../style.module.scss';

interface IInformationsProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}


function Informations(props: IInformationsProps) {
	const { subjectModalOnClose, setSelectedSubject, selectedSubject, subjects, setSubjects, setTimetableSubjects, selectedColor, timetableSubjects } = useContext(TimetableContext);
	const { isOpen, onClose, onOpen } = props;
	const toast = useToast();
	const [onLoad, setOnLoad] = useState(false);
	const [onLoadDrawer, setOnLoadDrawer] = useState(false);
	const [subjectColor, setSubjectColor] = useState(selectedColor);
	const [teachers, setTeachers] = useState<ITeacher[]>([]);
	const [departaments, setDepartaments] = useState<IDepartament[]>([]);
	const [filterCamps, setFilterCamps] = useState({
		name: "",
		departament: "",
	});
    const lattesSrc = useColorModeValue("/assets/images/logged/svgs/lattes.svg", "/assets/images/logged/svgs/lattes_white.svg");
	const [grade, setGrade] = useState<number>(selectedSubject.grade || 0);
	const [editingGrade, setEditingGrade] = useState(false);
	const firstField = React.useRef() as React.MutableRefObject<HTMLInputElement>;

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
	};
	const getTeachers = async (e: any) => {
		e.preventDefault();
		if (filterCamps.name === "" && filterCamps.departament === "") {
			toast({
				title: "Preencha pelo menos um campo",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
			return;
		}
		setOnLoadDrawer(true);
		try {
			const response = await api.get('/teacher/getTeacher', {
				params: {
					page: 1,
					name: filterCamps.name,
					departament_code: filterCamps.departament,
					take: 50
				}
			});
			setTeachers(response.data.teachers);
			if (response.data.teachers.length === 0) {
				toast({
					title: "Nenhum professor encontrado",
					status: "info",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
			}
			if (response.data.teachers.length === 50) {
				toast({
					title: "Números de professores encontrados excedeu o limite de 50",
					description: "Para refinar sua busca, escolha um departamento ou insira um nome mais específico",
					status: "info",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
			}
		} catch {
			toast({
				title: "Erro ao buscar professores",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
		} finally {
			setOnLoadDrawer(false);
		}
	};

	const handleCreateTeacher = async (teacherId: number) => {
		setOnLoadDrawer(true);
		try {
			const response = await api.post('/curriculum/subject/createTeacher', {
				subjectId: selectedSubject.id,
				teacherId: teacherId.toString()
			});
			if (response.data.teacher) {
				toast({
					title: "Professor adicionado com sucesso",
					status: "success",
					duration: 3000,
					isClosable: true,
					position: "top-right",
				});
				setTeachers([]);
				setFilterCamps({
					name: "",
					departament: "",
				});
				setSubjects({
					...subjects,
					[selectedSubject.id]: {
						...subjects[selectedSubject.id],
						teacher: response.data.teacher
					}
				});
				setSelectedSubject({
					...selectedSubject,
					teacher: response.data.teacher
				});
				onClose();
			} else {
				throw new Error();
			}
		} catch {
			toast({
				title: "Erro ao adicionar professor",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			});
		} finally {
			setOnLoadDrawer(false);
		}
	};

	const handleSaveGrade = async (e: any) => {
		e.preventDefault();
		setOnLoad(true);
		try {
			const response = await api.post('/curriculum/subject/updateGrade', {
				subjectId: selectedSubject.id,
				grade,
			});
			if (!response.data.id) throw new Error();
			setSubjects({
				...subjects,
				[selectedSubject.id]: {
					...subjects[selectedSubject.id],
					grade: response.data.grade
				}
			});
			setSelectedSubject({
				...selectedSubject,
				grade: response.data.grade
			});
			setEditingGrade(false);

		} catch (err) {
			toast({
				title: "Não foi possível editar a nota",
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top-right",
			})
		} finally {
			setOnLoad(false);
		}
	}

	const changeColor = async (color: string) => {
		setOnLoad(true);
		setSubjectColor(color);
		const newTimetable = updateSubjectColor(selectedSubject.id, color, timetableSubjects);
		try {
			await api.post('timetable/updateTimetable', {
				timetable: newTimetable
			});
			setTimetableSubjects(newTimetable);
		} catch (error) {
			toast({
				title: 'Erro ao remover matéria',
				description: 'Tente novamente mais tarde',
				status: 'error',
				position: 'top-right',
				duration: 3000,
				isClosable: true
			})
		} finally {
			setOnLoad(false);
			subjectModalOnClose();
		}
	}

	useEffect(() => {
		if (grade !== selectedSubject.grade) {
			setEditingGrade(true);
			return;
		}
		setEditingGrade(false);
	}, [grade]);

	useEffect(() => {
		getDepartaments();
	}, [isOpen]);


	return (
		<>
			<form onSubmit={(e) => handleSaveGrade(e)}>
				<Flex flexDirection={'row'} alignItems={'center'}>
					<Text fontSize={'xl'} fontWeight={600}>
						Nota final:
					</Text>
					<NumberInput
						defaultValue={selectedSubject.grade || 0}
						precision={1}
						step={0.1}
						min={0}
						max={10}
						size={'sm'}
						ml={'.5rem'}
						maxW={'75px'}
						allowMouseWheel={true}
						onChange={(valueAsString: string, valueAsNumber: number) => setGrade(valueAsNumber)}
					>
						<NumberInputField value={grade} />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					{
						editingGrade && (
							<Button
								isLoading={onLoad}
								variant={'blue-800'}
								size={'sm'}
								type={'submit'}
								ml={'.5rem'}
							>
								Salvar nota
							</Button>
						)
					}
				</Flex>
			</form>
			<Divider my={'.5rem'} />


			<Text fontSize={'xl'} fontWeight={600}>
				Professor(a)
			</Text>
			{selectedSubject.teacher && (
				<Stack
					mt={'.5rem'}
					direction={'row'}
				>
					<Image
						src={selectedSubject.teacher.avatar}
						borderRadius={'full'}
						boxSize={'72px'}
						objectFit={'cover'}
						border={'2px solid #2a4365'}
						alt={selectedSubject.teacher.name}
						fallbackSrc={'/assets/images/logged/user-default-image.webp'}
					/>
					<Stack
						ml={'1rem !important'}
					>
						<Text fontSize={'lg'} fontWeight={600}>
							{selectedSubject.teacher.name}
						</Text>
						<HStack columnGap={'6px'}>
							{
								selectedSubject.teacher.email && (
									<a href={`mailto:${selectedSubject.teacher.email}`}>
										<Button
											variant={'outline'}
											size={'sm'}
											leftIcon={<FaEnvelope />}
										>
											Email
										</Button>
									</a>
								)
							}
							{
								selectedSubject.teacher.lattes && (
									<Button
										variant={'outline'}
										size={'sm'}
										leftIcon={
											<Image src={lattesSrc}
												alt="Lattes"
												w={'15px'}
												h={'18px'}
											/>}
									>
										<a href={selectedSubject.teacher.lattes} target={'_blank'} rel="noreferrer">
											Lattes
										</a>
									</Button>
								)
							}
							<Tooltip
								hasArrow
								placement='top'
								label={`${selectedSubject.teacher.departament_code} - ${toCapitalize(selectedSubject.teacher.departament_name)}`}
							>
								<Button
									variant={'outline'}
									size={'sm'}
									leftIcon={<FaBuilding />}
								>
									Dep.
								</Button>
							</Tooltip>
						</HStack>
					</Stack>
				</Stack>
			)}
			<Divider my={'.5rem'} />
			<Flex
				justifyContent={'end'}
			>
				<Button
					variant={'blue-800'}
					size={'sm'}
					rightIcon={selectedSubject.teacher ? <FaEdit /> : <FaPlus />}
					onClick={onOpen}
				>
					{selectedSubject.teacher ? 'Alterar professor' : 'Adicionar professor'}
				</Button>
			</Flex >
			<Divider my={'.5rem'} />
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
					onChange={e => changeColor(e.target.value)}
					value={subjectColor}
					isDisabled={onLoad}
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

			<Drawer
				isOpen={isOpen}
				placement='right'
				initialFocusRef={firstField}
				onClose={onClose}
				size={'md'}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth='1px'>
						{selectedSubject.teacher ? 'Alterar professor' : 'Adicionar professor'}
					</DrawerHeader>

					<DrawerBody>
						<form onSubmit={(e) => { getTeachers(e) }}>
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
								<Button variant={'blue-800'} isLoading={onLoadDrawer} type='submit'>Filtrar</Button>
							</HStack>
						</form>
						<Divider my={'.5rem'} />
						<Box
							h={'55vh'}
							overflowY={'auto'}
							className={styles.period_scrollbar}
						>
							{teachers.map((teacher, index) => (
								<Box key={index}>
									<HStack>
										<Text fontWeight={600}>
											{teacher.name}
										</Text>
										<Button
											variant={'blue-800'}
											size={'xs'}
											isDisabled={onLoadDrawer}
											onClick={() => handleCreateTeacher(teacher.id)}
											mr={'.5rem !important'}
											ml={'auto !important'}
										>
											Adicionar
										</Button>
									</HStack>

									<Divider my={'.5rem'} />
								</Box>
							))}
						</Box>
					</DrawerBody>

					<DrawerFooter borderTopWidth='1px'>
						<Button variant='outline' mr={3} onClick={onClose}>
							Cancelar
						</Button>

					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	)
}

export default Informations