import React, { useState, useEffect } from 'react'
import { orders } from '../constants'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
    background: ${(props) => props.primary ? 'palevioletred' : '#ff3c2e'};
    color: #fff;
    font-size: 1em;
    padding: 0.25em 1em;
    border-radius: 3px;
    cursor: pointer;
    text-align: right;
    border: none;
    @media (max-width: 700px) {
        margin: .5rem 0 .5rem 0;
    }
`;

export default function PaidOrders() {
    let navigate = useNavigate()
    const [orderPaid, setOrdersPaid] = useState({});
    const [productPaid, setProductPaid] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        orders
            .paid()
            .then(res => {
                setOrdersPaid(res.data.order)
                setProductPaid(res.data.product)
                setLoading(false)
            })
            .catch(() => {
                setOrdersPaid(null);
                setLoading(false);
            })
    }, [])

    const convertToRupiah = (angka) => {
        let rupiah = '';
        let angkarev = angka.toString().split('').reverse().join('');
        for (let i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
        return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
    }

    return (
        <div>
            <h1>Paid Orders</h1>
            <Button primary style={{ margin: '20px 0' }} onClick={() => navigate('/orders')}>Kembali</Button>
            {
                loading ? (
                    <span>Loading ... </span>
                ) :
                    (
                        orderPaid === null ? (
                            <div>Belum ada pesanan yang sudah dibayar</div>
                        ) : (
                            <div style={styles.containerCard}>
                                <div style={styles.title}>
                                    <h4>Transaksi : <span style={{ color: 'palevioletred' }}>{orderPaid.id}</span></h4>
                                    <h5 style={{ color: 'palevioletred' }}>
                                        {
                                            orderPaid.verification === "Pending" ? (
                                                <span>Pesanan belum diverifikasi</span>
                                            ) : (
                                                <span>Pesanan sudah diverifikasi</span>
                                            )
                                        }
                                    </h5>
                                </div>

                                {
                                    productPaid.map((product, index) => {
                                        return (
                                            <div key={index} style={styles.cardProduct}>
                                                <img style={{ width: '100px', height: '100px' }} src={`http://localhost:3000/${product.image}`} alt="product image" />
                                                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', height: '50px', justifyContent: 'space-evenly' }}>
                                                    <h4> {product.name}</h4>
                                                    <h4 style={{ color: 'salmon' }}> {convertToRupiah(product.price)} </h4>
                                                </div>
                                                <p>Quantity : {product.count}</p>
                                                <h4> {convertToRupiah(product.total_price)}</h4>
                                            </div>
                                        )
                                    })
                                }
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                                    <h4 style={{ color: 'palevioletred' }}>Sudah dibayar</h4>
                                    <h4>Total : <span style={{ color: 'palevioletred' }}>{convertToRupiah(orderPaid.ammount)}</span></h4>
                                </div>
                            </div>
                        )
                    )
            }
        </div>
    )
}

const styles = {
    containerCard: {
        boxShadow: '0px 0px 5px lightgray',
        padding: '20px',
        boxSizing: 'border-box',
        marginBottom: '20px',
    },
    cardProduct: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        boxShadow: '0px 0px 5px lightgray',
        padding: '10px',
        marginTop: '10px',
        justifyContent: 'space-between'
    },
    title: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}