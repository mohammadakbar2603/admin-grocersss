import React, { useEffect } from "react";
import ItemCard from "./ItemCard";
//import productData from "./../../data";
import Top from './Top';
import { SnackbarProvider } from 'notistack';
import './Home.css';
import { useState } from "react";
import { Input, Alert } from 'reactstrap';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useSelector, useDispatch, } from 'react-redux';
import { loadProductData, productDataFailed, fetchProductData } from '../../redux/grocersssSlice'
import Spinner from '../Spinner/Spinner';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state) => {
        return state
    })
    const [items, setItems] = useState(data.productData);//all data are kept here

    const [searchTerm, setSearchTerm] = useState("");//for search bar

    const [value, setValue] = React.useState(0);//for tab value

    useEffect(() => {
        dispatch(fetchProductData());

    }, [dispatch]);
    useEffect(() => {
        setItems(data.productData)
    }, [data]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const uniqueCategories = [...new Set(
        data.productData.map(item => { return item.category })
    )];

    const filterItem = (categItem) => {
        const updatedItems = data.productData.filter((currItem) => {
            return currItem.category === categItem;
        });

        setItems(updatedItems)
    }
    document.title = "Home | GROCERSSS";

    let home = null;
    if (data.productDataErr) {
        home = <p style={{
            border: '1px solid grey',
            boxShadow: '1px 1px #888888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px',
            widht: '80%'

        }}>Sorry Failed to Load Items</p>
    } else {
        home = (<div style={{ marginTop: '20px' }}>
            {/* <div className="container">
                <Alert color="danger">
                    Use Code: "HAPPY50" to get TK 50 off on orders above TK 200!!
                </Alert>
            </div> */}
            <div className="d-flex  flex-row justify-content-md-start justify-content-center my-1 my-md-3 mx-5">
                <Button size='large' className="shadow" color="primary" variant="contained" onClick={() => navigate("/additem", { replace: true })}>
                    Add New Item <AddIcon />
                </Button>
            </div>
            <div className="templateContainer">
                <div style={{}} className="searchInput_Container">
                    <Input style={{ color: 'black', border: '2px solid #D70F64', boxShadow: '0 5px 5px 0 rgba(0, 0, 0, 0.19)' }} className="box" id="searchInput" type="text" placeholder="Search food items, products..."
                        onChange={(event) => {
                            setSearchTerm(event.target.value);
                        }} />
                </div>
            </div>


            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="row justify-content-center mt-2 mb-3">
                        <Box sx={{ maxWidth: { xs: 320, sm: 480, md: 800 }, bgcolor: 'background.paper' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                textColor="primary"
                                indicatorColor="primary"
                                aria-label="scrollable primary auto tabs example"
                            >
                                <Tab label="All" onClick={() => setItems(data.productData)} />
                                {uniqueCategories.map((category) =>
                                    (<Tab key={category} label={category} onClick={() => filterItem(category)} />)
                                )}
                            </Tabs>
                        </Box>
                    </div>
                    {
                        items?.filter((val) => {
                            if (searchTerm === "") {
                                return val;
                            } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val;
                            } return 0;
                        })
                            .map((val) => {

                                return (
                                    <div className="col-xl-2 m-xl-2 col-md-3 col-sm-4 m-1" key={Math.random()}>
                                        <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
                                            <ItemCard
                                                img={val.img}
                                                price={val.price}
                                                title={val.title}
                                                item={val}
                                                desc={val.desc}
                                                category={val.category}
                                                key={Math.random()}
                                            />
                                        </SnackbarProvider>
                                    </div>
                                )
                            })
                    }
                </div>
                <Top />
            </div>

        </div>)
    }

    /* !!Only to post product, will move it to admin later!!
     productData.map(product => {
        //console.log(product.title);
        axios.post('https://grocersss-d8d44-default-rtdb.firebaseio.com/productData.json', product);
    }) */
    return (
        <div /* style={{ marginTop: '90px' }} */>
            {data.productDataLoading ? <Spinner /> : home}
        </div>
    );
};

export default Products;