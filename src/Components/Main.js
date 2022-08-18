import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "react-use-cart";
import { Route, Routes, Navigate } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector, useDispatch } from "react-redux";
import { authCheck } from "../redux/grocersssSlice";
import DashBoard from "./GroceryShop/DashBoard";

import AdminAuth from "./Auth/AdminAuth";


const Main = () => {
    let theme = createTheme({
        palette: {
            primary: {
                main: '#d70f64',
            },
        },
    });

    const token = useSelector(state => {
        return state.token;
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authCheck());
    }, [dispatch]);

    let routes = null;
    if (token === null) {
        routes = (<Routes>
            <Route path="/login" element={<AdminAuth />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>)
    } else {
        routes = <DashBoard />
    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CartProvider>
                    <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
                        {routes}
                    </SnackbarProvider>
                </CartProvider>
            </ThemeProvider>

        </div>
    );
};

export default Main;