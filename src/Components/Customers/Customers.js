import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import Customer from './Customer';
import { fetchCustomers, fetchOrders } from '../../redux/grocersssSlice';
import { Table } from 'reactstrap';
import './Customers.css';

const Customers = () => {
    const data = useSelector((state) => {
        return state
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCustomers());
        dispatch(fetchOrders());

    }, [dispatch]);


    let customers = null;
    if (data.customerErr) {
        customers = <p style={{
            border: '1px solid grey',
            boxShadow: '1px 1px #888888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px',
            width: '80%'

        }}>Sorry Failed to Load customers</p>
    } else {
        if (data.customers.length === 0) {
            customers = <p style={{
                border: '1px solid grey',
                boxShadow: '1px 1px #888888',
                borderRadius: '5px',
                padding: '20px',
                marginBottom: '10px'

            }}>You Have No customers</p>

        } else {

            customers = /* data.customers.slice(0).reverse().map(customer => {
                return <Customer customer={customer} key={customer.id} />
            }) */
                (
                    <Table striped>
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>
                                    User ID
                                </th>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Email
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.customers.slice(0).reverse().map((customer, index) => {
                                    const ord = data.orders.slice(0).reverse().filter(order => order.userId === customer.userId)
                                    return <Customer customer={customer} index={index}
                                        orders={ord} />
                                })
                            }
                        </tbody>
                    </Table>
                )
        }
    }

    document.title = "Customers | GROCERSSS Admin";

    return (
        <div className='container-fluid' style={{ marginTop: '20px' }}>
            {data.customerLoading ? <Spinner /> : customers}

        </div>
    );
};

export default Customers;
//
