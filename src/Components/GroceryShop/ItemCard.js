import React, { useState } from "react";
import './ItemCard.css';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from 'notistack';
import { ModalBody, Modal, Button, ModalHeader } from "reactstrap";
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

const ItemCard = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => {
        enqueueSnackbar(props.title + ' Deleted from the list!', { variant });
    };

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    const [delItemModal, setDelItemModal] = useState(false);
    const toggleDelItemModal = () => setDelItemModal(!delItemModal);


    return (
        <div>
            <div className="card mb-3 shadow" style={{ width: "100%", height: '280px', borderRadius: '10%', alignItems: 'center', padding: '10px', cursor: 'pointer' }}>
                <img onClick={toggleModal} className="card-img-top img-fluid" style={{ height: "50%", width: '70%', }} src={props.img} alt={props.title} />
                <div className="card-body">
                    <div style={{ fontSize: '15px' }} className="card-title">{props.title}</div>
                </div>
                <div style={{ overflowY: 'hidden', width: '100%', height: '50px' }} className="card-footer row">
                    <p style={{ fontSize: '14px', paddingTop: '5px', fontWeight: 'bold' }} className="card-text col">BDT {props.price}
                        {/* <IconButton style={{ float: 'right', marginTop: '-8px', }} color="primary" aria-label="add to shopping cart" onClick={toggleDelItemModal}>
                            <DeleteIcon style={{ color: "#D70F64" }} />
                        </IconButton> */}
                    </p>
                </div>
            </div >
            <Modal
                isOpen={delItemModal} toggle={toggleDelItemModal} size='lg' centered
            >  <ModalHeader>Remove Item</ModalHeader>
                <ModalBody>
                    <div>
                        <div>Are you sure you want to delete {props.title}?</div>
                        <br />
                        <div> <Button

                            color="danger" style={{ marginRight: "10px" }} size="sm">
                            Delete <DeleteIcon />
                        </Button>
                            <Button onClick={toggleDelItemModal} size="sm">
                                Cancel <CloseIcon />
                            </Button></div>
                    </div>
                </ModalBody>

            </Modal>


            <Modal
                isOpen={modal} toggle={toggleModal} size='lg' centered scrollable
            >
                <ModalBody>
                    <div className="row container my-2 justify-content-center">
                        <div className="col" style={{ alignItems: 'center' }} width='50%' height="100%">
                            <img src={props.img} alt={props.title} width='100%' height='250px' style={{ paddingLeft: '15%', paddingTop: '15%' }} />
                        </div>
                        <div className="col align-middle" width='50%' style={{ textAlign: 'center', paddingTop: '15%' }}>
                            <h3>{props.title}</h3>
                            <h2>Tk. {props.price}</h2>

                            <Button className="btn" color="secondary" size="small" outline onClick={toggleModal}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                    <br /><br />
                    <hr />
                    <div className="p-4" align='left'>
                        <h5>Product Description:</h5>
                        <p>{props.desc}</p>
                    </div>
                </ModalBody>

            </Modal>

        </div>

    );
};

export default ItemCard;
