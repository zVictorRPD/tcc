import React, { useState } from "react";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import process from "process";
import GoogleMapMarkers from "./GoogleMapMarkers";
import { locais } from "./locais";
import {
    Box,
    Grid,
    GridItem,
    Input,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import styles from "./style.module.scss";
import { FaChevronLeft } from "react-icons/fa";

const containerStyle = {
    width: "100%",
    height: "calc(85vh - 2px)",
};

const mapOptions = [
    {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "administrative",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "landscape",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
];

const darkMapOptions = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
    },
    {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
    },
    {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
    },
    {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
    },
    {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
    },
    {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
    },
    {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
    },
    {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.business",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "administrative",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "landscape",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
    {
        featureType: "administrative",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
    },
];

function MapContainer() {
    const [locales, setLocales] = useState<ILocal[]>(locais);
    const [search, setSearch] = useState<string>("");
    const [map, setMap] = useState<any>(null);
    const [center, setCenter] = useState({
        lat: -22.769076600925978,
        lng: -43.68511628825881,
    });
    const [listHeight, setListHeight] = useState("calc(85vh - 2px)");
    const [zoom, setZoom] = useState(15);
    const theme = useColorModeValue("light", "dark");
    const mapStyle = useColorModeValue(mapOptions, darkMapOptions);
    const handleListClick = (locale: ILocal) => {
        setCenter({
            lat: locale.lat,
            lng: locale.lng,
        });
        setZoom(18);
        if (window.innerWidth < 991) setListHeight("57px");
    };
    const handleCollapseList = () => {
        if (window.innerWidth > 991) return;

        if (listHeight === "calc(85vh - 2px)") {
            setListHeight("57px");
        } else {
            setListHeight("calc(85vh - 2px)");
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const filteredLocales = locais.filter((locale) =>
            locale.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setLocales(filteredLocales);
    };

    return (
        <Grid
            gridTemplateColumns={{
                base: "repeat (2,1fr)",
                lg: "300px 1fr",
            }}
            border={"1px solid #2a4365;"}
        >
            <GridItem
                colSpan={1}
                bg={useColorModeValue("white", "gray.900")}
                h={{
                    base: listHeight,
                    lg: "calc(85vh - 2px)",
                }}
                transition={{
                    base: "height 0.25s ease-out",
                    lg: "none",
                }}
            >
                <Box
                    p={"1rem"}
                    borderBottom={"1px solid #ccc"}
                    onClick={() => handleCollapseList()}
                    display={{
                        base: "flex",
                        lg: "block",
                    }}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Text fontWeight={600}>Locais do câmpus</Text>
                    <Box
                        display={{
                            base: "block",
                            lg: "none",
                        }}
                        transform={{
                            base:
                                listHeight === "calc(85vh - 2px)"
                                    ? "rotate(-90deg)"
                                    : "rotate(0deg)",
                            lg: "none",
                        }}
                        transition={"transform 0.25s ease-out"}
                    >
                        <FaChevronLeft />
                    </Box>
                </Box>

                <ul className={styles.mapList}>
                    <li>
                        <Input
                            placeholder={"Pesquisar"}
                            size={"sm"}
                            variant={"filled"}
                            _focus={{
                                borderColor: "blue.800",
                            }}
                            _hover={{
                                borderColor: "blue.800",
                            }}
                            _placeholder={{
                                color: useColorModeValue("blue.800", "white"),
                            }}
                            color={useColorModeValue("blue.800", "white")}
                            value={search}
                            onChange={(e) => handleSearch(e)}
                        />
                    </li>
                    {locales.map((locale) => (
                        <li
                            key={locale.id}
                            data-theme={theme}
                            onClick={() => handleListClick(locale)}
                        >
                            {locale.name}
                        </li>
                    ))}
                </ul>
            </GridItem>
            <GridItem>
                <LoadScriptNext
                    googleMapsApiKey={process.env.MAP_API_KEY || ""}
                    language={"pt-BR"}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                        options={{
                            styles: mapStyle,
                        }}
                        onLoad={(map) => {
                            setMap(map);
                        }}
                        onZoomChanged={() => {
                            if (map && typeof map.getZoom() !== "undefined") {
                                setZoom(map.getZoom());
                            }
                        }}
                    >
                        {/* Child components, such as markers, info windows, etc. */}
                        <GoogleMapMarkers locales={locales} theme={theme} />
                    </GoogleMap>
                </LoadScriptNext>
            </GridItem>
        </Grid>
    );
}

export default React.memo(MapContainer);
