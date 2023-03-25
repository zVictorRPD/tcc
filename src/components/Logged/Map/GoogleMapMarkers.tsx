import React from 'react'
import { Marker } from '@react-google-maps/api';
import styles from './style.module.scss';


interface IGoogleMapMarkersProps {
    locales: ILocal[];
    theme: string;
}

const handleMarkerClick = (locale: ILocal) => {
    window.open(`https://www.google.com/maps/dir//${locale.lat},${locale.lng}/@${locale.lat},${locale.lng},18z`, '_blank');
}

function GoogleMapMarkers(props: IGoogleMapMarkersProps) {
    const { locales } = props;
    return (
        <>
            {locales.map(locale => (
                <Marker
                    key={locale.id}
                    label={{
                        text: locale.label,
                        color: props.theme === 'dark' ? '#fff' : '#000',
                        fontSize: '1rem',
                        fontWeight: props.theme === 'dark' ? '400' : '600',
                        className: props.theme === 'dark' ? '' : styles.markerLabel
                    }}
                    position={{
                        lat: locale.lat,
                        lng: locale.lng
                    }}
                    visible={true}
                    onClick={() => handleMarkerClick(locale)}
                />)
            )}
        </>
    )
}

export default GoogleMapMarkers