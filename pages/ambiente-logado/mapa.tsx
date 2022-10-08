import React from "react";
import type { NextPage } from "next";
import MapContainer from "../../src/components/Logged/Map/MapContainer";
import { Box } from "@chakra-ui/react";

const Map: NextPage = () => {
    return (
        <>
            <Box
                p={'2rem'}
            >
                <MapContainer />
            </Box>
        </>
    );
};

export default Map;
