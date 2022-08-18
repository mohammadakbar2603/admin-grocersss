import React from 'react';

const RecentCustomer = props => {
    return (
        <tr key={props.index}>
            <td>{props.index + 1}</td>
            <td>{props.customer}</td>
        </tr>


    );
};

export default RecentCustomer;