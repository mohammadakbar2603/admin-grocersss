import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import Rider from './Rider';
import { fetchRiders } from '../../redux/grocersssSlice';
import { Table } from 'reactstrap';


const Riders = () => {
    const data = useSelector((state) => {
        return state
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRiders());
    }, [dispatch]);




    let riders = null;
    if (data.riderErr) {
        riders = <p style={{
            border: '1px solid grey',
            boxShadow: '1px 1px #888888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px',
            width: '80%'

        }}>Sorry Failed to Load riders</p>
    } else {
        if (data.riders.length === 0) {
            riders = <p style={{
                border: '1px solid grey',
                boxShadow: '1px 1px #888888',
                borderRadius: '5px',
                padding: '20px',
                marginBottom: '10px'

            }}>You Have No riders</p>

        } else {
            riders = /*data.riders.slice(0).reverse().map(rider => {
                return <Rider rider={rider} key={rider.id} />
            })*/
                (
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
                                data.riders.slice(0).reverse().map((rider, index) => {
                                    return <Rider rider={rider} index={index} />
                                })
                            }

                        </tbody>
                    </Table>
                )
        }
    }
    document.title = "Riders | GROCERSSS";
    return (
        <div style={{ marginTop: '20px' }}>
            {data.riderLoading ? <Spinner /> : riders}
        </div>
    );
};

export default Riders;
