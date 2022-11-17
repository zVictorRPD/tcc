/* eslint-disable import/no-anonymous-default-export */
import { Image } from '@chakra-ui/react';
import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'experimental-edge',
};

export default function () {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(90deg, rgba(61,89,126,1) 0%, rgba(42,67,101,1) 50%, rgba(24,44,71,1) 100%)',
                    fontSize: 32,
                    fontWeight: 600,
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.25 100.25">
                    <g>
                        <g>
                            <rect fill="none" strokeWidth='0.25px' x="0.13" y="0.13" width="100" height="100" rx="7.93" />
                            <polyline stroke="#fff" fill='none' strokeWidth='3px' strokeLinecap='round' strokeLinejoin='round' points="50.13 45.13 83.13 51.13 83.13 58.13" />
                            <circle stroke="#fff" fill='none' strokeWidth='3px' strokeLinecap='round' strokeLinejoin='round' cx="83.13" cy="62.13" r="3.5" />
                            <line stroke="#fff" fill='none' strokeWidth='3px' strokeLinecap='round' strokeLinejoin='round' x1="84.98" y1="65.09" x2="87.63" y2="69.63" />
                            <line stroke="#fff" fill='none' strokeWidth='3px' strokeLinecap='round' strokeLinejoin='round' x1="82.01" y1="65.44" x2="79.63" y2="69.63" />
                            <path stroke="#fff" fill='none' strokeWidth='3px' strokeLinecap='round' strokeLinejoin='round' d="M28.83,53.73l-.2,15.9s7,9,22,9,22-9,22-9V53.91" />
                            <path stroke="#fff" fill='none' strokeWidth='3px' strokeLinecap='round' strokeLinejoin='round' d="M28.63,64.26s9,8.37,22,8.37a35.94,35.94,0,0,0,22-8" />
                            <polygon stroke="#fff" fill='none' strokeWidth='3px' strokeLinecap='round' strokeLinejoin='round' points="50.63 25.63 12.63 45.63 50.63 64.63 89.63 45.63 50.63 25.63" />
                        </g>
                    </g>
                </svg>

                <h3 style={{ color: '#fff', marginBottom: '0px', marginTop: '16px' }}>Facilita Rural</h3>
                <p style={{ color: '#fff', fontSize: "20px", marginTop: '16px' }}>Organize a sua vida acadêmica na lendária UFRRJ</p>
            </div>
        ),
        {
            width: 1200,
            height: 600,
        },
    );
}