import React from 'react';
import { PulseLoader } from 'react-spinners';

export default function Loading() {
    return (
        <PulseLoader
            className='absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]'
            color="crimson"
            loading
            margin={5}
            size={20}
            speedMultiplier={1}
        />

    )
}
