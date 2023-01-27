import React from "react";
import type { NextPage } from "next";
import MapContainer from "../../src/components/Logged/Map/MapContainer";
import { Box } from "@chakra-ui/react";

const Map: NextPage = () => {
    return (
        <>
            <Box h={'100%'}>
                <MapContainer />
            </Box>
        </>
    );
};

export default Map;
