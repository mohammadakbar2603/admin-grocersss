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
import BarChart from './BarChart';
import PieChart from './PieChart';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import './AdminHome.css';

const AdminHome = () => {
    const data = useSelector((state) => {
        return state
    })
    const dispatch = useDispatch();


    //shob order kora products
    var allOrderProducts = data.orders?.map(order => {
        return order.items.map(item => { return item.title })
    });

    //shob order kora products er price
    var allOrderCostsArray = [];
    allOrderCostsArray.push(data.orders?.map(order => {
        return parseFloat(order.price);
    }))
    //totalrevenue
    const totalRevenue = allOrderCostsArray[0].reduce((partialSum, a) => partialSum + a, 0);

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //shob order kora products er time,  allOrderCostsArray er kaaj tao ebhabe kora jeto, taile 2d array lagtona
    var allOrderTimesArray = data.orders?.filter(order => { return new Date(order.orderTime).getTime() > (new Date().getTime() - 7 * 24 * 3600 * 1000) }).map(order => {
        return days[new Date(order.orderTime).getDay()];
        // return new Date(order.orderTime).getDay();
    })

    //Each day er purchase frequency ber korsi
    const findFrequency = (arr1 = [], arr2 = []) => {
        const res = [];
        let count = 0;
        for (let i = 0; i < arr2.length; i++) {
            for (let j = 0; j < arr1.length; j++) {
                if (arr2[i] === arr1[j]) {
                    count++;
                }
            }
            res.push(count);
            count = 0;
        }
        return res;
    };

    const last7DaysPurchase = findFrequency(allOrderTimesArray, days);

    //2d theke 1d korsi order kora products gula ke
    const allProducts = [];
    allOrderProducts.forEach(element => {
        element.forEach(item => {
            allProducts.push(item)
        });
    });

    //shob trending products desc order e nisi
    Array.prototype.byCount = function () {
        var itm, a = [], L = this.length, o = {};
        for (var i = 0; i < L; i++) {
            itm = this[i];
            if (!itm) continue;
            if (o[itm] == undefined) o[itm] = 1;
            else ++o[itm];
        }
        for (var p in o) a[a.length] = p;
        return a.sort(function (a, b) {
            return o[b] - o[a];
        });
    }

    const trendingProductsSorted = allProducts.byCount();

    //ekhane result array ber korsi jekhane trending orders + tader 
    const trendingProducts = (array) => {
        let a = [],
            b = [],
            arr = [...array], // clone array so we don't change the original when using .sort()
            prev;

        arr.sort();
        for (let element of arr) {
            if (element !== prev) {
                a.push(element);
                b.push(1);
            }
            else ++b[b.length - 1];
            prev = element;
        }

        return [a, b];
    }

    const result = trendingProducts(allProducts);
    //const trendingProducts = result[0];
    result.sort((a, b) => a[1] - b[1]);

    const trendingProductsSortedFrequency = result[1].sort((a, b) => { return b - a });//result[0] te shob trending orders er naam thake ar result[1] e tader amounts
    //result[0] diye trendProd er naam ber korinai, karon ota ber korleo sort korte partam na, tai byCount function use korsi

    /* console.log(trendingProductsSorted);
    console.log(trendingProductsSortedFrequency); */

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchRiders());
        dispatch(fetchCustomers());
        dispatch(fetchProductData());

    }, [dispatch]);

    document.title = "Statistics | GROCERSSS Admin";

    return (
        <div className='row container' style={{ display: "flex" }}>
            {/* for cards */}
            <div className='row container' style={{ margin: "10px", marginTop: '25px' }}>
                <div className='admin p-2 d-inline shadow align-items-center ' style={{ backgroundColor: "#d70f64", color: "white", borderRadius: "7px", width: "18%", height: "100px", marginRight: '10px', }}>
                    <div><h4>Total Revenue</h4></div>
                    <div className='h2'><PriceCheckIcon /> {parseFloat(totalRevenue).toFixed(2)}/-</div>
                </div>
                <div className='admin p-2 d-inline shadow align-items-center ' style={{ backgroundColor: "white", color: "#d70f64", borderRadius: "7px", width: "18%", height: "100px", marginRight: '10px', }}>
                    <div><h4>Total Customers</h4></div>
                    <div className='h2'><PeopleIcon /> {data.customers.length}</div>
                </div>

                <div className='admin p-2 d-inline shadow align-items-center' style={{ backgroundColor: "white", color: "#d70f64", borderRadius: "7px", width: "18%", height: "100px", marginRight: '10px' }}>
                    <div className='h4'>Total Products</div>
                    <div className='h2'><ShoppingBasketIcon /> {data.productData.length} </div>
                </div>
                <div className='admin p-2 d-inline shadow align-items-center' style={{ backgroundColor: "white", color: "#d70f64", borderRadius: "7px", width: "20%", height: "100px", marginRight: '10px' }}>
                    <div className='h4'>Registered Riders</div>

                    <div className='h2'><DeliveryDiningIcon /> {data.riders.length}</div>
                </div>
                <div className='admin p-2 d-inline shadow align-items-center' style={{ backgroundColor: "white", color: "#d70f64", borderRadius: "7px", width: "21%", height: "100px", }}>
                    <div className='h4'>Trending Product</div>

                    <div className='h4' style={{ overflow: 'hidden' }}><TrendingUpIcon />{trendingProductsSorted[0]}</div>
                </div>
            </div>


            {/* for graphs */}
            <div className='row m-2' >
                <div className='admin col-6 d-inline shadow align-items-center' style={{ borderRadius: '7px', width: '48%', marginRight: '35px' }}>
                    <h4 style={{ color: '#d70f64', padding: '10px', marginBottom: '30px' }}>Total Orders Per Day (Past 7 Days)</h4>
                    <BarChart last7DaysPurchase={last7DaysPurchase} />
                </div>
                <div className='admin col-6 pb-2 shadow align-items-center' style={{ borderRadius: '7px', width: '48%' }}>
                    <h4 style={{ color: '#d70f64', padding: '8px' }}>Most Popular Products</h4>
                    <PieChart trendingProductsSorted={trendingProductsSorted} trendingProductsSortedFrequency={trendingProductsSortedFrequency} />
                </div>

            </div>
            {/* for recent history */}
            <div className='row ' style={{ margin: "10px", }}>
                <div className='admin col-9 d-inline shadow' style={{ width: '66%', marginRight: '35px', padding: '10px', borderRadius: "10px" }}><h4 style={{ color: "#d70f64" }}>Latest Orders</h4>
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
                <div className='admin col-3 d-inline shadow' style={{ width: '30%', padding: '10px', borderRadius: "10px", }}><h4 style={{ color: "#d70f64" }}>Latest Customers</h4>

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
        </div >
    );
};

export default AdminHome;