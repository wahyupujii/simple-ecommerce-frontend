import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Orders() {
    let navigate = useNavigate();

    return (
        <div>
            <h1>Orders</h1>
            <button onClick={() => navigate("/orders/paid")}>Paid Order</button>
            <button onClick={() => navigate("/orders/unpaid")}>Unpaid Order</button>
        </div>
    )
}
