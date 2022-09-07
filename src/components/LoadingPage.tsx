import { Box, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function LoadingPage() {
  return (
    <Stack h={'100vh'} w={'100vw'} justifyContent={'center'} alignItems={'center'}>
        <Box>
            <Text textAlign={'center'} fontSize={'4xl'}>Carregando...</Text>
        <img src="/assets/images/loading-spinner.svg" alt="Carregando..." />
        </Box>
    </Stack>
  )
}
