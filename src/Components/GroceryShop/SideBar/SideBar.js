import React from 'react';
import './../SideBar/SideBar.css';
import HouseIcon from '@mui/icons-material/House';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <div className='sidebarMenu'>
                    <h3 className='sidebarTitle' style={{ marginBottom: "8px" }}>DashBoard</h3>
                    <hr />
                    <div className='sidebarList'>
                        <NavLink className='sidebarListItem' style={{ textDecoration: 'none', color: '#d70f64' }} to='/'><BarChartIcon />Statistics</NavLink>
                        <NavLink className='sidebarListItem' style={{ textDecoration: 'none', color: '#d70f64' }} to='/riders'><DeliveryDiningIcon />Riders</NavLink>
                        <NavLink className='sidebarListItem' style={{ textDecoration: 'none', color: '#d70f64' }} to='/orders'><ArticleIcon />Orders</NavLink>
                        <NavLink className='sidebarListItem' style={{ textDecoration: 'none', color: '#d70f64' }} to='/customers'><PeopleIcon />Customers</NavLink>
                        <NavLink className='sidebarListItem' style={{ textDecoration: 'none', color: '#d70f64' }} to='/products'><ShoppingBagIcon />Products</NavLink>
                        {/* <NavLink className='sidebarListItem' style={{ textDecoration: 'none', color: '#d70f64' }} to='/stats'><BarChartIcon />Stats</NavLink><hr /> */}
                        <NavLink className='sidebarListItem mt-4' style={{ textDecoration: 'none', color: '#d70f64' }} to='/logout'><LogoutIcon />Logout</NavLink>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SideBar;