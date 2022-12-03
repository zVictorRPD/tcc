import { Avatar, Box, Button, Divider, Flex, Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, Textarea, Tooltip, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa';
import { subjectCalculateRatings } from '../../../../functions/rating';
import { api } from '../../../../services/api';

interface SubjectModalProps {
    modalProps: {
        modalIsOpen: boolean;
        modalOnClose: () => void;
        selectedSubject: ISubjectList;
        userId: number;
    }
}

function SubjectModal(props: SubjectModalProps) {
    const toast = useToast();
    const { modalIsOpen, modalOnClose, selectedSubject, userId } = props.modalProps;
    const [addingRating, setAddingRating] = useState(false);
    const [onLoad, setOnLoad] = useState(true);
    const [complexity, setComplexity] = useState(0);
    const [relevance, setRelevance] = useState(0);
    const [subjectComplexity, setSubjectComplexity] = useState(0);
    const [subjectRelevance, setSubjectRelevance] = useState(0);
    const [subjectRatings, setSubjectRatings] = useState([]);
    const [comment, setComment] = useState('');

    const getRating = async () => {
        if (selectedSubject.code === undefined) return;

        setOnLoad(true);
        try {
            const response = await api.get(`/subject/getRatings`, {
                params: {
                    userId,
                    subjectCode: selectedSubject.code
                }
            });
            if (!response.data.subjectRating) throw new Error('Erro ao buscar as avaliações');
            const { subjectRating, userRating } = response.data;
            const result = subjectCalculateRatings(subjectRating);
            setSubjectComplexity(result.complexity);
            setSubjectRelevance(result.relevance);
            setSubjectRatings(subjectRating);
            if (userRating.length > 0) {
                setComplexity(userRating[0].complexity);
                setRelevance(userRating[0].relevance);
                setComment(userRating[0].comment);
            }
        } catch (err) {
            toast({
                title: "Erro ao buscar avaliação.",
                description: "Ocorreu um erro ao buscar as avaliações.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        } finally {
            setOnLoad(false);
        }
    };

    const handleSubmitRating = async () => {
        setOnLoad(true);
        try {
            const response = await api.post('/subject/createRating', {
                userId,
                subjectCode: selectedSubject.code,
                complexity,
                relevance,
                comment
            });
            if (!response.data.id) throw new Error('Erro ao enviar avaliação');
            toast({
                title: "Avaliação enviada",
                description: "A avaliação foi enviada com sucesso",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
            setAddingRating(false);
            getRating();
        } catch (err) {
            toast({
                title: "Erro ao enviar avaliação.",
                description: "Ocorreu um erro ao enviar a avaliação.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right"
            });
        } finally {
            setOnLoad(false);
        }
    };

    useEffect(() => {
        getRating();
    }, [selectedSubject]);

    return (
        <Modal
            isOpen={modalIsOpen}
            onClose={modalOnClose}
            size={"xl"}
        >
            <ModalOverlay />
            <ModalContent >
                <ModalHeader>{selectedSubject.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    px={{
                        base: '0',
                        md: '4'
                    }}
                >
                    <Tabs>
                        <TabList>
                            <Tab>Avaliações</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <>
                                    {!addingRating ? (
                                        <>
                                            <Text
                                                fontSize={{
                                                    base: '1rem',
                                                    md: '1.125rem',
                                                }}
                                                fontWeight="600"
                                                textAlign={'center'}
                                                mb="2"
                                            >
                                                Avaliação dos outros alunos
                                            </Text>
                                            <Grid
                                                templateColumns="repeat(2, 1fr)"
                                            >
                                                <GridItem>
                                                    <Flex
                                                        flexDirection={'column'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                    >
                                                        <Text
                                                            fontSize={{
                                                                base: '1rem',
                                                                md: '1.125rem',
                                                            }}
                                                            fontWeight="400"
                                                        >
                                                            Complexidade
                                                            <Tooltip
                                                                label='Representa a dificuldade da matéria'
                                                                placement='top'
                                                            >
                                                                <span
                                                                    style={{ fontSize: '14px' }}
                                                                >
                                                                    <FaRegQuestionCircle
                                                                        style={{ marginLeft: '.25rem', display: 'inline-block' }}
                                                                    />
                                                                </span>
                                                            </Tooltip>
                                                        </Text>
                                                        {onLoad ? (
                                                            <Skeleton w={'30px'} h={'30px'} />
                                                        ) : (
                                                            <Text
                                                                fontSize={{
                                                                    base: '1rem',
                                                                    md: '1.125rem',
                                                                    lg: '1.25rem'
                                                                }}
                                                                fontWeight="500"
                                                            >
                                                                {subjectComplexity}
                                                            </Text>
                                                        )}

                                                    </Flex>
                                                </GridItem>
                                                <GridItem>
                                                    <Flex
                                                        flexDirection={'column'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                    >
                                                        <Text
                                                            fontSize={{
                                                                base: '1rem',
                                                                md: '1.125rem',
                                                            }}
                                                            fontWeight="400"
                                                        >
                                                            Relevância
                                                            <Tooltip
                                                                label='Representa a importância da matéria para o seu curso'
                                                                placement='top'
                                                            >
                                                                <span
                                                                    style={{ fontSize: '14px' }}
                                                                >
                                                                    <FaRegQuestionCircle
                                                                        style={{ marginLeft: '.25rem', display: 'inline-block' }}
                                                                    />
                                                                </span>
                                                            </Tooltip>
                                                        </Text>
                                                        {onLoad ? (
                                                            <Skeleton w={'30px'} h={'30px'} />
                                                        ) : (
                                                            <Text
                                                                fontSize={{
                                                                    base: '1rem',
                                                                    md: '1.125rem',
                                                                    lg: '1.25rem'
                                                                }}
                                                                fontWeight="500"
                                                            >
                                                                {subjectRelevance}
                                                            </Text>
                                                        )}
                                                    </Flex>
                                                </GridItem>
                                            </Grid>
                                            {
                                                subjectRatings.length > 0 ? (
                                                    <Box mt="4">
                                                        <Divider my={3} />
                                                        <Text
                                                            fontSize={{
                                                                base: '1rem',
                                                                md: '1.125rem',
                                                            }}
                                                            fontWeight="600"
                                                            textAlign={'center'}
                                                            mb="2"
                                                        >
                                                            Comentários
                                                        </Text>
                                                        <Box
                                                            maxH={{
                                                                base: '200px',
                                                                md: '300px',
                                                            }}
                                                            overflowY="auto"
                                                        >
                                                            {subjectRatings.map((rating: any, index) => (
                                                                <Flex
                                                                    key={rating.id}
                                                                    pb="3"
                                                                    mb="3"
                                                                    borderBottom={index === subjectRatings.length - 1 ? 'none' : '1px solid #ccc'}
                                                                >
                                                                    <Avatar size={"sm"} src={rating.user.avatar} />
                                                                    <Flex
                                                                        flexDirection={'column'}
                                                                        ml="2"
                                                                    >
                                                                        <Text
                                                                            fontSize={{
                                                                                base: '0.75rem',
                                                                                md: '0.875rem',
                                                                            }}
                                                                            fontWeight="600"
                                                                        >
                                                                            {rating.user.name}
                                                                        </Text>
                                                                        <Text
                                                                            fontSize={{
                                                                                base: '0.75rem',
                                                                                md: '0.875rem',
                                                                            }}
                                                                            fontWeight="400"
                                                                        >
                                                                            {rating.comment}
                                                                        </Text>
                                                                    </Flex>

                                                                </Flex>
                                                            ))}
                                                        </Box>

                                                    </Box>
                                                ) : (
                                                    <Text
                                                        fontSize={{
                                                            base: '1rem',
                                                            md: '1.125rem',
                                                        }}
                                                        fontWeight="400"
                                                        textAlign={'center'}
                                                        mt="4"
                                                    >
                                                        Nenhum comentário
                                                    </Text>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <>
                                            <Text
                                                fontSize={{
                                                    base: '1rem',
                                                    md: '1.125rem',
                                                }}
                                                fontWeight="600"
                                                textAlign={'center'}
                                                mb="2"
                                            >
                                                Faça a sua avaliação
                                            </Text>
                                            <Grid
                                                templateColumns="repeat(2, 1fr)"
                                            >
                                                <GridItem
                                                    px={4}
                                                >
                                                    <Text
                                                        fontSize={{
                                                            base: '1rem',
                                                            md: '1.125rem',
                                                        }}
                                                        fontWeight="400"
                                                        textAlign={'center'}
                                                        mb="1"
                                                    >
                                                        Complexidade
                                                        <Tooltip
                                                            label='Representa a dificuldade da matéria'
                                                            placement='top'
                                                        >
                                                            <span
                                                                style={{ fontSize: '14px' }}
                                                            >
                                                                <FaRegQuestionCircle
                                                                    style={{ marginLeft: '.25rem', display: 'inline-block' }}
                                                                />
                                                            </span>
                                                        </Tooltip>
                                                    </Text>
                                                    <Slider
                                                        defaultValue={0}
                                                        min={0}
                                                        max={10}
                                                        step={1}
                                                        onChange={(value) => setComplexity(value)}
                                                        value={complexity}
                                                        isDisabled={onLoad}
                                                    >
                                                        <SliderTrack bg='blue.100'>
                                                            <Box position='relative' right={10} />
                                                            <SliderFilledTrack bg='blue.800' />
                                                        </SliderTrack>
                                                        <SliderThumb boxSize={6}>
                                                            <Text
                                                                fontWeight={600}
                                                            >
                                                                {complexity}
                                                            </Text>
                                                        </SliderThumb>
                                                    </Slider>
                                                </GridItem>
                                                <GridItem
                                                    px={4}
                                                >
                                                    <Text
                                                        fontSize={{
                                                            base: '1rem',
                                                            md: '1.125rem',
                                                        }}
                                                        fontWeight="400"
                                                        textAlign={'center'}
                                                        mb="1"
                                                    >
                                                        Relevância
                                                        <Tooltip
                                                            label='Representa a importância da matéria para o seu curso'
                                                            placement='top'
                                                        >
                                                            <span
                                                                style={{ fontSize: '14px' }}
                                                            >
                                                                <FaRegQuestionCircle
                                                                    style={{ marginLeft: '.25rem', display: 'inline-block' }}
                                                                />
                                                            </span>
                                                        </Tooltip>
                                                    </Text>
                                                    <Slider
                                                        defaultValue={0}
                                                        min={0}
                                                        max={10}
                                                        step={1}
                                                        onChange={(value) => setRelevance(value)}
                                                        value={relevance}
                                                        isDisabled={onLoad}
                                                    >
                                                        <SliderTrack bg='blue.100'>
                                                            <Box position='relative' right={10} />
                                                            <SliderFilledTrack bg='blue.800' />
                                                        </SliderTrack>
                                                        <SliderThumb boxSize={6}>
                                                            <Text
                                                                fontWeight={600}
                                                            >
                                                                {relevance}
                                                            </Text>
                                                        </SliderThumb>
                                                    </Slider>
                                                </GridItem>
                                            </Grid>

                                            <Textarea
                                                my={3}
                                                placeholder='Fale sobre sua experiência com a matéria'
                                                resize={'none'}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                isDisabled={onLoad}
                                            />
                                        </>
                                    )}
                                    <Divider my={3} />
                                    <Flex
                                        justifyContent={'end'}
                                    >
                                        {!addingRating ? (
                                            <>
                                                <Button
                                                    variant={'blue-800'}
                                                    size={'sm'}
                                                    onClick={() => setAddingRating(true)}
                                                >
                                                    Enviar uma avaliação
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    variant='outline'
                                                    mr={3}
                                                    onClick={() => setAddingRating(false)}
                                                    size={'sm'}
                                                >
                                                    Voltar
                                                </Button>
                                                <Button
                                                    variant={'blue-800'}
                                                    size={'sm'}
                                                    onClick={handleSubmitRating}
                                                >
                                                    Enviar
                                                </Button>
                                            </>

                                        )}

                                    </Flex>
                                </>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' mr={3} onClick={modalOnClose}>
                        Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default SubjectModal