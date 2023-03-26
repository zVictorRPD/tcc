import { Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Image, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, Stack, Text, Tooltip, useColorModeValue, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FaBuilding, FaEnvelope, FaRegQuestionCircle } from 'react-icons/fa';
import { toCapitalize } from '../../../../functions/toCapitalize';
import { DashboardContext } from '../DashboardContext';

interface IInformationsProps {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}


function Informations(props: IInformationsProps) {
	const { selectedSubject } = useContext(DashboardContext);
	const lattesSrc = useColorModeValue("/assets/images/logged/svgs/lattes.svg", "/assets/images/logged/svgs/lattes_white.svg");
	
	return (
		<>
			<Flex flexDirection={'row'} alignItems={'center'}>
				<Text fontSize={'xl'} fontWeight={600}>
					Nota final: {selectedSubject.grade ?? 'Não informado'}
				</Text>
			</Flex>
			<Divider my={'.5rem'} />


			<Text fontSize={'xl'} fontWeight={600}>
				Professor(a)
			</Text>
			{selectedSubject.teacher && selectedSubject.teacher !== null ? (
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
			) : (
				<Text mt={2}>
                    Essa matéria não possui um professor cadastrado.
                </Text>
			)}
		</>
	)
}

export default Informations