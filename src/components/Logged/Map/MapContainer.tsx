import React, { useState } from 'react'
import { GoogleMap, LoadScriptNext, useJsApiLoader } from '@react-google-maps/api';
import process from 'process';
import GoogleMapMarkers from './GoogleMapMarkers';
import { locais } from './locais'
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import styles from './style.module.scss';
import { FaArrowLeft, FaChevronLeft } from 'react-icons/fa';

const containerStyle = {
    width: '100%',
    height: 'calc(85vh - 2px)',
};

const mapOptions = [
    {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.business',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'administrative',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'landscape',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
    },
    {
        featureType: 'administrative',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
    },
];



function MapContainer() {
    const [locales, setLocales] = useState<ILocal[]>(locais);
    const [map, setMap] = useState<any>(null);
    const [center, setCenter] = useState({
        lat: -22.769076600925978,
        lng: -43.68511628825881
    });
    const [listHeight, setListHeight] = useState('calc(85vh - 2px)');
    const [zoom, setZoom] = useState(15);
    const handleListClick = (locale: ILocal) => {
        setCenter({
            lat: locale.lat,
            lng: locale.lng
        });
        setZoom(18);
        if(window.innerWidth < 991) setListHeight('57px');
    }
    const handleCollapseList = () => {
        if (window.innerWidth > 991) return

        if (listHeight === 'calc(85vh - 2px)') {
            setListHeight('57px');
        } else {
            setListHeight('calc(85vh - 2px)');
        }
    }

    return (
        <Grid gridTemplateColumns={{
            base: 'repeat (2,1fr)',
            lg: '300px 1fr'
        }}
            border={'1px solid #2a4365;'}
        >
            <GridItem
                colSpan={1}
                bg={'white'}
                h={{
                    base: listHeight,
                    lg: 'calc(85vh - 2px)'
                }}
                transition={{
                    base: 'height 0.25s ease-out',
                    lg: 'none'
                }}
            >
                <Box
                    p={'1rem'}
                    borderBottom={'1px solid #ccc'}
                    onClick={() => handleCollapseList()}
                    display={{
                        base: 'flex',
                        lg: 'block'
                    }}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                >
                    <Text fontWeight={600}>
                        Locais do câmpus
                    </Text>
                    <Box
                        display={{
                            base: 'block',
                            lg: 'none'
                        }}
                        transform={{
                            base: listHeight === 'calc(85vh - 2px)' ? 'rotate(-90deg)' : 'rotate(0deg)',
                            lg: 'none'
                        }}
                        transition={'transform 0.25s ease-out'}
                    >
                        <FaChevronLeft />
                    </Box>

                </Box>

                <ul className={styles.mapList}>
                    {locales.map(locale => (
                        <li key={locale.id} onClick={() => handleListClick(locale)}>{locale.name}</li>
                    ))}
                </ul>
            </GridItem>
            <GridItem>
                <LoadScriptNext
                    googleMapsApiKey={process.env.MAP_API_KEY || ''}
                    language={'pt-BR'}
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={zoom}
                        options={{
                            styles: mapOptions,
                        }}
                        onLoad={map => {
                            setMap(map);
                        }}
                        onZoomChanged={() => {
                            if (map && typeof map.getZoom() !== 'undefined') {
                                setZoom(map.getZoom());
                            }
                        }}
                    >
                        { /* Child components, such as markers, info windows, etc. */}
                        <GoogleMapMarkers locales={locales} />
                    </GoogleMap>
                </LoadScriptNext >
            </GridItem>
        </Grid>

    )

}

export default React.memo(MapContainer)