import React, { useState } from 'react';
import { Card, Badge, CardBody, CardTitle, CardText, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useSnackbar } from 'notistack';

const Order = props => {
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [riderModal, setRiderModal] = useState(false);
    const toggleRiderModal = () => {
        //console.log(props.riders);
        setRiderModal(!riderModal);
    }

    const [cancelOrderModal, setCancelOrderModal] = useState(false);
    const toggleCancelOrderModal = () => setCancelOrderModal(!cancelOrderModal);


    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (variant) => {
        enqueueSnackbar(props.order.id + 'is Cancelled', { variant });
    };


    const handleBadge = (status) => {
        if (status === "Pending") return "warning";
        else if (status === "Completed") return "success";
        else if (status === "Processing") return "info";
        else if (status === "Awaiting Confirmation") return "secondary";
        else return "danger";

    }


    const itemSummary = props.order.items?.map(item => {
        return (
            <li style={{
                padding: '5px',
                marginLeft: '20px'
            }} key={item.id}>
                <div className='row' style={{ fontWeight: 'bold' }}>
                    <div className='col-8'>{item.title} ({item.quantity}) :</div>
                    <div className='col-4'>BDT {item.itemTotal}</div>
                </div>

            </li>
        )
    })
    return (
        <div className='container' style={{ marginBottom: '-15px' }}>
            <Card className='shadow' style={{ borderRadius: '10px' }}>
                <CardBody>
                    <CardTitle className='row'>
                        <div className='col-8 col-md-10'><h5>{props.index + 1}. Order Id: {props.order.id}</h5></div>

                        <div className='col-4 col-md-2'><span>Status: </span><Badge color={handleBadge(props.order.status)} pill>{props.order.status}</Badge></div>
                    </CardTitle>
                    <CardText
                        className="mb-2"
                    >
                        <div>Date: {new Date(props.order.orderTime).toString()}</div>

                        <div>Delivery Address: {props.order.customer.deliveryAddress}</div>


                        {/*  <div>Total Items: {props.order.totalItems}</div>
                        <div className='row'>
                            <div className='col-8 col-lg-10'>
                                Payment Type: {props.order.customer.paymentType}
                            </div>
                            <div className='col-4 col-lg-2' style={{ fontWeight: 'bold' }}><span style={{ fontSize: '20px' }}>BDT  {props.order.price}</span></div>
                        </div> */}

                        <div className='row' style={{ marginTop: "5px" }}>
                            <div className='col-9'>
                                <Button variant="outlined" /* style={{ backgroundColor: '#d70f64', border: 'none', color: 'white', }} */
                                    onClick={toggleModal}
                                >
                                    Details
                                </Button>
                            </div>
                            <div className='col-3'>
                                <Button disabled={props.order.status !== "Pending"} size='small' color="warning" variant="contained" onClick={toggleRiderModal/* () => navigate("/riders", { replace: true }) */}
                                    style={{ marginRight: '5px' }}
                                >
                                    Assign Rider
                                </Button>

                                <Button disabled={props.order.status === "Cancelled" || props.order.status === "Awaiting Confirmation" || props.order.status === "Completed"} variant="contained" color="primary" size="small" onClick={toggleCancelOrderModal}>
                                    Cancel Order
                                </Button>
                            </div>
                        </div>


                    </CardText>
                </CardBody>
            </Card>
            <br />

            <div>
                <Modal
                    size='lg' centered scrollable
                    isOpen={modal} toggle={toggleModal}

                >
                    <ModalHeader className='row'>
                        {/* Order Id:{props.order.id} */}
                        <div className='col'><h5>Order Id: {props.order.id}</h5></div>

                        <div className='col' style={{ fontSize: '15px' }}><span>Status: </span><Badge color={handleBadge(props.order.status)} pill>{props.order.status}</Badge></div>
                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div>Customer ID: {props.order.userId}</div>
                            <div>Customer Name: {props.order.customer.name}</div>
                            <div >Rider Id: {props.order.rider}</div>
                            <div className='col-12'>Purchased Items:</div>
                            <ul>{itemSummary}</ul>

                        </div>


                        <div>
                            Voucher: {props.order.voucherAmount}Tk ({props.order.voucherName})
                        </div>

                        <div>
                            Delivery Address:  {props.order.customer.deliveryAddress}
                        </div>

                        <div>
                            Payment Type: {props.order.customer.paymentType}
                        </div>

                        <div>
                            Date: {new Date(props.order.orderTime).toString()}
                        </div>
                        <hr />
                        <div className='row'>
                            <div className="col-9 p-2" align='left'>
                                <h5 style={{ fontWeight: 'bold' }}>BDT {props.order.price}</h5>
                            </div>
                            <div className='col-3 text-end'>
                                <Button color="primary" size="small" onClick={toggleModal}
                                > Cancel </Button> </div>
                        </div>
                    </ModalBody>
                </Modal>

                <Modal
                    isOpen={cancelOrderModal} toggle={toggleCancelOrderModal} size='lg' centered
                >  <ModalHeader>Cancel Order</ModalHeader>
                    <ModalBody>
                        <div>
                            <div>Are you sure you want to cancel order, Order-ID: {props.order.id}?</div>
                            <br />
                            <div> <Button

                                onClick={() => Promise.all([
                                    axios.patch("https://grocersss-d8d44-default-rtdb.firebaseio.com/orders/" + props.order.id + ".json", { status: 'Cancelled' }),

                                    props.riders.slice(0).reverse()
                                        .filter(rider => rider.userId === props.order.rider)
                                        .map(rider => axios.patch("https://grocersss-d8d44-default-rtdb.firebaseio.com/riderData/" + rider.id + ".json", { status: 'Idle' }))
                                ])

                                    .then(response => {
                                        handleClickVariant('error');
                                        toggleCancelOrderModal();
                                    })}

                                color='error' style={{ marginRight: "10px" }} size="sm">
                                Yes <DeleteIcon />
                            </Button>
                                <Button onClick={toggleCancelOrderModal} color='success' size="sm">
                                    No <CloseIcon />
                                </Button></div>
                        </div>
                    </ModalBody>

                </Modal>

                <Modal
                    size='lg' centered scrollable
                    isOpen={riderModal} toggle={toggleRiderModal}

                >
                    <ModalHeader className='row'>Assign Rider</ModalHeader>
                    <ModalBody>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>
                                        Rider ID
                                    </th>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                        Status
                                    </th>
                                    <th>

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.riders.slice(0).reverse()
                                        .filter(rider => rider.status === "Idle")
                                        .map((rider, index) => {
                                            //return <RiderAssignment key={Math.random()} rider={rider} index={index} order={props.order} toggleRiderModal={toggleRiderModal} />
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{rider.userId}</td>
                                                    <td>{rider.fname + " " + rider.lname}</td>
                                                    <td>{rider.email}</td>
                                                    <td>{rider.status}</td>
                                                    <td>
                                                        <Button variant="outlined" size="small" /* style={{ backgroundColor: '#d70f64', border: 'none', color: 'white', }} */

                                                            onClick={() => Promise.all([
                                                                axios.patch("https://grocersss-d8d44-default-rtdb.firebaseio.com/orders/" + props.order.id + ".json", { status: 'Processing', rider: rider.userId }),
                                                                axios.patch("https://grocersss-d8d44-default-rtdb.firebaseio.com/riderData/" + rider.id + ".json", { status: 'On Duty' })
                                                            ])
                                                                .then(response => {
                                                                    enqueueSnackbar(rider.id + 'is assigned for the order', { variant: 'success' });
                                                                    toggleRiderModal();
                                                                })}
                                                        /* onClick={() => axios.patch("https://grocersss-d8d44-default-rtdb.firebaseio.com/orders/" + props.order.id + ".json", { status: 'Processing' })
                                                            .then(response => {
                                                                handleClickVariant('success');
                                                                //toggleCancelOrderModal();
                                                            })} */

                                                        >
                                                            Assign
                                                        </Button>




                                                    </td>
                                                </tr>
                                            )
                                        })
                                }
                            </tbody>
                        </Table>
                        <Button color="primary" size="small" onClick={toggleRiderModal}
                        > Cancel </Button>

                    </ModalBody>
                </Modal>

            </div>

        </div>
    )
};


export default Order;
