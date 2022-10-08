import React from 'react'
import { GoogleMap, LoadScriptNext, useJsApiLoader } from '@react-google-maps/api';
import process from 'process';

const containerStyle = {
    width: '100%',
    height: '85vh'
};

const center = {
    lat: -22.769076600925978,
    lng: -43.68511628825881
};

function MapContainer() {
    return (
        <LoadScriptNext
            googleMapsApiKey={''}
            language={'pt-BR'}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={15}

            >
                { /* Child components, such as markers, info windows, etc. */}
                <></>
            </GoogleMap>
        </LoadScriptNext>
    )

}

export default React.memo(MapContainer)