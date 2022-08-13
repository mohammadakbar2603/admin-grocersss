import React, { useState } from 'react';
import { Card, Badge, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

const Customer = props => {

    let navigate = useNavigate();
    const [modal, setModal] = useState(false);

    /*  useEffect(() => {
         dispatch(fetchOrders());
     }, [dispatch]); */

    const toggleModal = () => {
        setModal(!modal);
        console.log(props.orders);
    }




    return (
        <tr key={props.index}>
            <td>{props.index + 1}</td>
            <td>{props.customer.userId}</td>
            <td>{props.customer.fname + " " + props.customer.lname}</td>
            <td>{props.customer.email}</td>
            <td>
                <Button variant="outlined" size="small"
                    onClick={toggleModal}
                >
                    Details
                </Button>
                <Modal
                    size='lg' centered scrollable
                    isOpen={modal} toggle={toggleModal}
                >
                    <ModalHeader className='row'>
                        <div className='col'><h5>Customer Id: {props.customer.userId}</h5></div>
                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div>
                                <strong> First Name:</strong>  {props.customer.fname}
                            </div>
                            <div>
                                <strong>Last Name:</strong>  {props.customer.lname}
                            </div>
                            <div>
                                <strong> Email:</strong>  {props.customer.email}
                            </div>
                            <div>
                                <strong> Registration Time:</strong>  {props.customer.registered}
                            </div>
                            <div>
                                <strong>Past Orders:</strong>
                                <ul>
                                    {props.orders.map(order => {
                                        return (
                                            <> <li key={order.id}><span style={{ color: 'red' }}>Order_Id:</span> {order.id} | <span style={{ color: 'red' }}>Date:</span> {new Date(order.orderTime).toString()} | <span style={{ color: 'red' }}>Status:</span> {order.status}</li><br />
                                            </>
                                        )
                                    })}
                                </ul>



                            </div>


                            <div className='text-start' style={{ paddingTop: "5px" }}>
                                <Button color="primary" size="small" onClick={toggleModal}
                                > Cancel </Button> </div>
                        </div>


                    </ModalBody>
                </Modal>
            </td>

        </tr>
    )
};


export default Customer;