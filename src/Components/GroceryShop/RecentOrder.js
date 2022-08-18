import React from 'react';
import { Badge } from 'reactstrap';

const RecentOrder = props => {

    const handleBadge = (status) => {
        if (status === "Pending") return "warning";
        else if (status === "Completed") return "success";
        else if (status === "Processing") return "info";
        else if (status === "Awaiting Confirmation") return "secondary";
        else return "danger";

    }

    return (

        <tr>
            <td>{props.order.id}</td>
            <td>{props.order.customer.name}</td>
            <td><Badge color={handleBadge(props.order.status)} pill>{props.order.status}</Badge></td>
        </tr>

    );
};

export default RecentOrder;