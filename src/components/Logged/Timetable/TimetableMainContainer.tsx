import { Box, Button, Flex, Image, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { getExcelData } from '../../../functions/timetable'
import SubjectGrid from './SubjectGrid'
import { TimetableContext } from './TimetableContext'
import { timeTableSchedule } from '../../../functions/timetable'
import WeekdaysGrid from './WeekdaysGrid'
import { useExcelDownloder } from 'react-xls';

function TimetableMainContainer() {
    const { onLoad, timetableSubjects, subjects } = useContext(TimetableContext);
    const [excelData, setExcelData] = useState({});
    const { ExcelDownloder, Type } = useExcelDownloder();
    const imgSrc = useColorModeValue('/assets/images/loading-spinner.svg', '/assets/images/white-loading-spinner.svg');
    useEffect(() => {
        if (subjects !== undefined && timetableSubjects !== undefined) {
            setExcelData(getExcelData(timetableSubjects, subjects));        
        }
    }, [timetableSubjects, subjects]);
    return (
        <>
            {!onLoad ? (
                <Stack
                    mx={{ base: '.5rem', md: '0' }}
                    h={'100%'}
                    overflow={'auto'}
                    position={'relative'}
                    p=".25rem"
                >
                    <WeekdaysGrid />
                    {timeTableSchedule.map((timeTable, index) => {
                        return <SubjectGrid key={index} type={timeTable} index={index} />
                    })}
                    <Box
                        position={'absolute'}
                        top={'-8px'}
                        left={'0'}
                        zIndex={1}
                    >
                        <Button
                            variant='blue-800'
                            size={'sm'}
                            as={ExcelDownloder}
                            data={excelData}
                            filename={'Grade horária'}
                            type={Type.Button}
                        >
                            Exportar grade
                        </Button>
                    </Box>
                </Stack>
            ) : (
                <Flex
                    h={'72vh'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Image src={imgSrc} w={'200px'} h={'200px'} alt="Carregando..." margin={'0 auto'} />
                </Flex>
            )
            }
        </>


    )
}

export default TimetableMainContainer