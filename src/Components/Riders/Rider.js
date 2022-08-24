import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Button from '@mui/material/Button';

const Rider = props => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    return (
        <tr key={props.index}>
            <td>{props.index + 1}</td>
            <td>{props.rider.userId}</td>
            <td>{props.rider.fname + " " + props.rider.lname}</td>
            <td>{props.rider.email}</td>
            <td style={props.rider.status === 'On Duty' ? { color: 'red', fontWeight: 'bold' } : { color: 'green', fontWeight: 'bold' }}>{props.rider.status}</td>
            <td>
                <Button variant="outlined" size="small" /* style={{ backgroundColor: '#d70f64', border: 'none', color: 'white', }} */
                    onClick={toggleModal}
                >
                    Details
                </Button>


                <Modal
                    size='lg' centered scrollable
                    isOpen={modal} toggle={toggleModal}

                >
                    <ModalHeader className='row'>
                        <div className='col'><h5>Rider Id: {props.rider.userId}</h5></div>


                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div>
                                <strong> First Name:</strong>  {props.rider.fname}
                            </div>
                            <div>
                                <strong>Last Name:</strong>  {props.rider.lname}
                            </div>
                            <div>
                                <strong> Email:</strong>  {props.rider.email}
                            </div>
                            <div>
                                <strong> Registration Time:</strong>  {new Date(props.rider.registered).toString()}
                            </div>

                            <div className='text-start'>
                                <Button color="primary" size="small" onClick={toggleModal}
                                > Cancel </Button> </div>
                        </div>
                    </ModalBody>
                </Modal>

            </td>
        </tr>



    )
};

export default Rider;
