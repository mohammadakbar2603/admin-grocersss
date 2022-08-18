import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { authFailed, logout } from '../../redux/grocersssSlice';

const Logout = () => {
    /* const { emptyCart } = useCart(); */

    const dispatch = useDispatch();
    useEffect(() => {/* 
        emptyCart(); */
        dispatch(logout());
        dispatch(authFailed(null));//To nullify any previously stored authfailedmsg
    }, [/* emptyCart, */ dispatch]);

    return (
        <Navigate to='/' replace />
    );
};

export default Logout;