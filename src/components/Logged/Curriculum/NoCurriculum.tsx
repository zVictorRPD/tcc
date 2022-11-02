import { Flex, Button, Box, Text, Image } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { CurriculumContext } from './curriculumContext';

function NoCurriculum() {
    const { selectCurriculumModalOnOpen } = useContext(CurriculumContext);

    return (
        <Flex
            h={'91.7vh'}
            alignItems={'center'}
            justifyContent={'center'}
            p={{
                base: '.5rem',
                md: '2rem'
            }}
        >
            <Box
                textAlign={'center'}
                background={'white'}
                w={'100%'}
                h={'auto'}
                bg="white"
                borderRadius={'12px'}
                borderWidth="1px"
                borderColor={'gray.300'}
                p={{ base: '1.5rem', md: '2rem' }}
            >
                <Text
                    fontSize={{
                        base: '1.5rem',
                        md: '2rem'
                    }}
                    fontWeight={'600'}
                >
                    Pelo visto você é novo aqui!
                </Text>
                <Image
                    src="/assets/images/logged/svgs/curriculum.svg"
                    boxSize={{
                        base: '200px',
                        md: '300px',
                        lg: '400px',
                        xl: '500px',
                    }}
                    margin={'0 auto'}
                    alt="Carregando..."
                />
                <Text
                    fontSize={{
                        base: '1.25rem',
                        md: '1.5rem'
                    }}
                    my={'.5rem'}
                >
                    Clique no botão e selecione o seu curso para criar sua grade curricular!
                </Text>
                <Button
                    variant='blue-800'
                    onClick={() => {
                        selectCurriculumModalOnOpen();
                    }}
                    mt={'1rem'}
                >
                    Criar minha grade!
                </Button>
            </Box>
        </Flex>
    )
}

export default NoCurriculum