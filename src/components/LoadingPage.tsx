import { Box, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function LoadingPage() {
  return (
    <Stack h={'100vh'} w={'100vw'} justifyContent={'center'} alignItems={'center'}>
      <Box>
        <Image src="/assets/images/loading-spinner.svg" w={'200px'} h={'200px'} alt="Carregando..." margin={'0 auto'} />
      </Box>
    </Stack>
  )
}
