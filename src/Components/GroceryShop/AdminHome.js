import React, { useEffect } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RecentOrder from './RecentOrder';
import { Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductData, fetchOrders, fetchCustomers, fetchRiders } from '../../redux/grocersssSlice';
import RecentCustomer from './RecentCustomer';


const AdminHome = () => {
    const data = useSelector((state) => {
        return state
    })
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchRiders());
        dispatch(fetchCustomers());
        dispatch(fetchProductData());
    }, [dispatch]);



    return (
        <div className='row container' style={{ display: "flex" }}>
            {/* for cards */}
            <div className='row container' style={{ margin: "10px", marginTop: '25px' }}>
                <div className='col-3 p-2 d-inline shadow align-items-center' style={{ backgroundColor: "#d70f64", color: "white", borderRadius: "7px", width: "22%", height: "100px", marginRight: '35px' }}>
                    <div><h3>Total Customers</h3></div>
                    <div className='h2'><PeopleIcon /> {data.customers.length}</div>
                </div>

                <div className='col-3 p-2 d-inline shadow align-items-center' style={{ backgroundColor: "white", color: "#d70f64", borderRadius: "7px", width: "22%", height: "100px", marginRight: '35px' }}>
                    <div className='h3'>Total Products</div>
                    <div className='h2'><ShoppingBasketIcon /> {data.productData.length} </div>
                </div>
                <div className='col-3 p-2 d-inline shadow align-items-center' style={{ backgroundColor: "white", color: "#d70f64", borderRadius: "7px", width: "22%", height: "100px", marginRight: '35px' }}>
                    <div className='h3'>Available Riders</div>

                    <div className='h2'><DeliveryDiningIcon /> {data.riders.length}</div>
                </div>
                <div className='col-3 p-2 d-inline shadow align-items-center' style={{ backgroundColor: "white", color: "#d70f64", borderRadius: "7px", width: "24%", height: "100px", }}>
                    <div className='h3'>Trending Product</div>

                    <div className='h2'><TrendingUpIcon /> 1000</div>
                </div>
            </div>
            {/* for graphs */}
            <div className='row' >
                <div className='col-6'>Pie chart for ranking</div>
                <div className='col-6'>1 week sales bar chart</div>
                <div className='col-6'>Histogram</div>
            </div>
            {/* for recent history */}
            <div className='row ' style={{ margin: "10px", }}>
                <div className='col-9 d-inline shadow' style={{ width: '66%', marginRight: '35px', padding: '10px', borderRadius: "10px" }}><h4 style={{ color: "#d70f64" }}>Latest Orders</h4>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    Order ID
                                </th>
                                <th>
                                    Customer
                                </th>
                                <th>
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.orders.slice(0).reverse().slice(0, 4).map(order => {
                                    return <RecentOrder order={order} key={order.id} />
                                })
                            }
                        </tbody>

                    </Table>

                </div>
                <div className='col-3 d-inline shadow' style={{ width: '30%', padding: '10px', borderRadius: "10px" }}><h4 style={{ color: "#d70f64" }}>Latest Customers</h4>

                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>

                                <th>
                                    Name
                                </th>
                            </tr>
                        </thead>



                        <tbody>
                            {
                                [...new Set(
                                    data.orders.slice(0).reverse().map(order => { return order.customer.name })
                                )].slice(0, 4).map((customer, index) => {
                                    return <RecentCustomer customer={customer} index={index}
                                    />
                                })
                            }
                        </tbody>


                    </Table>

                </div>
            </div>
        </div>
    );
};

export default AdminHome;