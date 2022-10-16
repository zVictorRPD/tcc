import React, { useState } from 'react'
import { GoogleMap, LoadScriptNext, useJsApiLoader } from '@react-google-maps/api';
import process from 'process';
import GoogleMapMarkers from './GoogleMapMarkers';
import { locais } from './locais'
import { Grid, GridItem } from '@chakra-ui/react';
import styles from './style.module.scss';

const containerStyle = {
    width: '100%',
    height: '85vh'
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
    const handleListClick = (locale:ILocal) => {
        setCenter({
            lat: locale.lat,
            lng: locale.lng
        })
    }
    return (
        <Grid gridTemplateColumns={{
            base: 'repeat (2,1fr)',
            md: '300px 1fr'
        }}>
            <GridItem colSpan={1} bg={'white'}>
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
                        zoom={15}
                        options={{
                            styles: mapOptions,
                        }}
                        onLoad={map => {
                            setMap(map);
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