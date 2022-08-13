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
    const appUser = useSelector(state => {
        return state.appUser;
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
        /* routes = (<Routes>
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="*" element={<Navigate replace to="/dashboard" />} />
        </Routes>) */
        routes = <DashBoard />
    }
    /* routes = (<Routes> */
    {/* <Route path="/" element={<Home />} /> */ }
    {/*  <Route path="/" element={<DashBoard />} /> */ }
    {/* <Route path="/" element={<AdminHome />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>) */}

    /* if (token === null) {
        routes = (<Routes>
            <Route path="/login" element={<AuthSelector />} />
            <Route path="*" element={<Navigate replace to="/login" />} />
        </Routes>)
    } else {
        if (appUser === "User") {
            routes = (<Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cartadvanced' element={<CartAdvanced />} />
                <Route path='/cart' element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>)
        } else if (appUser === "Admin") {
            routes = (<Routes>
                <Route path='/' element={<AdminHome />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>)
        } else if (appUser === "Rider") {
            routes = (<Routes>
                <Route path='/' element={<RiderHome />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>)
        }

    } */
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CartProvider>
                    <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
                        {/* <Header /> */}
                        {routes}
                    </SnackbarProvider>
                </CartProvider>
            </ThemeProvider>

        </div>
    );
};

export default Main;