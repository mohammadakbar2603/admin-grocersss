import React, { useState } from 'react';
import { Formik } from 'formik';
import { ModalBody, Modal, ModalHeader } from "reactstrap";
import { Box, TextField } from '@mui/material';
import AbcIcon from '@mui/icons-material/Abc';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import CategoryIcon from '@mui/icons-material/Category';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useSnackbar } from 'notistack';
import Button from '@mui/material/Button';
import Spinner from '../Spinner/Spinner';
import { useNavigate } from 'react-router';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const AddItem = () => {
    const navigate = useNavigate();
    const [delItemModal, setDelItemModal] = useState(false);
    const [productData, setProductData] = useState();
    const toggleDelItemModal = () => setDelItemModal(!delItemModal);

    const handleClickVariant = (variant) => {
        enqueueSnackbar(' New Product Added Successfully!', { variant });
    };
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState(
        {
            isLoading: false,
            isModalOpen: false,
            modalMsg: '',
            disableAddItem: true
        }
    )

    const isLoading = state.isLoading;
    const isModalOpen = state.isModalOpen;
    //const modalMsg = state.modalMsg;
    const disableAddItem = state.disableAddItem;

    let form = (
        <div style={{ borderRadius: '8px' }} className='col-md-6 col-sm-12 shadow align-items-center'>
            <Formik
                initialValues={{
                    category: "",
                    desc: "",
                    img: "",
                    price: "",
                    title: "",

                }}
                onSubmit={
                    (values) => {
                        console.log(values);
                        setProductData(values);
                        //dispatch(auth(values.category, values.desc, values.img, values.price, values.title))
                    }
                }
                validate={(values) => {
                    const errors = {};
                    if (!values.category) {
                        errors.category = 'Required';
                        setState({
                            disableAddItem: true
                        });
                        return errors;
                    }
                    if (!values.desc) {
                        errors.desc = 'Required';
                        setState({
                            disableAddItem: true
                        });
                        return errors;
                    }
                    if (!values.img) {
                        errors.img = 'Required';
                        setState({
                            disableAddItem: true
                        });
                        return errors;
                    }
                    if (!values.price) {
                        errors.price = 'Required';
                        setState({
                            disableAddItem: true
                        });
                        return errors;
                    }
                    if (!values.title) {
                        errors.title = 'Required';
                        setState({
                            disableAddItem: true
                        });
                        return errors;
                    } else setState({ disableAddItem: false })
                    return errors;
                }}

            >
                {({ values, handleChange, handleSubmit, handleBlur, errors, touched }) => (
                    <div style={{
                        padding: '15px',
                    }}>
                        <p style={{
                            fontSize: '30px',
                            textAlign: 'center',
                            color: '#d70f64',
                        }}>Add New Product</p>
                        <br />
                        <form style={
                            {
                                borderRadius: '5px',
                                padding: '20px',
                                marginTop: '-50px'
                            }
                        } onSubmit={handleSubmit}>

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AbcIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField name="title" id="title" margin='normal' className="form-control" value={values.title} label="Title" onBlur={handleBlur} onChange={handleChange} variant="standard" />
                            </Box>
                            {touched.title ? (<span style={{ color: 'red' }}>{errors.title}</span>) : null}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <CategoryIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField name="category" id="category" margin='normal' className="form-control" value={values.category} label="Category" onBlur={handleBlur} onChange={handleChange} variant="standard" />
                            </Box>
                            {touched.category ? (<span style={{ color: 'red' }}>{errors.category}</span>) : null}

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <BorderColorIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField name="desc" id="desc" margin='normal' className="form-control" value={values.desc} label="Description" onBlur={handleBlur} onChange={handleChange} variant="standard" />
                            </Box>
                            {touched.desc ? (<span style={{ color: 'red' }}>{errors.desc}</span>) : null}

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AttachMoneyIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField name="price" id="price" margin='normal' className="form-control" value={values.price} label="Price" onBlur={handleBlur} onChange={handleChange} variant="standard" />
                            </Box>
                            {touched.price ? (<span style={{ color: 'red' }}>{errors.price}</span>) : null}

                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AddPhotoAlternateIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                                <TextField name="img" id="img" margin='normal' className="form-control" value={values.img} label="Image URL" onBlur={handleBlur} onChange={handleChange} variant="standard" />
                            </Box>
                            {touched.img ? (<span style={{ color: 'red' }}>{errors.img}</span>) : null}




                            {/* <div className='col-6'>
                                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                                <TextField name="fname" id="fname" margin='normal' className="form-control" value={values.fname} label="First Name" variant="standard" onChange={handleChange} onBlur={handleBlur} />
                                            </Box>
                                            {touched.fname && errors.fname ? (<span style={{ color: 'red' }}>{errors.fname}</span>) : null}
                                        </div> */}
                            <Button type='submit' variant='contained' disabled={disableAddItem} onClick={toggleDelItemModal} className="mr-auto mt-2" color='primary'>Add Item </Button>



                        </form>
                    </div>
                )}
            </Formik>
            <Modal isOpen={delItemModal} toggle={toggleDelItemModal} size='lg' centered >
                <ModalHeader>Add Item</ModalHeader>
                <ModalBody>
                    <div>
                        <div>Are you sure you want to add this item?</div>
                        <br />
                        <div> <Button variant='contained' onClick={() => axios.post("https://grocersss-d8d44-default-rtdb.firebaseio.com/productData.json", productData)
                            .then(response => {
                                handleClickVariant('success');
                                toggleDelItemModal();
                            })}

                            style={{ marginRight: "10px" }} size="sm" color='success'>
                            Add <AddIcon />
                        </Button>
                            <Button variant='contained' onClick={toggleDelItemModal} size="sm" color="error">
                                Cancel
                            </Button></div>
                    </div>
                </ModalBody>

            </Modal>
        </div>

    );




    return (
        <div>
            <Button variant='contained' onClick={() => navigate("/products", { replace: true })} className="mx-3 my-3" color='primary'><ArrowBackIosNewIcon /></Button>
            <div style={{ marginTop: '70px', display: 'flex', justifyContent: 'center' }}>

                {isLoading ? <Spinner /> : form}

                {/* 
                <Modal isOpen={isModalOpen}>
                    <ModalBody onClick={() => navigate('/')}><p>{modalMsg}</p></ModalBody>
                </Modal> */}
            </div>
        </div>
    );
};

export default AddItem;