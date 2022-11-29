import { Divider, HStack, Text, Box } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { DashboardContext } from '../DashboardContext';


export default function Notes() {
    const { selectedSubject } = useContext(DashboardContext);

    return (
        <>
            <Text fontSize={'xl'} fontWeight={600}>
                Anotações sobre a matéria
            </Text>
            <Divider my={'.5rem'} />
            <Text>
                {selectedSubject.note ?? 'Essa matéria não possui anotações cadastradas.'}
            </Text>
            <Divider my={'.5rem'} />
            <Text fontSize={'xl'} fontWeight={600} mb={'.5rem'}>
                Links úteis
            </Text>
            <Divider my={'.5rem'} />
            {selectedSubject.links && selectedSubject.links.length > 0 ? selectedSubject.links.map((link, index) => (
                <Box key={index}>
                    <HStack>
                        <Text fontWeight={600} color='blue.500'>
                            <a href={link.url} target='_blank' rel="noreferrer">
                                {link.name}
                            </a>
                        </Text>
                    </HStack>

                    <Divider my={'.5rem'} />
                </Box>
            )) : (
                <Text>
                    Essa matéria não possui links cadastrados.
                </Text>
            )}
        </>

    )
}
