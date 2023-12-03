import React, { useEffect, memo } from 'react'
import { useNavigate } from 'react-router-dom'
function NotFound({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => navigate("/"), 3000);
    }, [])


    return (
        <div className='w-full h-screen relative'>
            <img className='w-full h-full object-contain' src='https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg' />
        </div >
    )
}



export default memo(NotFound);