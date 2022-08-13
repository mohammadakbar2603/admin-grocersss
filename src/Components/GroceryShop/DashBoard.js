import React from 'react';
import SideBar from './SideBar/SideBar';
import { Route, Routes, Navigate } from "react-router-dom";
import AdminHome from './AdminHome';
import Riders from '../Riders/Riders';
import Orders from '../Orders/Orders';
import Products from './Products';
import Customers from '../Customers/Customers';
import Logout from '../Auth/Logout';
import AddItem from './AddItem';



const DashBoard = () => {


    let routes = null;
    routes = (<Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {/*  <Route path="/" element={<DashBoard />} /> */}
        <Route path="/" element={<AdminHome />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/customers" element={<Customers />} />
        {/* <Route path="/stats" element={<Stats />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/additem" element={<AddItem />} />
        <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>)
    return (
        <div style={{ display: "flex" }}>
            <SideBar />
            <div style={{ flex: "4" }}>
                {routes}
            </div>
        </div>
    );
};

export default DashBoard;