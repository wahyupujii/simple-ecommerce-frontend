import React, { useEffect, useState } from 'react'
import { cart } from '../constants';
import { CartItems, DetailPayment } from '../parts';

export default function Cart() {
    const orderID = JSON.parse(localStorage.getItem('order_id'));

    const [totalPrice, setTotalPrice] = useState(0);
    const [dataProducts, setDataProducts] = useState([]);
    const [dataCount, setDataCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        cart
            .getCart(orderID)
            .then(res => {
                setDataProducts(res.data.products)
                setDataCount(res.data.products.length)
                setLoading(false)
            })
            .catch(() => {
                setDataCount(0);
                setLoading(false);
            })
    }, [dataCount])

    return (
        <div>
            <h1 style={{ margin: '30px' }}>Keranjang</h1>
            <div style={styles.cardArea}>
                <div style={styles.cardProductArea}>
                    {loading ? (<div>Loading</div>) : (
                        <CartItems
                            dataProducts={dataProducts}
                            setDataCount={() => setDataCount(dataCount - 1)}
                            handleTotalPrice={(total) => setTotalPrice(total)}
                        />
                    )}
                </div>
                <div style={styles.detailPaymentArea}>
                    <DetailPayment
                        totalPrice={totalPrice}
                    />
                </div>
            </div>
        </div>
    )
}

const styles = {
    cardArea: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardProductArea: {
        width: '55%',
        maxHeight: '70vh',
        padding: '0px 20px',
        boxSizing: 'border-box',
        overflow: 'auto',
    },
    detailPaymentArea: {
        width: '35%',
        maxHeight: '70vh',
    },
}
