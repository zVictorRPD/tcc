import React from "react";
import type { NextPage } from "next";
import MapContainer from "../../src/components/Logged/Map/MapContainer";
import { Box } from "@chakra-ui/react";

const Map: NextPage = () => {
    return (
        <>
            <Box
                p={{ base: '.5rem', md: '2rem' }} h={'100%'}
            >
                <MapContainer />
            </Box>
        </>
    );
};

export default Map;
